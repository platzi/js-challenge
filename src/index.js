
const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const DOMAIN = "https://api.escuelajs.co/api/v1/products"

// paginator
let page = 0;
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
      let output = products.map(product => {
        return `<h1>${product.title}</h1>`
      }).join(" ");

      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = (OFFSET=initialElements, LIMIT=elementsPerPage) => {
  const API = `${DOMAIN}?offset=${OFFSET}&limit=${LIMIT}`;
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  const offset = page * (initialElements + elementsPerPage) || initialElements;
  loadData(OFFSET=offset);
  page += 1;
}, intersectionObserverOptions);
intersectionObserver.observe($observe);
