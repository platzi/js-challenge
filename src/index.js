const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';


let ofsset = 5;
const LIMIT = 10;
window.localStorage.setItem('pagination', 0);

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;

      if (products.length == 0) {
        alert("Todos los productos Obtenidos");
        intersectionObserver.disconnect();
      }

      let output = products.map((product) => {
        return (`
                  <article class="Card">
                    <img src="${product.category.image}"  />
                    <h2>Producto <small>${product.price}</small></h2>
                  </article>
                `)
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  offset = (LIMIT * parseInt(window.localStorage.getItem('pagination'))) - 5;
  await getData(`${API}?offset=${offset}&limit=${LIMIT}`);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      window.localStorage.setItem('pagination', parseInt(window.localStorage.getItem('pagination')) + 1);
      loadData();
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
