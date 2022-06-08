const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const DEFAULT_OFFSET = 5;
const DEFAULT_LIMIT = 10;

const clearPagination = () => {
  localStorage.removeItem('pagination')
}

const getPagination = () => {
  if(!localStorage.getItem("pagination")) {
    localStorage.setItem("pagination", DEFAULT_OFFSET)
  }
  return parseInt(localStorage.getItem('pagination'))
}

const setPagination = (value) => {
  localStorage.setItem("pagination", value)
}


const getData = async (api) => {
  try {
    const response = await fetch(api)
    if(response.status !== 200) {
      throw new Error(response.message)
    }
    return response.json()
  } catch(err) {
    throw new Error(err)
  }
}

const loadData = async () => {  
  let offset;

  if($app.childNodes.length !== 0) {
    setPagination(getPagination()+DEFAULT_LIMIT)
  }
  offset = getPagination()

  try {
    let products = await getData(`${API}?offset=${offset}&limit=${DEFAULT_LIMIT}`)

    let output = ``;
    
    products.forEach(product => {
      output += `
        <article id="product-${product.id}" class="Card">
          <img src="${product.images[0]}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>
      `;
    });
  
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output;
    $app.appendChild(newItem);

    if(products.length < DEFAULT_LIMIT) {
      let span = document.createElement('span')
      span.classList.add('Message')
      span.innerHTML = "Todos los productos Obtenidos"
      $app.appendChild(span)
      intersectionObserver.disconnect()
    }

  } catch(error) {
    console.error(error)
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting) {
    loadData()
  }
}, {
  rootMargin: '0px 0px 100% 0px',
  threshold: '1.0'
});

intersectionObserver.observe($observe);

clearPagination();