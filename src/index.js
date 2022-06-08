const $app = document.getElementById('app');
const $items = document.getElementById('Items');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let $offset = 5;
const $limit = 10;
const RESULT_COUNT = 200;

const updateLocalStorage = () => {
  if (localStorage.getItem('pagination')) {
    $offset = parseInt(localStorage.getItem('pagination'));
    if ($offset >= RESULT_COUNT) {
      $offset = 190;
      intersectionObserver.unobserve($observe);
    } else {
      $offset += $limit;
      if ($offset >= RESULT_COUNT) {
        intersectionObserver.unobserve($observe);
      }
    }
  }
  localStorage.setItem('pagination', $offset);
  return `?offset=${$offset}&limit=${$limit}`;  
}

const getData = api => {
  let $pagination = updateLocalStorage();
  fetch(api + $pagination)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
