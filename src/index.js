const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let done = false;
const limit = 10;
localStorage.removeItem('pagination');

const getData = async (api) => {
  await fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      if (products.length < 10) {
        done = true;
      }
      let output = products.map(product => {
        // template
        return `
          <article class="Card">
            <img src="${product.images[0]}" alt="${product.title}">
            <h2>${product.title}
              <small>$${product.price}</small>
            </h2>
          </article>
        `;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output.join('');
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  let offset = localStorage.getItem('pagination');
  if (offset) {
    localStorage.setItem('pagination', parseInt(offset) + limit);
  } else {
    localStorage.setItem('pagination', 5);
  }
  offset = localStorage.getItem('pagination');
  const api = `${API}?offset=${offset}&limit=${limit}`;
  console.log(api);
  await getData(api);
  if (done === true) {
    intersectionObserver.unobserve($observe);
    // show message when all products are loaded
    let message = document.createElement('p');
    message.classList.add('message');
    message.innerHTML = 'Todos los productos Obtenidos';
    $app.appendChild(message);
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
  threshold: 1
});

intersectionObserver.observe($observe);
