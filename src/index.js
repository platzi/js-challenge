const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = async (api) => {
  const limit = 10;
  const offset = localStorage.getItem('offset') ? parseInt(localStorage.getItem('offset')) + limit : 5;

  try {
    const response = await fetch(`${api}?offset=${offset}&limit=${limit}`)
    let products = await response.json();
    let output = `<article class="Card"><h2>Todos los productos Obtenidos</h2></article`;
    if (products.length > 0) {
      output = products.map(product => {
        return `<article class="Card">
          <img src="${product.images[0]}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`
    });
    }
    else {
      intersectionObserver.disconnect();
    }
    let newItem = document.createElement('section');
    newItem.classList.add('Item');
    newItem.innerHTML = output;
    $app.appendChild(newItem);

    localStorage.setItem('offset', offset);

  }
  catch (error) {
    console.log(error)
  }
}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  const target = entries[0];
  if (target.isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.addEventListener("beforeunload", function (e) {
  localStorage.removeItem('offset');
}, false);