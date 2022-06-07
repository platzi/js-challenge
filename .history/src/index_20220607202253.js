const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

let isFirst = true;

const getData = async (api) => {
  if (!isFirst) localStorage.setItem('pagination', parseInt(localStorage.getItem('pagination')) + 10);
  isFirst = false;

  return fetch(`${api}?offset=${localStorage.getItem('pagination')}&limit=10`)
    .then(response => response.json())
    .catch(error => {
      localStorage.setItem('pagination', parseInt(localStorage.getItem('pagination')) + 10);
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
  newItem.classList.add('Items');
  newItem.innerHTML = output.join('');
  $app.appendChild(newItem);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
      if (localStorage.getItem('pagination') >= 200) {
        intersectionObserver.unobserve($observe);
        let newItem = document.createElement('section');
        newItem.innerHTML = `<h1>Todos los productos Obtenidos</h1>`;
        $app.appendChild(newItem);
      }
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);