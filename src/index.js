const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let offset = 5;
const getData = api => {
  fetch(`${api}?offset=${offset}&limit=10`)
  .then(response => response.json())
  .then(response => {
    let products = response;
    console.log(products)
    let output = products.map(product => {
      return`<article class="Card">
      <img src="${product.images[0]}" alt="image of ${product.title}" />
      <h2>
        ${product.title}
        <small>$${product.price}</small>
      </h2>
    </article>`;
    });
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output.join('');
    $app.appendChild(newItem);

    localStorage.setItem('pagination', offset);
    if (offset >= 200){
      $app.innerHTML+= `<h1 style="color:#3c484e;text-align:center;border:1px">Todos Los Productos Obtenidos</h1>`
      intersectionObserver.unobserve($observe);
      intersectionObserver.disconnect();
      return
    } 
    offset += 10;
    intersectionObserver.observe($observe);
  })
  .catch(error => console.log(error));
}

async function loadData() {
 await (getData(API));
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) loadData();
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
sessionStorage.setItem("is_reloaded", true);
