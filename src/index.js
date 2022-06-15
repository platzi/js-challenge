const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const $error = document.getElementById('error');
const API = 'https://api.escuelajs.co/api/v1/products';
const PAGINATION_NAME = "pagination"
const FIRST_PAGINATION = 5
const LAST_PAGINATION = 189
const PAGINATION_LIMIT = 10



const getData = api => {
  return new Promise((resolve, reject) => {
    fetch(api)
      .then(response => response.json())
      .then(response => {
        let products = response;
        let output = products.map(product => {
          return (`
        <article class="Card">
          <img src="${product.images[0]}" alt="${product.title}" loading="lazy"/>
          <h2>
          ${product.id}-${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`)
        });
        let newItem = document.createElement('section');
        newItem.classList.add('Items');
        newItem.innerHTML = output.join("");
        $app.appendChild(newItem);
        resolve()
      })
      .catch(error => reject(error))
  })
}
/**
 * Load data in DOM by pagination
 * @param {Number} pagination fisrt item of the block
 * @returns Print in DOM
 */
const loadData = async (pagination) => {
  const offset = pagination
  const limit = PAGINATION_LIMIT
  return await getData(`${API}?offset=${offset}&limit=${limit}`);
}

const intersectionObserver = new IntersectionObserver(async (entries) => {

  try {
    const pagination = GET_NEW_PAGINATION()
    await loadData(pagination)
    if (GET_PAGINATION() >= LAST_PAGINATION) {
      intersectionObserver.unobserve($observe);
      loadFotter()
    }
  } catch (err) {
    console.error(err)
    loadError("Error.")
  }


}, {
  rootMargin: '0px 0px 0px 0px',
});

/**
 * Load footer message in DOM
 */
const loadFotter = () => {
  const output = `
        <article class="Card footer">
          <h3 class="footer-text" > That's all</h3>
          <h3 class="footer-text" >Todos los productos Obtenidos</h3>
        </article>
        `
  let newItem = document.createElement('section');
  newItem.innerHTML = `${output} `;
  $observe.appendChild(newItem);

}

/**
 * Load error message for 4s in DOM
 * @param {String} error Error message
 */
const loadError = (error) => {
  const output = `
      <article class="Card ">
        <h3 > ${error}</h3>
      </article>
      `
  let newItem = document.createElement('section');
  newItem.innerHTML = `${output} `;
  $error.appendChild(newItem);
  setTimeout(() => {
    if ($error.firstChild()) {
      $error.removeChild($error.firstChild)
    }
  }, 4000)

}


// Local Storage

/**
 * Get next pagination if it don't have use FIRST_PAGINATION
 * @returns newPagination
 */
const GET_NEW_PAGINATION = () => {
  let fooPagination;
  if (!GET_PAGINATION()) {
    fooPagination = FIRST_PAGINATION
  } else {
    fooPagination = GET_PAGINATION() + PAGINATION_LIMIT
  }
  SET_PAGINATION(fooPagination)
  return fooPagination
}
/**
 * Get pagination from local storage
 * @returns Actual pagination
 */
const GET_PAGINATION = () => {
  return parseInt(window.localStorage.getItem(PAGINATION_NAME))
}

/**
 * Save pagination in local storage
 * @param {Number,String} numberPag newPagination
 */
const SET_PAGINATION = (numberPag) => {
  window.localStorage.setItem(PAGINATION_NAME, numberPag)
}

/**
 * Purge the pagination from local storage
 */
const PURGE_PAGINATION = () => [
  window.localStorage.removeItem(PAGINATION_NAME)
]


const main = () => {
  PURGE_PAGINATION()
  intersectionObserver.observe($observe);

}

main()
