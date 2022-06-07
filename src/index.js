const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let firstProduct=5;
const nProducts=10;
const maxProducts=200;

const getData = api => {
  const offsetProduct=localStorage.getItem('pagination')!=null
  ?localStorage.getItem('pagination')+nProducts
  :firstProduct
  localStorage.setItem('pagination',offsetProduct);
  console.log('offset',offsetProduct)
  fetch(`${api}?offset=${offsetProduct}&limit=${nProducts}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return `<article class="Card">
        <img src="${product.images[0]}" alt="${product.title}" />
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
    })
    .catch(error => console.log(error));
}

const loadData = () => {
    getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  //console.log('entries',entries)
  if (entries[0].isIntersecting) loadData();
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
