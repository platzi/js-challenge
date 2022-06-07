const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const STEP = 10;
const totalProducts = 200;
localStorage.clear();
localStorage.setItem('pagination', 4);


const getData = async (api) => {
  let offset = parseInt(localStorage.getItem('pagination'));
  const response = await fetch(`${api}?offset=${offset}&limit=${STEP}`);
  try {
    const products = await response.json();
    let newItem = document.createElement('section');
    newItem.classList.add('Item');
    products.forEach(element => (element.id <= totalProducts) ? newItem.appendChild(createCard(element)) : console.log('Fuera de rango') );
    $app.appendChild(newItem);
    localStorage.setItem('pagination', (offset + STEP));
  } catch (error) {
    console.log(error)
  }
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

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
    if (localStorage.getItem('pagination') > totalProducts) {
      alert('Todos los productos Obtenidos');
      intersectionObserver.unobserve($observe);
    }
    if (entries[0].isIntersecting) {
      loadData();
    }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
