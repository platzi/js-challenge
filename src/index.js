const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const limit = 10;
var offset = 5;
const MAX_ELEMENTS = 200 + offset;

localStorage.setItem("pagination", offset);

const getData = async api => {

  try {

    const response = await fetch(`${api}?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    const output = data.map(product => {
          return createProduct(product)
        }).join('');
      
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);

      localStorage.setItem("pagination", offset);

  } catch(error) {
    console.log(error);
  }

}

window.addEventListener('beforeunload', function (e) {
  localStorage.removeItem("pagination")
});

const loadData = async () => {
  await getData(API);
}

const createProduct = (product) => {
  return `
  <article class="Card">
    <img src='${product.images[0]}' alt='${product.title}'/>
    <h2>
      ${product.title}
      <small>$ ${product.price}</small>
    </h2>
  </article>
  `
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {

    if(offset >= MAX_ELEMENTS) {
      alert("Todos los productos Obtenidos")

      intersectionObserver.unobserve($observe);
    } else {
      if (!entry.isIntersecting) {
        return;
      }
      offset += limit
      loadData()
    }
    
  });
});

intersectionObserver.observe($observe);