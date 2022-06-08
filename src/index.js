const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const storage = window.localStorage;
const pagination = { offset: 185, limit: 10, lastPage: false };
storage.setItem("pagination", JSON.stringify(pagination))

const getData = async api => {
  const response =  await fetch(api)
  const products = await response.json()
  let output = products.map(product => (
  `
  <article class="Card">
    <img src="${product.images[0]}" alt="${product.title}" />
    <h2>
      ${product.title}
      <small>$ ${product.price}</small>
    </h2>
  </article>
  `
  ));
  let newItem = document.createElement('section');
  newItem.classList.add('Item');
  newItem.innerHTML = output.join(" ");
  $app.appendChild(newItem);
  if(products.length < pagination.limit) {
    intersectionObserver.unobserve($observe)
    let el = document.createElement('h3');
    el.innerText = `Todos los productos Obtenidos`;
    el.style = "text-align: center; margin: 40px 0; font-size: 1rem; text-transform: uppercase;";
    $app.appendChild(el);
  }
}

const loadData = async () => {
  const paging = JSON.parse(storage.getItem("pagination"));
  await getData(`${API}?offset=${paging.offset}&limit=${paging.limit}`);
  storage.setItem("pagination", JSON.stringify({...pagination, offset: pagination.offset += 10}));
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) loadData()
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  localStorage.clear();
});


