const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const storageKey = 'pagination';
const initialOffset = 5;
const limit = 10;

localStorage.removeItem(storageKey);
localStorage.setItem(storageKey, initialOffset);

const getData = api => {
  const offset = parseInt(localStorage.getItem(storageKey));
  fetch(api+`?offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let cards = products.map(product => {
        // Template card
        return (
          `<article class="Card">
            <img src="${product.images[0]}" alt="${product.title}" />
            <h2>
              ${product.title}
              <small>$${product.price} Precio</small>
            </h2>
          </article>`);
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      let output = '';
      cards.forEach(card => {
        output = output + card;
      });
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      localStorage.setItem(storageKey, offset+limit);
    })
    .catch(error => console.log(error));
};

const loadData = async () => {
  await getData(API);
};

loadData();

const intersectionObserver = new IntersectionObserver(entries => {
  let offset = parseInt(localStorage.getItem(storageKey));
  if(entries[0].isIntersecting){
    loadData();
  }else{
    if(offset>=200){
      const info = `<p class="Info">Todos los productos Obtenidos</p>`;
      $observe.innerHTML = info;
      intersectionObserver.disconnect();
    }
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
