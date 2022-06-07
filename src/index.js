const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const speedLoad = 1000;

localStorage.clear();
localStorage.setItem('pagination',5);
const getData = (api) => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return `<article class="Card">
          <img src="${product.images[0]}" alt="${product.title}"/>
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}


const loadData = async (offset) => {
  let pagination =`?offset=${offset}&limit=10`;
  i = 0;
  setTimeout(() => {
    getData(API+pagination);
  },speedLoad)
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // let offset = parseInt(localStorage.getItem('pagination'))?parseInt(localStorage.getItem('pagination')):5;
      let offset = parseInt(localStorage.getItem('pagination'));
      if(offset>=200){
        $observe.innerHTML="<h2>Todos los productos obtenitdos</h2>";
        intersectionObserver.disconnect();
        return;
      }
      (async () => await loadData(offset))();
      localStorage.setItem('pagination',offset+10);
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
