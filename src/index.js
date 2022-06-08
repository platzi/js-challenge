const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 10;

localStorage.setItem("pagination", DEFAULT_OFFSET);

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
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  console.log(`Fetching from ${localStorage.getItem('pagination')}`);
  await getData(`${API}?offset=${localStorage.getItem('pagination')}&limit=${DEFAULT_LIMIT}`);
  if (Number(localStorage.getItem('pagination')) === 190)
  {
    alert("Todos los productos Obtenidos");
    intersectionObserver.unobserve($observe);
  }
}

const intersectionObserver = new IntersectionObserver(async entries => {
  // logic...
  if (entries[0].isIntersecting){
    await loadData();
    const newPagination = Number(localStorage.getItem('pagination')) + DEFAULT_LIMIT;
    localStorage.setItem("pagination", newPagination);
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);


