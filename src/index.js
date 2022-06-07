 localStorage.removeItem('pagination')
 localStorage.setItem('pagination', 5);

 window.onbeforeunload = function () {
  console.log("action");
 }


const $app = document.getElementById('app');
const $observe = document.getElementById('observe');

const API = 'https://api.escuelajs.co/api/v1/products';

const PRODUCTS_PER_PAGE = 10;
let OFFSET = localStorage.getItem('pagination');


const formatProductDataToHTML = product => `
  <article class="Card">
    <img src="${product.images[0]}" alt="${product.title}"/>
    <h2>
      ${product.title}
      <small>$ ${product.price}</small>
    </h2>
  </article>
`;

const getProducts = async api => {
  let OFFSET = Number(localStorage.getItem('pagination'));
  try {
    const URL = `${api}?offset=${OFFSET}&limit=${PRODUCTS_PER_PAGE}`;
    const response = await fetch(URL);

    const products = await response.json();

    let productsHTML = products.map(formatProductDataToHTML);

    localStorage.setItem('pagination', OFFSET + PRODUCTS_PER_PAGE);

    let newItem = document.createElement('section');
    newItem.classList.add('Item');
    newItem.innerHTML = productsHTML.join('');
    $app.appendChild(newItem);

    if (products.length < PRODUCTS_PER_PAGE) {
      return { allProductsReady: true };
    }
  } catch (error) {
    throw new Error('[getData] - Error al cargar los datos');
  }
};

const loadMoreProducts = async () => {
  try {
   const metadata =  await getProducts(API);

    if (metadata?.allProductsReady) {
      $observe.remove();
      let newItem = document.createElement('div');
      newItem.classList.add('msg');
      newItem.style.textAlign = 'center';
      newItem.style.padding = '2rem 0';
      newItem.innerHTML = 'Todos los productos Obtenidos';
      $app.appendChild(newItem);
    }

  } catch (error) {
    console.error(error);
    let newItem = document.createElement('div');
    newItem.classList.add('error-msg');
    newItem.innerHTML = 'Algo salio mal';
    $app.appendChild(newItem);
  }
};

const intersectionObserverCallback = ([ entrie ]) => {
  if (entrie.isIntersecting) loadMoreProducts();
}

const intersectionObserver = new IntersectionObserver(
  intersectionObserverCallback,
  { rootMargin: '0px 0px 100% 0px', }
);

intersectionObserver.observe($observe);