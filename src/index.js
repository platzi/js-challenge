const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const initalPagination = 5
const limit = 10

const getData = async (api) => {

  let pagination = Number(localStorage.getItem('pagination'))
  if (!pagination) {
    localStorage.setItem('pagination', initalPagination)
    pagination = initalPagination
  } else {
    pagination = pagination + limit
    localStorage.setItem('pagination', pagination)
  }

  fetch(`${api}?offset=${pagination-1}&limit=${limit}`)
    .then(response => response.json())
    .then(response => {
      let products = response;

      let output = products.map(product => {
        return `<article class="Card">
          <img src="${product.images[0]}" />
          <h2>
          ${product.id}-${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`

      });
      if(products.length == 0){
        alert('Todos los productos Obtenidos')
        intersectionObserver.disconnect()
      }
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API)
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      loadData()
    }
  })

}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.onbeforeunload = function () {
  localStorage.clear()
}