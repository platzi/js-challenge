const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const DEFAULT_OFFSET = 4;
const DEFAULT_LIMIT = 10;

localStorage.setItem('offset', DEFAULT_OFFSET);

const getData = async (api) => {
  try {
    const response = await fetch(api)
    if(response.status !== 200) {
      throw new Error(response.message)
    }
    return response.json()
  } catch(err) {
    throw new Error(err)
  }
}

const loadData = async (offset = 4, limit = DEFAULT_LIMIT) => {
  localStorage.setItem("offset", `${offset+limit}`);
  
  try {
    let products = await getData(`${API}?offset=${offset}&limit=${limit}`)

    let output = ``;
    
    products.forEach(product => {
      output += `
        <article id="product-${product.id}" class="Card">
          <img src="${product.images[0]}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>
      `;
    });
  
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output;
    $app.appendChild(newItem);

    if(products.length < DEFAULT_LIMIT) {
      let span = document.createElement('span')
      span.classList.add('Message')
      span.innerHTML = "Todos los productos Obtenidos"
      $app.appendChild(span)
      intersectionObserver.disconnect()
    }

  } catch(error) {
    console.error(error)
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting) {
    let offset = parseInt(localStorage.getItem("offset"))||DEFAULT_OFFSET
    loadData(offset);
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
