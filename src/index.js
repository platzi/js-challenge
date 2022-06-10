const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const LIMIT = 10;
const MAX_LIMIT = 200;

const setPagination = (pagination) => {
  localStorage.setItem('pagination', pagination);
}

const getPagination = () => {
  return localStorage.getItem('pagination');
}

const cleanPagination = () => {
  return localStorage.removeItem('pagination');
}

const printProductTemplate = (product) => {
  return `<article class="Card">
            <img src="${product.images[0]} alt="${product.description}" />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>`;
}

const _getApiUrl = () => {
  const productInit = 5;
  const pagination = getPagination();
  offset = pagination ? parseInt(pagination) + LIMIT : productInit;
  setPagination(offset);
  return `${API}?offset=${offset}&limit=${LIMIT}`;
}

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return printProductTemplate(product);
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output.join('');
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    getData(_getApiUrl());

    const pagination = getPagination();
    if (pagination && (parseInt(pagination) >= MAX_LIMIT - 1)) {
      intersectionObserver.unobserve($observe);
      $app.insertAdjacentHTML(
        'beforeEnd',
        `<div class="end-pagination">
          <h3>Todos los productos Obtenidos</h3>
         </div>`
      );
    }
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

cleanPagination();
intersectionObserver.observe($observe);