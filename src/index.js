const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 5;
const PRODUCT_LIMIT = 200;

const getData = async (api, offset, limit) => {
  const url = api + `?limit=${limit}&offset=${offset}`;
  console.log(url)

  return fetch(url)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => productToHtmlCard(product));

      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);

      if (offset >= PRODUCT_LIMIT) {
        let message = document.createElement('p');
        message.classList.add('LimitMessage');
        message.innerHTML = "Todos los productos Obtenidos"
        $app.appendChild(message);

        intersectionObserver.disconnect();
      }
    })
    .catch(error => console.log(error));
}

const productToHtmlCard = (product) => {
  let image = product.images?.length > 0 ? product.images[0] : "";
  return `
    <article class="Card">
      <img alt=${product.description} src="${image}" />
      <h2>
        ${product.title}
        <small>$ ${product.price}</small>
      </h2>
    </article>
  `;
}

const loadData = async () => {
  const pagination = localStorage.getItem('pagination');
  const currentOffset =  pagination ? parseInt(pagination) + DEFAULT_LIMIT : DEFAULT_OFFSET;
  localStorage.setItem('pagination', currentOffset);
  await getData(API, currentOffset, DEFAULT_LIMIT);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.isIntersecting && loadData()
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.addEventListener("beforeunload", (event) => {
  event.preventDefault();
  localStorage.clear();
})
