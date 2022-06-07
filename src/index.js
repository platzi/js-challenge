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
        <article class="Card">
          <img src="${product.images[0]}" alt="${product.title}"/>
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>
        `
      );
      localStorage.setItem('initialOffset', parseInt(offset) + ITEMS_PER_PAGE);
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output.join('');
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
