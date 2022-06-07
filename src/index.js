const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const template = require('./templates');
const api = require('./api/api');

localStorage.removeItem('pagination');
localStorage.setItem('pagination', '0');

let newItem = document.createElement('section');
newItem.classList.add('Item');
newItem.appendChild(document.createElement('ul'));
$app.appendChild(newItem);

const renderData = async page => {
  const list = document.getElementsByClassName('Item')[0].children[0];
  const products = await api.getProducts(page);
  template.items(list, products);
};

const intersectionObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting === true) {
      let page = parseInt(localStorage.getItem('pagination')) + 1;
      localStorage.setItem('pagination', page);
      renderData(page);
      console.log(entries);
    }
  },
  {
    threshold: 1.0,
    rootMargin: '0px 0px 100% 0px',
  }
);

intersectionObserver.observe($observe);

const mutation = new MutationObserver(() => {
  let page = localStorage.getItem('pagination');
  if (page === '20') {
    intersectionObserver.disconnect();
    $app.innerHTML += 'Todos los productos Obtenidos';
  }
});

const list = document.getElementsByClassName('Item')[0];

mutation.observe(list, { childList: true, subtree: true });
