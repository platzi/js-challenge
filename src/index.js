const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const itemsPerPage = 10;
const initialItem = 5;
const debug = true;

const getData = (api, currentPage) => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      if(debug) console.log('current page = ' + currentPage);
      let initialId = ((currentPage * itemsPerPage) - itemsPerPage + initialItem);
      let endingId = ((currentPage * itemsPerPage) + initialItem - 1);
      if(debug) console.log('initialId = ' + initialId + ', endingId = ' + endingId);
      let itemsInPage = 0;
      // let output = products.map(product => {
      let output = products
        .filter(product => (product.id >= initialId && product.id <= endingId))
        .map(function (product) {
        // template
        itemsInPage++;
        return '' +
          '<article class="Card">' +
            '<h2>' + 
            product.id +
            ' | ' +
            product.title + 
            '<small>Precio: $' + product.price + '</small>' +
            '</h2>' +
            '<img src="' + product.images[0] +'"></img>' +
            '<h2>' + product.description + '</h2>' +
          '</article>';
      });
      localStorage.setItem('itemsInPage', itemsInPage);
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      // if(debug) console.log(output);
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

async function loadData(currentPage) {
  getData(API, currentPage);
}

window.onbeforeunload = function() {
  localStorage.removeItem('pagination');
  localStorage.removeItem('itemsInPage');
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  if(debug) console.log('..........');
  if(localStorage.getItem('pagination') == null) {
    localStorage.setItem('pagination', 1);
    if(debug) console.log('initial page = ' + localStorage.getItem('pagination'));
  } else {
    let nextPage = parseInt(localStorage.getItem('pagination')) + 1;
    if(debug) console.log('nextPage = ' + nextPage);
    localStorage.setItem('pagination', nextPage);
  }
  loadData(parseInt(localStorage.getItem('pagination'))).then(function() {
    if(debug) console.log('itemsInPage = ' + localStorage.getItem('itemsInPage'));
    if(parseInt(localStorage.getItem('itemsInPage')) < itemsPerPage) {
      // EOF
      if(debug) console.log('Todos los productos Obtenidos'); // TODO
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
