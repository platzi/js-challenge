const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return `
        <article class="Card">
          <img src="${product.images[0]}" alt="${product.title}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>
        `;
      });

      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async (offset) => {

  localStorage.setItem('pagination', offset);

  if(offset > 200){
    alert("Todos los productos Obtenidos");
    intersectionObserver.disconnect();
  }

  getData(`${API}?offset=${offset}&limit=10`);  

}

const intersectionObserver = new IntersectionObserver(entries => {
  const pagina = localStorage.getItem('pagination');
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      await loadData(parseInt(pagina));
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px'
});

window.onload = async function() {
  intersectionObserver.observe($observe);
  localStorage.setItem('pagination', '5');
}

window.onbeforeunload = function () {
  localStorage.clear();
  localStorage.setItem('pagination', '5');
}
