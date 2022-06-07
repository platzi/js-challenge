const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = `https://api.escuelajs.co/api/v1/products`;

const limit = 10;
const offset = 4;

const getData = async (api) => {
  let pagination = parseInt(localStorage.getItem('pagination'));

  if (!pagination) {
    localStorage.setItem('pagination', offset);
    pagination = localStorage.getItem('pagination');
  } else {
    pagination += limit;
    localStorage.setItem('pagination', pagination);
  }
  try {
    const response = await fetch(`${api}?limit=${limit}&offset=${pagination}`);
    let output = '';
    let products = await response.json();
    console.log(products);
    if (products.length === 0) {
      intersectionObserver.disconnect();
      output = `<div class="info">Todos los productos Obtenidos</div>`;
    } else {
      output = products.map((product) => {
        // template
        return `<article class="Card">
                  <img src=${product.category.image} alt=${product.title} />
                  <h2>
                  ${product.title}
                  <small>${product.price}</small>
                  </h2>
                </article>`;
      });
    }

    let newItem = document.createElement('section');
    newItem.classList.add('Item');
    newItem.innerHTML = output;
    $app.appendChild(newItem);
  } catch (error) {
    console.log(error);
  }
};

const loadData = () => {
  // no aplica async/await porque es una funcion no una promesa
  getData(API);
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

onbeforeunload = () => {
  localStorage.clear();
};
