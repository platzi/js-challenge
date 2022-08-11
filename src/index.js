const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const itemsPerPage = 10;
const initialItem = 5;
const debug = true;
const productTemplateType='0'; // '0' = prod, '1' = test/debug

// Carga los datos de la API para la pagina corriente
const getData = (api, initialId, resolve) => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      if(debug) console.log('getData initialId = ' + initialId);
      let endingId = null;
      let itemsCounterForFilter = 0;
      let itemsInPage = 0;
      let output = products
        .filter(product => (product.id >= initialId && product.id != null && ++itemsCounterForFilter <= itemsPerPage))
        .map(function (product) {
          itemsInPage++;
          endingId = product.id;
          // Returns the product in a template
          return productCardTemplate(productTemplateType, product);
      });
      localStorage.setItem('itemsInPage', itemsInPage);
      localStorage.setItem('nextPagination', endingId + 1);
      if(debug) console.log('getData itemsCounterForFilter = ' + itemsCounterForFilter + ', itemsInPage = ' + itemsInPage + ', endingId = ' + endingId + ', pagination = ' + localStorage.getItem('pagination'));
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output.join('');
      $app.appendChild(newItem);
      resolve("All Set");
    })
    .catch(error => console.log(error));
}

// Carga los datos para la pagina corriente
async function loadData(currentPagination) {
  let promise = new Promise((resolve, reject) => {
    getData(API, currentPagination, resolve);
  });
  let result = await promise; // wait until the promise resolves (*)
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
    case '0':
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
    localStorage.setItem('pagination', initialItem);
    if(debug) console.log('paginationHandler - initial pagination = ' + localStorage.getItem('pagination'));
  } else {
    if(debug) console.log('paginationHandler - pagination = ' + localStorage.getItem('pagination'));
    if(debug) console.log('paginationHandler - nextPagination = ' + localStorage.getItem('nextPagination'));
    localStorage.setItem('pagination', localStorage.getItem('nextPagination'));
  }
}

// Implementa el Intersection Observer
const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  if (entries[0].intersectionRatio <= 0) return;
  if(debug) console.log('..........');
  // Maneja la paginacion
  paginationHandler();
  // Hace la llamada a loadData de manera asincrona
  loadData(parseInt(localStorage.getItem('pagination'))).then(function() {
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
