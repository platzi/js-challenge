const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const STEP = 10;
let pagination = 5;

const getData = (api) => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.filter(product => (product.id >= pagination && product.id < (STEP + pagination)));
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      output.forEach(element => newItem.appendChild(createCard(element)));
      $app.appendChild(newItem);
      pagination += STEP;
    })
    .catch(error => console.log(error));
}

const createCard = (element) => {
  newCard = document.createElement('article');
  newCard.classList.add('Card');
  img = document.createElement('img');
  img.src = element.images[0];
  title = document.createElement('h2');
  title.innerHTML = element.title;
  price = document.createElement('small');
  price.innerHTML = `$ ${element.price}`;
  newCard.appendChild(img);
  title.appendChild(price);
  newCard.appendChild(title);
  return newCard;
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

const infinityScroll = () => {
  if (document.body.scrollHeight - window.innerHeight === window.scrollY) {
    loadData();
   }
 }
 
 window.addEventListener('scroll', infinityScroll);
