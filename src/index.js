const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const limit = 10;

window.addEventListener("beforeunload", () => {
  localStorage.removeItem('pagination');
});

const getData = (api, offset, limit) => {
  const endpoint = `${api}?offset=${offset}&limit=${limit}`;
  fetch(endpoint)
    .then(response => response.json())
    .then(response => {
      let products = response;
      if (products.length > 0) {
        let output = products.map(product => {
          return `<article class="Card">
                    <img src="${product.images[0]}" alt="${product.title}" />
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
      } else {
        let message = document.createElement('p');
        message.innerText = 'Todos los productos Obtenidos';
        $app.appendChild(message);
        intersectionObserver.unobserve($observe);
      }
     
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  const offset = localStorage.getItem('pagination')
    ? parseInt(localStorage.getItem('pagination')) + limit
    : 4;
  getData(API, offset, limit);
  localStorage.setItem('pagination', offset);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) loadData();
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
