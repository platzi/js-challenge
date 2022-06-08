const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

// API settings
const limit = 10;
let offset = 5;

const getData = async api => {
  // update pagination
  localStorage.setItem("pagination", offset)

  await fetch(`${api}/?offset=${parseInt(localStorage.getItem("pagination"))}&limit=${limit}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
        return `
          <article class="Card">
            <img src="${product.images[0]}" />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
        `;
      }).join('');
            
      // If there isn't new elements, stop infinite scroll
      if(products.length === 0){
        // stop observing intersection
        intersectionObserver.unobserve($observe);

        // display message all products already displayed
        output = "<small>Todos los productos obtenidos</small>";
      }
      
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);

      // update offset for next query to API
      offset += limit;
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // load data if the observer is on screen
  entries.forEach(entry => {
    entry.intersectionRatio > 0 ? loadData() : null;
  });

}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
