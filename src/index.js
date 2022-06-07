const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const STEP = 10;
let pagination = 5;

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.filter(product => (product.id >= pagination && product.id < (STEP + pagination)));
      pagination += STEP;
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

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

loadData();

const infinitScroll = () => {
  if (document.body.scrollHeight - window.innerHeight === window.scrollY) {
    console.log('estoy en el final del scroll');
   }
 }
 
 window.addEventListener('scroll', infinitScroll);
