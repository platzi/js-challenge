const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const INIT_PAGE = 5;
const MAX_PAGE_SIZE = 10;

localStorage.clear();

localStorage.setItem('pagination', INIT_PAGE);

const getData = async (url_api) => {
  try {
    const response = await fetch(`${url_api}?offset=${localStorage.getItem('pagination')}&limit=${MAX_PAGE_SIZE}`);
    const products = await response.json();
    let productRender = products.map((product) => `
      <article class="Card">
        <img src="${product.images[0]}"/>
        <h2>
          ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>
    `);
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = productRender.join('');
    $app.appendChild(newItem);
  } catch (err) { console.log(err); }
}

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) { 
    const currentPage = +localStorage.getItem('pagination');
    const nextPage = currentPage + MAX_PAGE_SIZE;
    localStorage.setItem('pagination', nextPage);
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

loadData();

intersectionObserver.observe($observe);
