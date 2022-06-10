const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let pagination = 0;
let limit = 0;
let totalProducts = 1;
localStorage.setItem('pagination', 5);

const getData = async (api, initial) => {
  if(initial === 0) {
    const responseTotalItems = await fetch(api)
    const responseTotalItemsJson = await responseTotalItems.json()
    const AllProducts = await responseTotalItemsJson
    totalProducts = AllProducts.length - 1
  }

  const paginationUrl = `${API}?offset=${initial}&limit=10` 
  const response = await fetch(paginationUrl)
  const responseJson = await response.json()
  const products = await responseJson
    let output = products.map( product => {
        return `<article class="Card">
        <img src="${product.images[0]}" alt='${product.title}' />
        <h2>
          ${product.title} 
          ${product.id} 
          <small>$ ${product.price}</small>
        </h2>
      </article>`
      })
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    }

const loadData = async(initial) => {
  await getData(API, initial );
  initial > 11 && localStorage.clear();
  if(initial >= totalProducts) {
    intersectionObserver.unobserve($observe);
    let newItem2 = document.createElement('section');
    newItem2.innerHTML = ` <h1>Todos los productos Obtenidos </h1>`;
    $app.appendChild(newItem2);
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting)
  {
    loadData(parseInt(pagination));
    pagination = pagination + 10

  }
  
}, {
  rootMargin: '0px 0px 90% 0px',
});

intersectionObserver.observe($observe);