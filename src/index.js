const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const paginationKey = 'paginationControl';
const apiOffset = 5;
const apiLimit = 10;
let returnsItems = true;

// Sets localStorage object
const setCurrentState = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

// Gets localStorage object
const getCurrentState = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// Loads articles from API and creates template items
const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = '';
      returnsItems = products.length ? true : false;
      if (!returnsItems) {
        intersectionObserver.unobserve($observe);
        output = '<div>Todos los productos Obtenidos</div>';
      } else {
        output = products.map((product) => {
          let newProduct = `
          <article class="Card">
            <img src="${product.images[0]}" />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
          `;

          return newProduct;
        });
      }
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

const loadData = (offset, limit) => {
  getData(`${API}?offset=${offset}&limit=${limit}`);
};

const observerOptions = {
  threshold: 1.0,
  rootMargin: '0px 0px 100% 0px',
};

const intersectionObserver = new IntersectionObserver((entries) => {
  // logic...
  if (entries[0].isIntersecting) {
    if (returnsItems) {
      // Gets next page of articles from API
      loadData(getCurrentState(paginationKey).offset + apiLimit, apiLimit);
      // Increments page
      setCurrentState(paginationKey, {
        offset: getCurrentState(paginationKey).offset + apiLimit,
      });
    }
  }
}, observerOptions);

const initializePage = () => {
  // Creates new localStorage object when page loads for first time
  setCurrentState(paginationKey, {
    offset: apiOffset,
  });

  loadData(getCurrentState(paginationKey).offset, apiLimit); // Gets first page of articles from API

  intersectionObserver.observe($observe); // Starts observing trigger div
};

initializePage(); // Starts the store display
