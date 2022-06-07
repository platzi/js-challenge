const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage.setItem('pagination', 5);

const getData = async api => {
  try {
    const response = await fetch(api)
    const data = await response.json();
    buildProducts(data)
  } catch(e) {
    console.log(e);
  }
}

const buildProducts = products =>{
  let output = products.map(product => {
    return`
    <article class="Card">
      <img src="${product.images[0]}" />
      <h2>
        ${product.title}
        <small>$ ${product.price}</small>
      </h2>
    </article>
    `;
  });
  let newItem = document.createElement('section');
  newItem.classList.add('Items');
  newItem.innerHTML = output;
  $app.appendChild(newItem);
}

const loadData = async () => {
  let offset = localStorage.getItem('pagination');
  let limit = 10;
  let api = API + `?offset=${offset}&limit=${limit}`
  await getData(api);
  localStorage.setItem('pagination', parseInt(offset) + limit);
  if(parseInt(offset) + limit >= 200) {
    intersectionObserver.disconnect();
    let newItem = document.createElement('section');
    newItem.innerHTML = `<h1>Todos los productos Obtenidos</h1>`;
    $app.appendChild(newItem);
  } 
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry =>{
    if(entry.isIntersecting) {
      loadData();
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.addEventListener('beforeunload', function (e) {
  localStorage.clear();
});
