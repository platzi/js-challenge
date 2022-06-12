const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = async api => {
  let current = parseInt(localStorage.getItem('pagination')) || 5;
  if (current > 200) {
    $observe.innerHTML = "<h3>Todos los productos Obtenidos</h3>";
    intersectionObserver.unobserve($observe);
    return;
  }
  const getData = await fetch(`${api}?offset=${current}&limit=10`);
  const response = await getData.json();
  let products = response;
  let output = products.map(product => {
    return `<article class="Card" id="Card-${product.id}">
    <img src="${product.images[0]}" alt="${product.title}" />
    <h2>
    ${product.title}
    <small>$ ${product.price}</small>
    </h2>
    </article>`;
  }).join('');
  let newItem = document.createElement('section');
  newItem.classList.add('Item');
  newItem.innerHTML = output;
  $app.appendChild(newItem);
  localStorage.setItem('pagination', current + 10);
  console.log(localStorage.getItem('pagination')); 
}

const loadData = () => {
  getData(API);
}


const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);




(function () { 
  localStorage.clear('pagination');
})();


