const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = `https://api.escuelajs.co/api/v1/products`;

let offset = 5;
let limit = 10;
let output = [];
let previousOffset;
let previousLimit;
const MAX_PRODUCTS = 190;

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      output = products.map(product => {
        renderElements(product);
      });
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(`${API}?offset=${offset}&limit=${limit}`);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      /* Calculate offset */
      previousOffset = offset;
      previousLimit = limit;
      offset = previousOffset + previousLimit;
      if (offset > 15) {
        localStorage.setItem("pagination", offset);
      }
      loadData();
      console.log(offset);
    } else if (offset >= MAX_PRODUCTS) {
      /* Stop observer */
      intersectionObserver.unobserve($observe);
      showLastMessage();
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

const renderElements = (element) => {
  /* Create tags */
  let newItem = document.createElement('section');
  let newCard = document.createElement('article');
  let img = document.createElement('img');
  let h2 = document.createElement('h2');

  /* Add classes */
  newItem.classList.add('Items');
  newCard.classList.add('Card');

  /* Add properties */
  img.src = element.category.image;
  h2.innerHTML = `${element.title} <small>${element.price}</small>`;

  /* Child's */
  newCard.appendChild(img);
  newCard.appendChild(h2);
  newItem.appendChild(newCard);
  $app.appendChild(newItem);
}

const showLastMessage = () => {
  let p = document.createElement('p');
  p.innerHTML = `<strong>Todos los productos Obtenidos</strong>`;
  $app.appendChild(p);
}

function clearStorage() {
  let pagination = localStorage.getItem('pagination');
  if (pagination != null) {
      localStorage.removeItem('pagination');
  }
}
window.addEventListener('load', clearStorage);
