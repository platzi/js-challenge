const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const itemsPerPage = 10;
const initialItem = 5;
const debug = true;
const productTemplateType='0';

// Carga los datos de la API para la pagina corriente
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
      let output = products
        .filter(product => (product.id >= initialId && product.id <= endingId))
        .map(function (product) {
        // template
        itemsInPage++;
        return productCardTemplate(productTemplateType, product);
      });
      localStorage.setItem('itemsInPage', itemsInPage);
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

// Carga los datos para la pagina corriente
async function loadData(currentPage) {
  getData(API, currentPage);
}

// Hace aparecer el mensaje con un boton para cerrarlo
const showMessage = (msg) => {
  document.getElementById('eofAlert').style.display='block'
  document.getElementById('eofAlertMessage').innerHTML=msg;
}

// Card template
const productCardTemplate = (templateType, product) => {
  switch(templateType) {
    case '1':
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
    case '1':
    default:
      return '' +
        '<article class="Card">' +
          '<img src="' + product.images[0] +'"></img>' +
          '<h2>' + 
          product.title + 
          '<small>Precio: $' + product.price + '</small>' +
          '</h2>' +
        '</article>';
  }
}

// Reinicia el localstorage cuando se hace refresh
window.onbeforeunload = function() {
  localStorage.removeItem('pagination');
  localStorage.removeItem('itemsInPage');
}

// Maneja el EOF (fin de archivo) de la API
const eofHandler = function() {
  if(debug) console.log('Todos los productos Obtenidos');
  showMessage('Todos los productos Obtenidos');
  intersectionObserver.unobserve($observe);
}

const paginationHandler = function() {
  if(localStorage.getItem('pagination') == null) {
    // Primera vez
    localStorage.setItem('pagination', 1);
    if(debug) console.log('initial page = ' + localStorage.getItem('pagination'));
  } else {
    // Siguiente pagina
    let nextPage = parseInt(localStorage.getItem('pagination')) + 1;
    if(debug) console.log('nextPage = ' + nextPage);
    // showMessage('Pagina: '+nextPage);
    localStorage.setItem('pagination', nextPage);
  }
}

// Implementa el Intersection Observer
const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  if(debug) console.log('..........');
  // Maneja la paginacion
  paginationHandler();
  // Hace la llamada a loadData de manera asincrona
  loadData(parseInt(localStorage.getItem('pagination'))).then(function() {
    if(debug) console.log('itemsInPage = ' + localStorage.getItem('itemsInPage'));
    // Verifica el EOF
    if(parseInt(localStorage.getItem('itemsInPage')) < itemsPerPage) {
      // Maneja el EOF
      eofHandler();
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

// Ejecuta el Intersection Observer
intersectionObserver.observe($observe);
