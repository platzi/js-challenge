const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const INITIAL_OFFSET = -5;
const DEFAULT_LIMIT = 10;

localStorage.removeItem('pagination');
localStorage.setItem('pagination', INITIAL_OFFSET);

const getData = async api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
        return `<article class="Card">
            <img src="${product.images[0]}" />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>`;
      });
      output = output.join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(`${API}?offset=${localStorage.getItem('pagination')}&limit=${DEFAULT_LIMIT}`);
  if (Number(localStorage.getItem('pagination')) === 190)
  {
    intersectionObserver.unobserve($observe);
    console.log("Todos los productos Obtenidos");
  }
}

const intersectionObserver = new IntersectionObserver(async entries => {
  if (entries[0].isIntersecting){
    const currentPagination = Number(localStorage.getItem('pagination'));
    localStorage.setItem('pagination', currentPagination + DEFAULT_LIMIT);
    await loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);


