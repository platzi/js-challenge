const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const $templateCard = document.getElementById('template-article').content;
const API = 'https://api.escuelajs.co/api/v1/products';

let booleanObserver = false;

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
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
      newItem.classList.add('Item');
      newItem.appendChild(output);
      $app.appendChild(newItem);

      // Ahora que esta renderizada la primera section, podemos activar la callback del observer.
      booleanObserver = true;
    })
    .catch(error => console.log(error));
}

const loadData = (idInitProduct = localStorage.getItem('position'), quantyProducts = localStorage.getItem('quanty')) => {
  const url = `${API}?offset=${idInitProduct - 1}&limit=${quantyProducts}`;
  getData(url);

  // La función por defecto tomara los valores en el local storage, cuando sea invocada por primera vez el local storage esta vacio y debe pasarsele el paginado inicial. Es decir, solo se ejecuta la primeza vez.
  console.log(localStorage.length)
  if (!localStorage.length) {
    localStorage.setItem('position', `${idInitProduct}`);
    localStorage.setItem('quanty', `${quantyProducts}`);

  }

  // Actualización de la posición
  localStorage.setItem('position', `${+idInitProduct + +quantyProducts}`);
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