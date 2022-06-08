const $app = document.getElementById('app');
const $observe = document.getElementById('observe');

const API = 'https://api.escuelajs.co/api/v1/products';
const KEY = 'pagination';
const INITIAL = '4';
const PRODUCTS_PER_PAGE = 10;
let wasAbove = false;
let offset = 5;
let previousY = 0;
let previousRatio = 0;

const init = function () {
  localStorage.setItem(KEY, '5');
  loadData();
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

      let output = products.map((e) => {
        return `
        <article class='Card'>
          <img src='${e.images[0]}' />
          <h2>
          ${e.title} -  ${e.id}
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

      offset = products.slice(-1)[0].id + 1;
    })
    .catch((error) => console.log(error));
};

function updateInitialValue() {
  localStorage.setItem(KEY, offset + '');
}

async function loadData() {
  let value = localStorage.getItem('pagination');
  getData(API + `?offset=${value - 1}&limit=${PRODUCTS_PER_PAGE}`);
}

let lastScrollTop = 0;

window.addEventListener(
  'scroll',
  function () {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      intersectionObserver.observe($observe);
    }
    lastScrollTop = st <= 0 ? 0 : st;
  },
  false
);

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        updateInitialValue();
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
