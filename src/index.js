const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = async api => {
  return fetch(api + "?limit=10")
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        console.log(product.images[0])
        return `<article class="Card">
          <img src="${product.images?.length > 0 ? product.images[0] : undefined}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  loadData()
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
