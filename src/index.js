const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const storage = window.localStorage;
let primerLoad = true

const getData = (api, page) => {
  fetch(`${api}?offset=${4+(page*10)}&limit=10`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = ""
      products.map(product => {
        // template
        console.log(product)
        output = output.concat(`
          <article class="Card" key="${product.id}">
            <img src="${product.images[0]}" />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
        `)
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API, storage.getItem('pagination'))
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  if (primerLoad){
    storage.setItem('pagination', 0)
    loadData()
    primerLoad = false
  } else {
    console.log(storage.getItem('pagination'))
    if (parseInt(storage.getItem('pagination')) === 19){
      alert("Todos los productos Obtenidos")
      intersectionObserver.unobserve($observe)
    }
    if (entries[0].isIntersecting === true){
      let pagination = parseInt(storage.getItem('pagination'))
      pagination++
      storage.setItem('pagination', pagination)
      loadData()
    }
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
