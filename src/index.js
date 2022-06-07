const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const DEFAULT_LIMIT = 5;
const DEFAULT_OFFSET = 10;

const getData = async api => {
  const pagination = localStorage.getItem('pagination');
  const currentOffset =  pagination ? parseInt(pagination) + DEFAULT_OFFSET : DEFAULT_LIMIT;
  localStorage.setItem('pagination', currentOffset);

  return fetch(api + `?limit=${DEFAULT_LIMIT}&offset=${currentOffset}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return `<article class="Card">
          <img src="${product.images?.length > 0 ? product.images[0] : undefined}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.isIntersecting && loadData()
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
