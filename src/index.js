const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const STEP = 10;
let pagination = 5;

const getData = (api) => {
  fetch(`${api}?offset=${pagination}&limit=${STEP}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      products.forEach(element => newItem.appendChild(createCard(element)));
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
    if (entries[0].isIntersecting) {
      loadData();
    }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
