
const $items = document.getElementById('items');
const $observe = document.getElementById('observe');
const DOMAIN = "https://api.escuelajs.co/api/v1/products"

// paginator
let page = localStorage.setItem('pagination', 0);
const initialElements = 5;
const elementsPerPage = 10;

let intersectionObserverOptions = {
  rootMargin: "0px",
};

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;

      products.forEach(product => {
        const output = `
          <img 
            src="${product.images[0]}"
            alt="${product.description}"
          />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        `
        const article = document.createElement('article');
        article.classList.add('Card', 'Item');
        article.innerHTML = output;
        $items.appendChild(article);
      })
    })
    .catch(error => console.log(error));
}

const loadData = (OFFSET=initialElements, LIMIT=elementsPerPage) => {
  const API = `${DOMAIN}?offset=${OFFSET}&limit=${LIMIT}`;
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  let page = parseInt(localStorage.getItem('pagination'));
  const offset = page * (initialElements + elementsPerPage) || initialElements;

  loadData(OFFSET=offset);

  localStorage.setItem('pagination', page += 1);
}, intersectionObserverOptions);
intersectionObserver.observe($observe);
