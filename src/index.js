const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = `https://api.escuelajs.co/api/v1/products`;

localStorage.clear();

const limit = 10;
const offset = 5;

const getData = (api) => {
  let pagination = parseInt(localStorage.getItem('pagination'));
  if (!pagination) {
    localStorage.setItem('pagination', offset);
    pagination = offset;
  } else {
    pagination += limit;
    localStorage.setItem('pagination', pagination);
  }
  fetch(`${api}?limit=${limit}&offset=${pagination}`)
    .then((response) => response.json())
    .then((response) => {
      let output = '';
      let products = response;
      if (products.length === 0) {
        intersectionObserver.unobserve($observe);
        intersectionObserver.disconnect();
        output = `<span class="info">Todos los productos Obtenidos</span>`;
      } else {
        output = products.map((product) => {
          // template
          return `<article class="Card">
                  <img src=${product.images[0]} alt=${product.title} />
                  <h2>
                  ${product.title}
                  <small>$ ${product.price}</small>
                  </h2>
                </article>`;
        });
      }

      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

const loadData = async () => {
  try {
    await getData(API);
  } catch (error) {
    console.log(error);
  }
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
