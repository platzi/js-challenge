const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products?limit=10';

const getData = async (api, offset) => {
  api += `&offset=${offset}`;
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

const loadData = async () => {
  let page = getPage();
  let data = await getData(API, page);
  let items = $app.getElementsByClassName('Items')[0];
  data.forEach(item => items.appendChild(item));
  setPage(page + 10);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  let entry = entries[0];
  if (!entry.isIntersecting) return;
  loadData();
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

(() => {
  window.localStorage.clear();
})();
