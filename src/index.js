const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const MAX_RECORDS = 200;
const LIMIT = 10;
let FIRST_LOAD_OFFSET = 5;

localStorage.removeItem('pagination')
const getData = async (api) => {
  try {
    const products = await fetch(api).then(response => response.json())
    const output = products.map(product => {
      return showProduct(product);
    });
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output.join('')
    $app.appendChild(newItem);
  } catch(error){
    console.log(error)
  }
}


const showProduct = (product) => {
  return `
    <article class="Card">
      ${renderImages(product.images)}
      <h2>
      ${product.title}
      <small>$${product.price} Precio</small>
    </h2>
    <div>
  `
}

const renderImages = (images) => {
  return `
    <img src="${images[0]}">
  `;
}


const loadData = async () => {
  
  const offset = localStorage.getItem('pagination') || 0;
  let nextOffset = parseInt(offset) + parseInt(LIMIT);
  if(!offset) {
    nextOffset = FIRST_LOAD_OFFSET;
  }
  const api = new URL(API)
  api.searchParams.append('offset', nextOffset);
  api.searchParams.append('limit', LIMIT);

  updateLocalStorage(nextOffset)

  await getData(api.href);

}

const updateLocalStorage = (offset) => {

  localStorage.setItem('pagination', offset)

  if(offset > MAX_RECORDS) { 
    const lastDocument = document.createElement('h2');
    lastDocument.innerText= 'Todos los productos Obtenidos';
    $app.appendChild(lastDocument);
    intersectionObserver.disconnect()
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);