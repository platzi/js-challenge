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

      let output = products.map(product => {
        return `
          <div id = product-${product.id}>
            <p>
             ${product.id} - ${product.title}
            </p>
          </div>
        `;
      });

      localStorage.setItem(PAGINATION_KEY, offset + limit);

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

  getData(API, nPagination, LIMIT);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      console.log(entries);
      loadData();

    }
  })
}, {
  rootMargin: '0px 0px 0px 0px',
});

intersectionObserver.observe($observe);
