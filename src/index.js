
const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
let pagination = localStorage.getItem('pagination')
localStorage.setItem('pagination', 5);
window.addEventListener('beforeunload', () => {
  localStorage.removeItem('pagination');
})

document.addEventListener('DOMContentLoaded', () => {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: [0.0, 0.25, 0.5, 0.75, 1.0]
    };
    function callback(entries) {
      if (document.getElementById('no-more-products') !== null) {
        observer.unobserve($observe);
      }
      loadData();
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe($observe);
  }
);

console.log("Ejecutamos el script")
const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let pagination = localStorage.getItem('pagination')
      if (products.length > 0) {
        let output = products.map(product => {
          return `
            <article class="Card">
              <img src="${product.category.image}" alt="${product.name}">
              <h2>${product.title} <small>$ ${product.price}</small></h2>
              <p>${product.description}</p>
            </article>
          `
        });
        var newPagination = parseInt(pagination)
        localStorage.setItem('pagination',newPagination + 10 )
        let newItem = document.createElement('section');
        newItem.classList.add('Item');
        newItem.innerHTML = output;
        $app.appendChild(newItem);
      }
      else {
        if (document.getElementById('no-more-products') === null) {
          let newItem = document.createElement('h1');
          newItem.classList.add('h1');
          newItem.id = 'no-more-products';
          newItem.innerHTML = "Todos los productos Obtenidos";
          $app.appendChild(newItem);
        }
      }
      
      
    })
    .catch(error => console.log(error));
  
}

async function loadData() {
  let pagination = localStorage.getItem('pagination')
  let API = `https://api.escuelajs.co/api/v1/products?limit=10&offset=${pagination}`;
  getData(API);
}
