const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

//Iniciamos el producto 5 y obteniendo los siguientes 10 productos.
localStorage.setItem('paginationIndex', 4);
const PRODUCTS_TO_FETCH = 10;

const $itemsContainer = document.createElement('div');
$itemsContainer.classList.add('items');
$app.appendChild($itemsContainer);

//Cuando la última petición sea ejecutada debes de mostrar un mensaje "Todos los productos Obtenidos", a su vez debes de destruir el intersection observer.
const $completeMessage = document.createElement('div');
$completeMessage.classList.add('completeMessage');
$completeMessage.innerHTML = 'Todos los productos Obtenidos'

const getData = (api, index, limit) => 
  fetch(`${api}?offset=${index}&limit=${limit}`)
  .then(response => response.json())
  .then(response => response)
  .catch(error => console.log(error));

const loadData = async () => {
  const products = await getData(API, localStorage.getItem('paginationIndex'), PRODUCTS_TO_FETCH);
  console.log(products);
  products.map(product => $itemsContainer.appendChild(getCardElement(product)));
  localStorage.setItem('paginationIndex', PRODUCTS_TO_FETCH + +localStorage.getItem('paginationIndex'));
  if (products.length < 10) {
    handleObserveStatus(false);
    $app.appendChild($completeMessage);
  }
}

const getCardElement = (product) => {
  const $card = document.createElement('article');
  $card.classList.add('card');
  $card.innerHTML =`
    <img src="${product.images[0]}" />
    <h2>
      ${product.title}
    </h2>
    <p>$ ${product.price}</p>
    
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

//Eliminamos el storage (Tercer Problema, item 2)
window.onbeforeunload = () => {
  localStorage.removeItem('paginationIndex');
};
