const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const INIT_INDEX = 4;
const LIMIT = 10;

let pagination = INIT_INDEX;

const getData = async (api, limit, offset) => {
  try {
    let response = await fetch(`${api}?limit=${limit}&offset=${offset}`);
    response = await response.json();
    pagination+=LIMIT;
    let products = response;
    let output = products.map(product => {
      return `<article class="Card">
        <img src="${product.images[0]}" />
        <h2>
        ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>`;
    });
    let newItem = document.createElement('section');
    newItem.classList.add('Item');
    newItem.innerHTML = output.join("");
    $app.appendChild(newItem);
  } catch (error) {
    console.log(error);
  }
}

const loadData = async (limit, offset) => {
  await getData(API, limit, offset);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.map(entrie => {
    if (entrie.isIntersecting) {
      loadData(LIMIT, pagination);
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
