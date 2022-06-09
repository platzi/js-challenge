const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let pagination = 0;

const getData = async (api, initial) => {
  const response = await fetch(api)
  const responseJson = await response.json()
  const products = responseJson
    let output = products.slice(initial, initial+10 ).map( product => {
        return `<article class="Card">
        <img src="${product.images[0]}" alt='${product.title}' />
        <h2>
          ${product.title} 
          <small>$ ${product.price}</small>
        </h2>
      </article>`
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    }

const loadData = (initial) => {
  getData(API, initial );
}

const intersectionObserver = new IntersectionObserver(entries => {
  loadData(parseInt(pagination));
  pagination = pagination + 10
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
