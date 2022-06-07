const $app = document.getElementById('app');
const $items = $app.getElementsByClassName('Items')[0];
const $observe = document.getElementById('observe');

const API = 'https://api.escuelajs.co/api/v1/products';
const PRODUCTS_LIMIT = 10;

let loadingProducts = false;

const init = () => {
  window.localStorage.setItem('pagination', 5);
  loadData();
}

const getPagination = () => {
  return parseInt(window.localStorage.getItem('pagination'));
}

const updatePagination = (newValue) => {
  return window.localStorage.setItem('pagination', newValue);
}

const getData = (api, params = {}) => {
  loadingProducts = true;
  let query = Object.entries(params).map(entry => {
    return entry.join('=');
  }).join('&');
  api += query != '' ? ('?' + query) : '';
  fetch(api)
    .then(response => response.json())
    .then(response => {
      loadingProducts = false;
      let products = response;
      let output = products.map(product => {
        return (`
          <article class="Card">
            <img src="${ product['images'][0] }" />
            <h2>
              ${ product['title'] }
              <small>$ ${ product['price'] }</small>
            </h2>
          </article>
        `);
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output.join('');
      $items.append(...newItem.childNodes);
      if (products.length < PRODUCTS_LIMIT) {
        let endMessage = document.createElement('h2');
        endMessage.classList.add('EndMessage');
        endMessage.textContent = 'Todos los productos Obtenidos';
        $app.appendChild(endMessage);
        intersectionObserver.unobserve($observe);
      }
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  getData(API, {
    offset: getPagination(),
    limit: PRODUCTS_LIMIT
  });
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.target != $observe || !entry.isIntersecting || loadingProducts) {
      return;
    }
    updatePagination(getPagination() + PRODUCTS_LIMIT);
    loadData();
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

// Call functions

init();

intersectionObserver.observe($observe);