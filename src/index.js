const $app = document.getElementById('app');
const $observe = document.getElementById('observe');

const API = 'https://api.escuelajs.co/api/v1/products';
const KEY = 'pagination';
const INITIAL = '5';
const PRODUCTS_PER_PAGE = 10;

const init = function () {
  localStorage.setItem(KEY, INITIAL);
  intersectionObserver.observe($observe);
};

const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;

      if (products.length === 0) {
        let lastItem = document.createElement('section');
        lastItem.innerHTML = '<h2>Todos los productos Obtenidos 😊</h2>';
        $app.appendChild(lastItem);

        destroyed();
        return;
      }
      updateInitialValue(products.slice(-1)[0].id);

      let output = products.map((e) => {
        return `
        <article class='Card'>
          <img src='${e.images[0]}' />
          <h2>
          ${e.title}
          <small>
          ${e.price}
          </small>
          </h2>
        </article>
      `;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

function updateInitialValue(value) {
  localStorage.setItem(KEY, value);
}

async function loadData() {
  let value = localStorage.getItem(INITIAL) ? parseInt(localStorage.getItem(INITIAL)) - 1 : parseInt(INITIAL) - 1;
  getData(API + `?offset=${value}&limit=${PRODUCTS_PER_PAGE}`);
}

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadData();
      }
    });
  },
  {
    rootMargin: '0px 0px 100% 0px',
  }
);

const destroyed = function () {
  intersectionObserver.disconnect();
};

window.onbeforeunload = function () {
  localStorage.removeItem(KEY);
  return '';
};

init();
