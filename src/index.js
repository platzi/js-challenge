const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const STEP = 10;
const TOTAL_PRODUCTS = 200;
localStorage.clear();

const getData = async (api, offset) => {
  const response = await fetch(`${api}?offset=${offset}&limit=${STEP}`);
  try {
    const products = await response.json();
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    products.forEach(element => (element.id <= TOTAL_PRODUCTS) ? newItem.innerHTML += createCard(element) : console.log('Fuera de rango') );
    $app.appendChild(newItem);
    localStorage.setItem('pagination', offset);
  } catch (error) {
    console.log(error)
  }
}

const createCard = (element) => {
  newCard = `
    <article class="Card">
      <img src="${element.images[0]}" />
      <h2>
        ${element.title}
        <small>$ ${element.price}</small>
      </h2>
    </article>
  `
  return newCard;
}

const loadData = async (offset) => {
  await getData(API, offset);
}

const intersectionObserver = new IntersectionObserver(entries => {
    if (localStorage.getItem('pagination') > TOTAL_PRODUCTS) {
      alert('Todos los productos Obtenidos');
      intersectionObserver.unobserve($observe);
      $app.innerHTML += '<h1 style="text-align:center;">Se han obtenido todos los productos</h1>';
    }
    if (entries[0].isIntersecting) {
      const offset = localStorage.getItem('pagination') ? parseInt(localStorage.getItem('pagination')) + 10 : 5;
      loadData(offset);
    }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
