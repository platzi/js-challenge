const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const INITIAL_OFFSET = 5;
const LIMIT = 10;
const PAGINATION_STR = 'pagination';

localStorage.clear();
localStorage.setItem(PAGINATION_STR, INITIAL_OFFSET);

const getData = api => {
  const currentOffset = parseInt(localStorage.getItem(PAGINATION_STR)) 

  localStorage.setItem(PAGINATION_STR, parseInt(currentOffset + 10))
  
  fetch(`${api}?offset=${currentOffset - 1}&limit=${LIMIT}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return `<article class="Card">
          <img src="${product.images[0]}""/>
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
  
  if(parseInt(localStorage.getItem(PAGINATION_STR)) > 200){
    $observe.innerHTML="Todos los productos Obtenidos.";
      intersectionObserver.disconnect();
  }

  if (entries[0].isIntersecting) {
    loadData();
  } 
  
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);