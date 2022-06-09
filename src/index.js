const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let pagination = 4;

if  (localStorage.getItem('pagination')) {
  pagination = localStorage.getItem('pagination')
} else {
  localStorage.setItem('pagination', pagination);
}
const getData = (api, initial) => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      if(parseInt(localStorage.getItem('pagination')) >= products.length) {
        initial = 4;
        localStorage.setItem('pagination', initial);
      }
      let output = products.slice(initial, initial+10 ).map( product => {
        return `<article class="Card">
        <img src="${product.images[0]}" alt='${product.title}' />
        <h2>
          ${product.title} 
          <small>$ ${product.price}</small>
        </h2>
      </article>`
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = (initial) => {
  getData(API, initial );
}

const intersectionObserver = new IntersectionObserver(entries => {
  pagination = localStorage.getItem('pagination');
  loadData(parseInt(pagination));
  localStorage.setItem('pagination', parseInt(pagination) + 10);
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
