const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
var offset = 4

localStorage.setItem('pagination', 4);

const getData = async (api) => {
  fetch(`${api}?limit=10&offset=${offset}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return `<article class="Card">
                  <img src="${product.images[0]}" alt="Image of the product #${product.id}"/>
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

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  offset = parseInt(localStorage.getItem('pagination'));
  if (offset >= 200) {
    alert("Todos los productos Obtenidos")
    intersectionObserver.disconnect()
    return
  }
  if (entries[0].isIntersecting && Math.floor(entries[0].intersectionRatio) === 1) {
    (async () => await loadData())();
    localStorage.setItem('pagination', offset + 10);    
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
