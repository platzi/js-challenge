const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
/* INICIALIZANDO LA API FAKE DE PLATZI */
const API = 'https://api.escuelajs.co/api/v1/products';
let start = 5;
let limit = 10;
let maxProducts = 200;

const getData = async (api) => {

  const pagination = localStorage.getItem("pagination") ? parseInt(localStorage.getItem("pagination")) + limit : start;

  if (pagination <= maxProducts) {

    localStorage.setItem("pagination", pagination);

    const response = await fetch(api + `/?limit=${limit}&offset=${pagination}`);
    const products = await response.json();
    const output = await products.map(product => `
      <article class="Card">
        <img src="${product.images[0]}" alt="${product.title}" />
        <h2>
          ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>
    `);
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    output.map((products) => {
      newItem.innerHTML += products;
    });
    $app.appendChild(newItem);
  } else {
    let newItem = document.createElement('div');
    newItem.classList.add("end-list");
    newItem.innerHTML = "Todos los productos Obtenidos";
    $app.appendChild(newItem);
    $observe.remove();
  }



}//end-getData

const loadData = async () => {
  await getData(API);
}//end-loadData

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      loadData();
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});//end-Observer

window.addEventListener("beforeunload", function (e) {
  this.localStorage.clear()
}, false);

intersectionObserver.observe($observe);
