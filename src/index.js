const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const PAGINATION_KEY = 'pagination'; 
const LIMIT = 10;

const getData = (api, offset, limit) => {
  const endpoint = `${api}?offset=${offset}&limit=${limit}`;

  fetch(endpoint)
    .then(response => response.json())
    .then(response => {
      let products = response;

      if(!products.length > 0) {
        alert('There is no more data');
        return;
      }

      let output = products.reduce( (acc, product) => {
        return acc + `
          <article id=product-${product.id} class="Card">
            <img src="${product.images[0]}" alt="${product.category.name}">
            <h2>
            ${product.title}
             <small>$${product.price}</small>
            </h2>
          </div>
        `;
      }, '');

      localStorage.setItem(PAGINATION_KEY, offset + limit);

      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;

      $app.appendChild(newItem);

      intersectionObserver.observe(observe);

    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  let pagination = localStorage.getItem(PAGINATION_KEY);

  let nPagination;
  if (pagination) {
    try { 
      nPagination = Number(pagination);
    } catch {
      nPagination = 0;
    }
  } else {
    nPagination = 0;
  }

  getData(API, nPagination, LIMIT);
}

const clearLocalStorage = () => {
  localStorage.removeItem(PAGINATION_KEY);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach( async (entry) => {
    if(entry.isIntersecting){
      await loadData();
    }
  })
}, {
  rootMargin: '0px 0px 0px 0px',
});

intersectionObserver.observe($observe);

window.onbeforeunload = function() {
  clearLocalStorage();
};