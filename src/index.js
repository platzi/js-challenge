const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const PAGINATION_KEY = 'pagination'; 

const getData = (api, offset, limit) => {
  const endpoint = `${api}?offset=${offset}&limit=${limit}`;

  fetch(endpoint)
    .then(response => response.json())
    .then(response => {
      let products = response;
      // By some reason, the products array starts at id 3
      let output = products.map(product => {
        return product.title + '<br>' ;
      });

      localStorage.setItem(PAGINATION_KEY, offset + 10);

      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  let pagination = localStorage.getItem(PAGINATION_KEY);

  let nPagination;
  if (pagination) {
    try { 
      nPagination = Number(pagination);
    } catch {
      nPagination = 5;
    }
  } else {
    nPagination = 5;
  }

  const limit = 10;
  getData(API, nPagination, limit);
}

const intersectionObserver = new IntersectionObserver(entries => {

}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
loadData();
