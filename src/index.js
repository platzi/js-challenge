const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=10';
// https://api.escuelajs.co/api/v1/products?offset=0&limit=10
const intersectionObserver = new IntersectionObserver(handleIntersect, {
  rootMargin: '0px 0px 100% 0px',
});
const MAX_DATA = 20
const INCREMENT = 10
const getData = async (offset, limit) => {
  try {
    products = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
    products =  await products.json()
    renderElements(products)
  }
  catch (err) {
    console.log(err);
  }
}

const loadData = async () => {
  let pagination = Number(localStorage.getItem('pagination')) || 0
  let final = pagination + INCREMENT;
  if (pagination + INCREMENT > MAX_DATA)
    final = MAX_DATA
  else
    final = pagination + INCREMENT

  if (final <= MAX_DATA && pagination <= MAX_DATA)
    await getData(pagination
      , final);
  else {
    alert('Todos los productos obtenidos');

  }
  localStorage.setItem('pagination', final + 1)
}

function renderElements(products) {
  let output = products.map(product =>
  // template
  (`<article class="Card">
    <img src="${product.category.image}" />
    <h2>
      ${product.title}
      <small>${product.price}</small>
    </h2>
  </article>`
  ));

  let newItem = document.createElement('section');
  newItem.classList.add('Item');
  newItem.innerHTML = output;
  $app.appendChild(newItem);

}

function handleIntersect(entries, intersectionObserver) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadData()
    }
  })
}
intersectionObserver.observe($observe);

window.onunload = () => {
  localStorage.removeItem('pagination')
  intersectionObserver.unobserve($observe);

}