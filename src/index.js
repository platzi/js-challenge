const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=10';
// https://api.escuelajs.co/api/v1/products?offset=0&limit=10
const intersectionObserver = new IntersectionObserver(handleIntersect, {
  rootMargin: '0px 0px 100% 0px',
});
const MAX_DATA = 200
const INCREMENT = 10
intersectionObserver.observe($observe);

const getData = async (offset, limit) => {
  try {
    products = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
    products = await products.json()
    renderElements(products)
  }
  catch (err) {
    console.log(err);
  }
}

const loadData = async () => {

  let offset = Number(localStorage.getItem('pagination'))
  let limit = INCREMENT;

  if (!offset) {
    offset = 5;
    localStorage.setItem('pagination', offset)
  }
  else {
    if (offset + limit > MAX_DATA) {
      limit = MAX_DATA - offset;
      offset = MAX_DATA
    }
    else
      offset = offset + limit + 1
    localStorage.setItem('pagination', offset)
  }




  if (offset < MAX_DATA)
    await getData(offset
      , limit);
  else {
    alert('Todos los productos obtenidos');

  }

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
  newItem.classList.add('Items');
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

window.onunload = () => {
  localStorage.removeItem('pagination')
  intersectionObserver.unobserve($observe);

}