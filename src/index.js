const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const LIMIT = 10;
const OFFSET = 5;
const TOTAL_PRODUCTS = 200;

localStorage.clear();

const getData = api => {
  let pagination = parseInt(localStorage.getItem('pagination') || OFFSET) ;

  fetch(`${api}?offset=${pagination}&limit=${LIMIT}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
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
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);

      pagination += products.length;
      localStorage.setItem('pagination', pagination);

      if (pagination >= TOTAL_PRODUCTS) {
        alert('Todos los productos Obtenidos');
        intersectionObserver.disconnect();
      }

    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);