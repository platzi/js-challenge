const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const LIMIT = 10;
const OFFSET = 5;
const TOTAL_PRODUCTS = 200;
const PAGINATION_KEY = 'pagination'

localStorage.removeItem(PAGINATION_KEY);
let pagination = OFFSET;

const getData = async(api) => {
  try {
    if (pagination >= TOTAL_PRODUCTS) {
      alert('Todos los productos Obtenidos');
      intersectionObserver.disconnect();
      return;
    }
  
    const response = await fetch(`${api}?offset=${pagination}&limit=${LIMIT}`);
    const products = await response.json();
    
    let output = products.map(product => {
      return `<article class="Card">
                <img src="${product.category.image}" alt="#${product.title}"/>
                <h2>
                  ${product.title}
                  <small>$ ${product.price}</small>
                </h2>
              </article>`
      });
      
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output;
    $app.appendChild(newItem);
  
    localStorage.setItem(PAGINATION_KEY, pagination);
    pagination += products.length;

  } catch(error) {
    console.log(error)
  }
}

const loadData = async() => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);