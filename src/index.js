const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const storageKey = 'pagination';
const lastItem = 'lastItem';
const limit = 10;

localStorage.clear();
localStorage.setItem(storageKey, 5);

const getData = api => {
  const offset = parseInt(localStorage.getItem(lastItem)) || parseInt(localStorage.getItem(storageKey));
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
      localStorage.setItem(lastItem, offset+limit);
      localStorage.setItem(storageKey, offset);
    })
    .catch(error => console.log(error));
};

const loadData = async () => {
  await getData(API);
};

const intersectionObserver = new IntersectionObserver(entries => {
  let last = parseInt(localStorage.getItem(lastItem));
  if(entries[0].isIntersecting){
    loadData();
  }else{
    if(last>=195){
      const info = `<p class="Info">Todos los productos Obtenidos</p>`;
      $observe.innerHTML = info;
      intersectionObserver.disconnect();
    }
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
