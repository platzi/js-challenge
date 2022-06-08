const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const limit = 10;
const maxLimit = 200;

function clearPagination() {
  localStorage.removeItem('pagination');  
}

function savePagination(pagination) {
  localStorage.setItem('pagination', pagination);  
}

function getPagination() {
  return localStorage.getItem('pagination');
}

function getApiUrlWithOffsetAndLimit() {
  const initialOffset = 5;
  const pagination = getPagination();
  offset = pagination ? parseInt(pagination) + limit : initialOffset;
  savePagination(offset);
  return `${API}?offset=${offset}&limit=${limit}`;
}

function productToHtml(product) {
    return `<article class="Card">
              <img src="${product.images[0]} alt="${product.description}" />
              <h2>
                ${product.title}
                <small>$ ${product.price}</small>
              </h2>
            </article>`;
}

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return productToHtml(product);
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output.join("");
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    getData(getApiUrlWithOffsetAndLimit());
    
    const pagination = getPagination();
    if (pagination && (parseInt(pagination) + limit >= maxLimit)) {
      intersectionObserver.unobserve($observe);
      alert('Todos los productos Obtenidos');
    }
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

clearPagination();
intersectionObserver.observe($observe);