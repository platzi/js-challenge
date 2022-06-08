const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getOffset = () => {
  let offset = parseInt(localStorage.getItem('pagination')) + 10 || 5;
  localStorage.setItem('pagination', offset);
  return offset;
}

const getData = api => {
  // Pasamos los parametros para obtener de 5 a 10 items.
  return fetch(`${api}?` + new URLSearchParams({offset: getOffset(), limit: 10}))
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return `
          <article class="Card">
            <img src="${product.images.shift()}" />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
        `;
      });
      let container = document.createElement('section');
      container.classList.add('Items');
      // Uso de join para eliminar coma molesta
      container.innerHTML = output.join(' ');
      $app.appendChild(container);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  // Función actualizada async/await se devuelve una promesa que se espera resolver.
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Verificamos el offset para seguir haciendo peticiones o no.
      loadData();
      if (parseInt(localStorage.getItem('pagination')) >= 200) {
        $app.innerHTML += `<hr><h4>Todos los productos Obtenidos</h4>`;
        intersectionObserver.unobserve($observe);
      }
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

// Elimina el storage en cada load de la pagina.
localStorage.removeItem('pagination')