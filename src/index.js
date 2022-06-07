const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

// Check pagination
const pagination = parseInt(localStorage.getItem("pagination"));

// API settings
const limit = 10;
let offset = pagination ? limit + pagination : 5;

// Store pagination 
localStorage.setItem("pagination", offset)

localStorage.getItem("lastname");
const getData = api => {
  fetch(`${api}/?offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
        return `<article>${product.id}</article>`;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  loadData();
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
