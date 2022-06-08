const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const ARTICLE_OFFSET = 5;
const ARTICLE_LIMIT = 10;
const ARTICLE_TOTAL = 200;

const getData = api => {
  return fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.reduce((template, product) => {
        // template
        return template += `
          <article class="Card">
            <img src="${product.images[0]}" />
            <h2>
            ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
          `;
      }, '');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const getPage = () => {
  let page = localStorage.getItem('pagination');
  return page ? parseInt(page) + ARTICLE_LIMIT: ARTICLE_OFFSET;
}

const loadData = async page => {
  await getData(`${API}?offset=${page}&limit=${ARTICLE_LIMIT}`);
  window.localStorage.setItem('pagination', page);
}

const intersectionObserver = new IntersectionObserver(async entries => {
  // logic...
  let entry = entries[0];
  if (!entry.isIntersecting) return;
  
  let page = getPage();
  await loadData(page);

  if (page + ARTICLE_LIMIT > ARTICLE_TOTAL) {
    let message = document.createElement('h2');
    message.style.textAlign = 'center';
    message.innerHTML = 'Todos los productos Obtenidos';
    $app.appendChild(message);

    intersectionObserver.unobserve($observe);
    return;
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

(() => {
  window.localStorage.clear();
})();