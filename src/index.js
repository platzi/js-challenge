const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const LIMIT = 10;
const PAGINATION = "pagination";
const INITIAL_PAGINATION = 5;
const LAST_ID = 200;
let isFinished = false;
localStorage.removeItem("pagination");

const getPagination = () => {
  return localStorage.getItem(PAGINATION) || INITIAL_PAGINATION;
}

const getData = async (api, pagination) => {
  const url = `${api}?offset=${pagination}&limit=${LIMIT}`;
  fetch(url)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.reduce((acc, product) => {
        if(product.id === LAST_ID) {
          isFinished = true;
        }
        return (acc + 
        `<article class="Card">
        <img src="${product.images[0]}" alt="${product.description}" />
        <h2>
         ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>`);
      }, "");
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      localStorage.setItem(PAGINATION, parseInt(pagination) + LIMIT);
    })
    .catch(error => console.log(error));
}

const  loadData = async () => {
  const pagination = getPagination();
  await getData(API, pagination);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting) {
      if(isFinished) {
      let newItem = document.createElement('section');
      newItem.classList.add('message');
      newItem.innerHTML = 'Todos Los Productos Obtenidos';
      intersectionObserver.unobserve($observe);
      $app.appendChild(newItem);
      intersectionObserver.unobserve($observe);
      } else {
        loadData();
      }
    } 
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
