const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage.setItem("pagination", '5');

let first_time = true;

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
        return `
        <article class="Card">
  <img src="${product.images[0]}" />
  <h2>
    Producto
    <small>$ Precio</small>
  </h2>
</article>
`
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  let offset = localStorage.getItem("pagination");
  const LIMIT = 10;
  if (!first_time) localStorage.setItem("pagination", parseInt(offset) + LIMIT);
  getData(API + `?offset=${offset}` + `&limit=${LIMIT}`); 
  first_time = false;
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
