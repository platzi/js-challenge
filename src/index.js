const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const PAGINATION_PATH = '?offset=5&limit=10';
const PAGINATION_STORAGE_KEY = 'pagination';
const INITIAL_OFFSET = 5;
const LIMIT = 10;

localStorage.removeItem(PAGINATION_STORAGE_KEY);
localStorage.setItem(PAGINATION_STORAGE_KEY, INITIAL_OFFSET);

const getData = api => {
  const OFFSET = localStorage.getItem(PAGINATION_STORAGE_KEY);
  const URL = `${api}?offset=${(Number(OFFSET))}&limit=${LIMIT}`;
  fetch(URL)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return `<article class="Card">
          <img src="${product.images[0]}" alt="${product.title}"/>
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  } else {
    const nextPage = Number(localStorage.getItem(PAGINATION_STORAGE_KEY)) + LIMIT;
    localStorage.setItem(PAGINATION_STORAGE_KEY, nextPage);
    if(nextPage>=200){
      $observe.innerHTML="Todos los productos obtenidos.";
      intersectionObserver.disconnect();
      return;
    }
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
