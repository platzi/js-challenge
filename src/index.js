const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage.setItem('productsIndex', 4);
const PRODUCTS_TO_FETCH = 10;

const $itemsContainer = document.createElement('div');
$itemsContainer.classList.add('Items');
$app.appendChild($itemsContainer);

const $completeMessage = document.createElement('div');
$completeMessage.classList.add('CompleteMessage');
$completeMessage.innerHTML = 'Todos los productos Obtenidos'

const getData = (api, index, limit) => 
  fetch(`${api}?offset=${index}&limit=${limit}`)
  .then(response => response.json())
  .then(response => response)
  .catch(error => console.log(error));

const loadData = async () => {
  const products = await getData(API, localStorage.getItem('productsIndex'), PRODUCTS_TO_FETCH);
  console.log(products);
  products.map(product => $itemsContainer.appendChild(getCardElement(product)));
  localStorage.setItem('productsIndex', PRODUCTS_TO_FETCH + +localStorage.getItem('productsIndex'));
  if (products.length < 10) {
    handleObserveStatus(false);
    $app.appendChild($completeMessage);
  }
}

const getCardElement = (product) => {
  const $card = document.createElement('article');
  $card.classList.add('Card');
  $card.innerHTML =`
    <img src="${product.images[0]}" />
    <h2>
      ${product.title}
      <small>$ ${product.price}</small>
    </h2>
  `;
  return $card;
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadData()
    }
  })
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.25
});

const handleObserveStatus = status => {
  if (status) {
    console.log('Observer started');
    intersectionObserver.observe($observe);
  }
  else {
    console.log('Observer stopped');
    intersectionObserver.unobserve($observe);
  }
}

handleObserveStatus(true);

window.onbeforeunload = () => {
  localStorage.removeItem('productsIndex');
};
