//
// Constants
//
const $app = document.getElementById('app');
const $observe = document.getElementById('observe');

const API = 'https://api.escuelajs.co/api/v1/products';
const LIMIT_PER_PAGE = 10;
const FIST_PAGE = 5;
const LAST_PAGE = 200;

//
// Storage functions
//

const savePagination = (pagination) => {
  localStorage.setItem('pagination', Math.max(FIST_PAGE, pagination));
}

const loadPagination = () => {
  return parseInt(localStorage.getItem('pagination') || FIST_PAGE);
}

const clearPagination = () => {
  localStorage.removeItem('pagination');
}

//
// Components
//

const Card = (product) => (
  `<article class="Card" data-id="${product.id}">
    <img src="${product.images[0]}" alt="${product.title}">
    <h2>
      ${product.title}
      <small>$ ${product.price}</small>
    </h2>
  </article>`
);

let currentPage = loadPagination();

//
// Services
//

const getData = async (api) => {
  try {
    const response = await fetch(`${api}?limit=${LIMIT_PER_PAGE}&offset=${currentPage}`);
    const products = await response.json();
    const output = products.map(Card).join('')

    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output
    $app.appendChild(newItem);

    savePagination(currentPage);

    currentPage += products.length;

    if (currentPage >= LAST_PAGE) {
      let message = document.createElement('p');
      message.classList.add('Message');
      message.innerHTML = "Todos los productos obtenidos 😫"
      $app.appendChild(message);

      intersectionObserver.disconnect();
    }

  } catch (error) {
    console.log(error);
  }
}

const loadData = () => {
  getData(API);
}

//
// Infinite scroll
//

const intersectionObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting)
    loadData()
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

// Events

window.addEventListener('beforeunload', () => clearPagination());
