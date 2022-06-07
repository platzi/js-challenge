const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const TOTAL_PRODUCTS = 200;

const getData = async (api, offset, limit) => {
  api += `?offset=${offset}&limit=${limit}`;
  try {
    const response = await fetch(api);
    const responseJson = await response.json();
    let products = responseJson;
    let output = products.map(product => {
      // template
      let newItem = document.createElement('article');
      newItem.classList.add('Card');
      newItem.innerHTML = `
          <img src="${product.images[0]}" />
            <h2>
            ${product.title}
              <small>$ ${product.price}</small>
            </h2>
        `;
      return newItem;
    });
    return output;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const getPage = () => {
  let page = window.localStorage.getItem('pagination');
  return page ? parseInt(page): 4;
}

const setPage = page => window.localStorage.setItem('pagination', page);

const loadData = async (page, limit) => {
  let data = await getData(API, page, limit);
  let items = $app.getElementsByClassName('Items')[0];
  data.forEach(item => items.appendChild(item));
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  let entry = entries[0];
  if (!entry.isIntersecting) return;

  let page = getPage();

  if (page + 10 > TOTAL_PRODUCTS) {
    loadData(page, TOTAL_PRODUCTS - page);

    let message = document.createElement('h2');
    message.style.textAlign = 'center';
    message.innerHTML = 'Todos los productos Obtenidos';
    $app.appendChild(message);

    intersectionObserver.unobserve($observe);
    return;
  }
  
  loadData(page, 10);
  setPage(page + 10);
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

(() => {
  window.localStorage.clear();
})();
