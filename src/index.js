const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage.setItem('offset', 4);

const getData = async (api) => {
  return fetch(`${api}?offset=${localStorage.getItem('offset')}&limit=10`)
    .then(response => {
      localStorage.setItem('offset', parseInt(localStorage.getItem('offset')) + 10);
      return response.json();
    })
    .catch(error => {
      localStorage.setItem('offset', parseInt(localStorage.getItem('offset')) + 10);
      console.log(error);
    });
}

const loadData = async () => {
  const products = await getData(API);
  let output = products.map(product => {
    return `
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
  newItem.classList.add('Item');
  newItem.innerHTML = output;
  $app.appendChild(newItem);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  loadData();
  if (localStorage.getItem('offset') >= 200) {
    intersectionObserver.unobserve($observe);
    let newItem = document.createElement('section');
    newItem.innerHTML = `<h1>Todos los productos Obtenidos</h1>`;
    $app.appendChild(newItem);
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
