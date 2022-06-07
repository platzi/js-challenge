const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const ITEMS_PER_PAGE = 10;
localStorage.setItem('initialOffset', 5);

const getData = api => {
  const offset = localStorage.getItem('initialOffset');
  fetch(`${api}?offset=${offset}&limit=${ITEMS_PER_PAGE}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(
        product => `
        <div class="card">
          <img src="${product.images[0]}" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
          </div>
        </div>
        `
      );
      localStorage.setItem('initialOffset', parseInt(offset) + ITEMS_PER_PAGE);
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
};

const loadData = () => {
  getData(API);
};

const intersectionObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      loadData();
      console.log(entries);
    }
  },
  {
    rootMargin: '0px 0px 100% 0px',
  }
);

intersectionObserver.observe($observe);
