const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const $allLoadedMsg = document.getElementById('all-loaded-msg');
const API = 'https://api.escuelajs.co/api/v1/products';
const START_ITEM = 5;
const ITEMS_PER_PAGE = 10;
const TOTAL_ITEMS = 201;
//const TOTAL_PAGES = TOTAL_ITEMS / ITEMS_PER_PAGE;
const PAGINATION_KEY = 'pagination';
const PAGINATION_LAST_ITEM = 'lastItem';

localStorage.clear();
localStorage.setItem(PAGINATION_KEY, START_ITEM);

const getData = async (api, offset) => {
  try {

    const rawResponse = await fetch(
      `${api}?offset=${offset}&limit=${ITEMS_PER_PAGE}`
    );
    const products = await rawResponse.json();
    let output = products.map(product => {
      
      const images = product.images;
      const image = images[Math.floor(Math.random() * images.length)];

      return `<article class="Card">
          <img src="${image}" alt="${product.title}"/>
          <h2>
            ${product.id} ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`;
    });
    
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output.join('\n');
    $app.appendChild(newItem);
    $app.appendChild($observe);
    
    localStorage.setItem(PAGINATION_LAST_ITEM, offset + ITEMS_PER_PAGE);
    localStorage.setItem(PAGINATION_KEY, offset);
  } catch (error) {
    throw new Error('[getData] - Error al cargar los datos');
  }
};

const loadData = async offset => {
  try {
    await getData(API, offset);
  } catch (error) {
    console.error(error);
  }
};

const intersectionObserver = new IntersectionObserver(
  entries => {
    
    const offset = parseInt(localStorage.getItem(PAGINATION_LAST_ITEM)) || parseInt(localStorage.getItem(PAGINATION_KEY));
    if (entries.some(entry => entry.intersectionRatio > 0 || entry.isIntersecting)) {
      loadData(offset);
    }
    
    if (offset >= TOTAL_ITEMS) {
      intersectionObserver.unobserve($observe);
      $allLoadedMsg.style.display = 'block';
      return;
    }
    
  },
  {
    rootMargin: '0px 0px 100% 0px',
  }
);

intersectionObserver.observe($observe);