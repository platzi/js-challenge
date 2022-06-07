const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const ITEMS_PER_PAGE = 10;
localStorage.clear('pagination');

// Las instrucciones decian que debia refactorizar la funcion load data
// pero no tiene mucho sentido ya que esa funcion solo llamaba a getData
// y no hace nada mas. Asi que refactorice getData tambien
const getData = async (api, offset) => {
  try {
    const rawResponse = await fetch(
      `${api}?offset=${offset}&limit=${ITEMS_PER_PAGE}`
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
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output.join('');
    $app.appendChild(newItem);
    localStorage.setItem('pagination', offset);
  } catch (error) {
    throw new Error('[getData] - Error al cargar los datos');
  }
};

const loadData = async offset => {
  if (offset >= 200) {
    $observe.remove();
    let newItem = document.createElement('div');
    newItem.classList.add('msg');
    newItem.style.textAlign = 'center';
    newItem.style.padding = '2rem 0';
    newItem.innerHTML = 'Todos los productos Obtenidos';
    $app.appendChild(newItem);
    return;
  }

  try {
    await getData(API, offset);
  } catch (error) {
    console.error(error);
    let newItem = document.createElement('div');
    newItem.classList.add('error-msg');
    newItem.innerHTML = 'Algo salio mal';
    $app.appendChild(newItem);
  }
};

const intersectionObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      const offset = localStorage.getItem('pagination');
      loadData(offset || 5);
    }
  },
  {
    rootMargin: '0px 0px 100% 0px',
  }
);

intersectionObserver.observe($observe);
