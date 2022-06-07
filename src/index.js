const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

// BORRAR PAGINATION DEL LOCAL STORAGE SI EXISTE
const localPagination = window.localStorage.getItem("pagination");
if(localPagination){
  window.localStorage.removeItem("pagination");
}

const getData = async (api) => {
  try {
    const response = await fetch(api);
    const jsonResponse = await response.json();
    let products = jsonResponse;
    let output = products.map(product => {
      // template
      return (`<article class="Card"><img src="${product.images[0]}" /><h2>${product.title}<small>$ ${product.price}</small></h2></article>`);
    });

    if(output.length == 0){
      output = "<p>Todos los productos Obtenidos</p>";
      unObserve();
    }
    // console.log("OUTPUT A LA VERGA ", output);
    let newItem = document.createElement('section');
    newItem.classList.add('Item');
    newItem.innerHTML = output;
    $app.appendChild(newItem);
  } catch (error) {
    console.log(error);
  }
}

const loadData = () => {
  // SE ACCEDE A PAGINATION EN EL LOCALSTORAGE
  const pagination = window.localStorage.getItem("pagination");
  let newPagination;
  let newOffset;

  // SI NO EXISTE PAGINATION EN LOCALSTORAGE SE LE ASIGNA EL VALOR 1
  // DE LO CONTRARIO SE LE SUMA UNA UNIDAD
  if(!pagination){
    newPagination = 1;
  } else {
    newPagination = parseInt(pagination) + 1
  }

  // SE ACTUALIZA PAGINATION EN EL LOCAL STORAGE
  window.localStorage.setItem("pagination", `${newPagination}`);

  // NEW OFFSET ES (5 * (PAGINATION + (PAGINATION - 1))) - 1
  // EJEMPLO: PARA OBTENER LOS RESULTADOS DE LA PAGINACIÓN NÚMERO 1 
  // DEBEMOS ACCEDER A LOS ELEMENTOS CON OFFSET 4, RESULTADOS DEL 5 AL 14
  // ENTONCES (5 * (1 + (1 - 1))) - 1 = 4
  // EJEMPLO: PARA OBTENER LOS RESULTADOS DE LA PAGINACIÓN NÚMERO 2 
  // DEBEMOS ACCEDER A LOS ELEMENTOS CON OFFSET 14, RESULTADOS DEL 15 AL 24
  // ENTONCES (5 * (2 + (2 - 1))) - 1 = 14
  newOffset = (5 * (newPagination + (newPagination - 1))) - 1;

  getData(`${API}?offset=${newOffset}&limit=10`);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  const first = entries[0];
  if(first.isIntersecting){
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

const unObserve = () => {
  intersectionObserver.unobserve($observe);
}
