const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const MAX_RECORDS = 200;
const LIMIT = 10;
let FIRST_LOAD_OFFSET = 5;

localStorage.removeItem('pagination')
localStorage.setItem('first_offset', FIRST_LOAD_OFFSET);
const getData = async (api) => {
  try {
    const products = await fetch(api).then(response => response.json())
    products.map(product => {
      const output = showProduct(product);
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.id = product.id
      newItem.innerHTML = output
      $app.appendChild(newItem);
    });
  } catch(error){
    console.log(error)
  }
}


const showProduct = (product) => {
  return `
    <div class="Card">
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
  
  const pagination = localStorage.getItem('pagination');
  let offset = 0;
  if(pagination) { 
    offset = pagination
  } else {
    offset = localStorage.getItem('first_offset') || 0
    localStorage.removeItem('first_offset')
  }
  const api = new URL(API)
  api.searchParams.append('offset', offset);
  api.searchParams.append('limit', LIMIT);


  await getData(api.href);

  updateLocalStorage(offset, LIMIT)
}

const updateLocalStorage = (offset, limit) => {
  const nextOffset = parseInt(offset) + parseInt(limit);
  localStorage.setItem('pagination', nextOffset)

  if(nextOffset > MAX_RECORDS) { 
    const lastDocument = document.createElement('h2');
    lastDocument.innerText= 'Todos los productos Obtenidos';
    $app.appendChild(lastDocument);
    intersectionObserver.disconnect()
  }
  return nextOffset;
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);