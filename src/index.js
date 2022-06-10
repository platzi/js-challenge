const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const paginationlimit = 10;
const itemTemplate = (product) => {
    return ` ${product.id}. ${product.title} <br><br><br>`;
}

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
            return itemTemplate(product);
      }).join('');
      console.log(response);
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


const loadDataPagination = (offset=4, limit=paginationlimit) => {
  localStorage.setItem('pagination', offset);
  offset = `?offset=${offset}&limit=${limit}`
  getData(API+offset);
}

loadDataPagination(offset=4);

const intersectionObserver = new IntersectionObserver(entries => {
  loadDataPagination(parseInt(localStorage.getItem('pagination'))+paginationlimit);
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
