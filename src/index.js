const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

let startIndex = 5;
const limit = 10;
const maxProducts = 200;

window.addEventListener(
  'beforeunload',
  function (e) {
    this.localStorage.clear();
  },
  false
);

const offset = () => {
  const pagination = localStorage.getItem('pagination')
    ? parseInt(localStorage.getItem('pagination')) + limit
    : 5;
  localStorage.setItem('pagination', pagination);
  return pagination;
};

const getData = async (api) => {
  try {
    const response = await fetch(api + `?limit=${limit}&offset=${offset()}`);
    const products = await response.json();
    const output = await products.map(
      (product) =>
        `<article class="Card">
        <img src="${product.images[0]}" alt="${product.title}" />
        <h2>
          ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>
      `
    );

    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    console.log(output);
    output.map((product) => {
      newItem.innerHTML += product;
    });
    $app.appendChild(newItem);

    if (pagination === 195 || output.length < 10) {
      const msgEndOfStock = document.createElement('section');
      msgEndOfStock.innerHTML = `<h3 class="text-center">Todos los productos Obtenidos</h3>`;
      document.getElementsByClassName('Main')[0].appendChild(msgEndOfStock);
      intersectionObserver.unobserve($observe);
    }
  } catch (error) {
    console.log(error);
  }
};

const loadData = async () => {
  await getData(API);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadData();
      }
    });
  },
  {
    rootMargin: '0px 0px 100% 0px',
  }
);

intersectionObserver.observe($observe);
