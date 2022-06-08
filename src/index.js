const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const $templateCard = document.getElementById('template-article').content;
const API = 'https://api.escuelajs.co/api/v1/products';

// Activador del callback del Observer
let booleanObserver = false;
let countPages = 1;
let lengthResponse = 200;

const getData = async api => {
  try {
    // Este bloque revisara si ha cambiado cuantos productos existen en la API
    let res = await fetch('https://api.escuelajs.co/api/v1/products');
    res = await res.json()
    lengthResponse = res.length === lengthResponse ? lengthResponse : res.length;

    // Respuesta normal
    let response = await fetch(api);
    let products = await response.json();
    let output = document.createDocumentFragment();
    products.forEach(product => {
      $templateCard.querySelector('img').src = product.category.image;
      $templateCard.querySelector('h2').innerHTML = `
          ${product.title}
          <small>$ ${product.price}</small>
        `;
      let clone = document.importNode($templateCard, true);
      output.appendChild(clone);
    });
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.dataset.id = countPages;
    newItem.appendChild(output);
    $app.appendChild(newItem);

    // Ahora que esta renderizada la primera section, podemos activar la callback del observer.
    booleanObserver = true;
    
    // Verificando si la proxima pagina no excede los 200 productos
    if ((countPages + 1) > +localStorage.getItem('limite')) {
      intersectionObserver.disconnect();
      $observe.textContent = 'Todos los productos Obtenidos'
    } else {
      countPages++;
    }
  } catch (error) {
    console.error(error)
  }
}

const loadData = (idInitProduct = +localStorage.getItem('pagination'), quantyProducts = localStorage.getItem('quanty')) => {
  // La función por defecto tomara los valores en el local storage, cuando sea invocada por primera vez el local storage esta vacio y debe pasarsele el paginado inicial. Es decir, solo se ejecuta la primeza vez.
  if (!localStorage.length) {
    localStorage.setItem('pagination', `${idInitProduct}`);
    localStorage.setItem('InitPagination', `${idInitProduct}`);
    localStorage.setItem('quanty', `${quantyProducts}`);
    localStorage.setItem('limite', `${(+idInitProduct ? lengthResponse - +idInitProduct : lengthResponse) / quantyProducts}`);
  } else {
    // Actualización de la posición
    localStorage.setItem('pagination', `${+idInitProduct + +quantyProducts}`);
    idInitProduct = +localStorage.getItem('pagination');
  }

  let initPagination = localStorage.getItem('InitPagination');

  const url = `${API}?offset=${+idInitProduct ? +idInitProduct - 1 : 0}&limit=${quantyProducts}`;
  getData(url);

  // Actualización del limite si hubo un cambio en la cantidad de productos de la API
  localStorage.setItem('limite', `${Math.ceil((+initPagination ? lengthResponse - +initPagination : lengthResponse) / quantyProducts)}`);
}

const intersectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!booleanObserver) return;
  if (entry.isIntersecting && booleanObserver) loadData()
}), { threshold: 1 });

intersectionObserver.observe($observe);

document.addEventListener('DOMContentLoaded', e => {
  loadData(5, 10);
});

window.addEventListener('beforeunload', e => localStorage.clear())
