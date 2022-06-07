const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products?limit=10';

const getData = (api, offset) => {
  api += `&offset=${offset}`;
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.reduce((template, product) => {
        // template
        return template += `
        <article class="Card">
          <img src="${product.images[0]}" />
          <h2>
          <b>[${product.id}]</b>
          ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>
        `;
      }, '');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const getPage = () => {
  let page = window.localStorage.getItem('pagination');
  return page ? parseInt(page): 4;
}

const setPage = page => window.localStorage.setItem('pagination', page);

const loadData = () => {
  let page = getPage();
  getData(API, page);
  setPage(page + 10);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  let entry = entries[0];
  if (!entry.isIntersecting) return;
  loadData();
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
