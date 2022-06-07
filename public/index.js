const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const storage = window.localStorage;

storage.clear()

const getData = async (api, page) => {
  await fetch(`${api}?offset=${page}&limit=10`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return `
          <article class="Card" key="${product?.id}">
            <img src="${product?.images[0]}" alt={${product?.category?.name}}/>
            <h2>
              ${product.title}
              <small>$ ${product?.price}</small>
            </h2>
          </article>
        `;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output.join('');
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = (pagination) => {
  storage.setItem('pagination', pagination)
  getData(API, pagination)
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  if (!entries[0].isIntersecting) return 
  const pagination = localStorage.getItem("pagination")
    ? parseInt(localStorage.getItem("pagination")) + 10
    : 5;
  if (pagination < 200){
    loadData(pagination)
  } else {
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = '<h2>Todos los productos Obtenidos</h2>';
    $app.appendChild(newItem);
    intersectionObserver.unobserve($observe)
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
