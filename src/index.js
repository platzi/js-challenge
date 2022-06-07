const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const PAG_STORAGE_KEY = 'pagination';
const INITIAL_OFFSET = 5;
const LIMIT = 10;

localStorage.removeItem(PAG_STORAGE_KEY);
localStorage.setItem(PAG_STORAGE_KEY, INITIAL_OFFSET);

const getData = api => {
  const OFFSET = localStorage.getItem(PAG_STORAGE_KEY);
  const URL = `${api}?offset=${(Number(OFFSET))}&limit=${LIMIT}`;
  fetch(URL)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
        return `<article class="Card">
          <img src="${product.images[0]}" alt="${product.title}"/>
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  if (entries[0].isIntersecting) {
    loadData();
  } else {
    const nextPage = Number(localStorage.getItem(PAG_STORAGE_KEY)) + LIMIT;
    localStorage.setItem(PAG_STORAGE_KEY, nextPage);
    if(nextPage>=200){
      $observe.innerHTML="Todos los productos Obtenidos";
      intersectionObserver.disconnect();
      return;
    }
  }

}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
