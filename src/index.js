const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const ITEMS_PER_PAGE = 10;
let OFFSET = 5;

// Las instrucciones decian que debia refactorizar la funcion load data
// pero no tiene mucho sentido ya que esa funcion solo llamaba a getData
// y no hace nada mas. Asi que refactorice getData tambien
const getData = async api => {
  try {
    const rawResponse = await fetch(
      `${api}?offset=${OFFSET}&limit=${ITEMS_PER_PAGE}`
    );
    const products = await rawResponse.json();
    let output = products.map(
      product => `
          <article class="Card">
            <img src="${product.images[0]}" alt="${product.title}"/>
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
          `
    );
    OFFSET += ITEMS_PER_PAGE;
    let newItem = document.createElement('section');
    newItem.classList.add('Item');
    newItem.innerHTML = output.join('');
    $app.appendChild(newItem);
  } catch (error) {
    throw new Error('[getData] - Error al cargar los datos');
  }
};

const loadData = async () => {
  try {
    await getData(API);
  } catch (error) {
    console.error(error);
    let newItem = document.createElement('div');
    newItem.classList.add('error-msg');
    newItem.innerHTML = 'Algo salio mal';
    $app.appendChild(newItem);
  }
  if (OFFSET >= 200) {
    $observe.remove();
    let newItem = document.createElement('div');
    newItem.classList.add('msg');
    newItem.style.textAlign = 'center';
    newItem.style.padding = '2rem 0';
    newItem.innerHTML = 'Todos los productos Obtenidos';
    $app.appendChild(newItem);
  }
};

const intersectionObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  },
  {
    rootMargin: '0px 0px 100% 0px',
  }
);

intersectionObserver.observe($observe);
