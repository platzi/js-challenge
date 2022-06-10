const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let pagination = 0;
let limit = 0;
localStorage.setItem('pagination', 5);

const getData = async (api, initial) => {
  const paginationUrl = `${API}?offset=${initial}&limit=10` 
  // const paginationUrl = `${API}?offset='240'&limit=10` 
  const response = await fetch(paginationUrl)
  const responseJson = await response.json()
  const products = await responseJson
    let output = await products.length ? products.map( product => {
        return `<article class="Card">
        <img src="${product.images[0]}" alt='${product.title}' />
        <h2>
          ${product.title} 
          ${product.id} 
          <small>$ ${product.price}</small>
        </h2>
      </article>`
      }) : ` <h1>Todos los productos Obtenidos </h1>`
      !products.length && intersectionObserver.unobserve($observe);
      !products.length && storage.removeItem(pagination);
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    }

const loadData = (initial) => {
  getData(API, initial );
}

const intersectionObserver = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting)
  {
    loadData(parseInt(pagination));
    pagination = pagination + 10

  }
  
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
