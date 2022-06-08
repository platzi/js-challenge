const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage.clear();
localStorage.setItem('pagination', 5);

const getData = (api) => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map((product) => 
        `<article class="Card">
          <img src="${product.category.image}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`
      );
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output.toString().split(",").join("");
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async (queryOffset, queryLimit) => {
  getData(`${API}?offset=${queryOffset}&limit=${queryLimit}`);
}

const loadMessage = () => {
  let message = document.createElement('p');
  message.classList.add('message');
  message.innerHTML = 'Todos los productos Obtenidos';
  $app.appendChild(message);
}

const intersectionObserver = new IntersectionObserver( (entries) => {
  let queryOffset = parseInt(localStorage.getItem('pagination'));
  let queryLimit = 10;
  let totalProductsLimit = 200;
  if ((queryOffset + queryLimit) <= totalProductsLimit) {
    loadData(queryOffset, queryLimit);
    let newPagination = queryOffset + queryLimit;
    localStorage.setItem('pagination', newPagination);
  } else {
    loadMessage();
    intersectionObserver.disconnect($observe);
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);