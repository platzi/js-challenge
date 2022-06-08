const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const appStoreKey = 'pagination';
const paginationIncrement = 10;

if (!location.pathname.includes('public')) {
  location.href = '/public';
}

const store = {
  save: (data) => {
    localStorage.setItem(appStoreKey, JSON.stringify(data));
  },
  get: () => {
    return JSON.parse(localStorage.getItem(appStoreKey) || 5);
  },
  clear: () => {
    localStorage.removeItem(appStoreKey);
  },
};

const parseRawProduct = (product) => ({
  title: product.title || 'No disponible',
  price: product.price || 'N/D',
  image: product.images[0] || 'https://via.placeholder.com/640x480',
});

const currency = (value) =>
  value.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
  });

const renderList = (products, container) => {
  const fragment = document.createDocumentFragment();
  const items = document.createElement('section');
  items.classList.add('Items');

  products.forEach((product) => {
    const item = document.createElement('article');
    item.classList.add('Card');
    item.innerHTML = `
  <img src="${product.image}" />
  <h2>
    ${product.title}
    <small>${currency(product.price)}</small>
  </h2>
`;

    fragment.appendChild(item);
  });

  items.appendChild(fragment.cloneNode(true));
  container.appendChild(items);
};

const getData = (urlString) =>
  fetch(urlString)
    .then((response) => response.json())
    .then((products) => products.map(parseRawProduct))
    .catch((error) => {
      console.error(error);
      return [];
    });

const loadData = async (offset = 5, limit = paginationIncrement) => {
  const urlSearchParams = new URLSearchParams({
    offset: offset + paginationIncrement,
    limit,
  });

  const products = await getData(API + '?' + urlSearchParams);

  store.save(offset);
  renderList(products, $app);
};

(function clearData() {
  $app.innerHTML = '';
  store.clear();
})();

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    // logic...
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadData(store.get());
      }

      if (store.get() >= 200) {
        intersectionObserver.unobserve($observe);
        alert('Todos los productos obtenidos');
      }
    });
  },
  {
    rootMargin: '0px 0px 0px 0px',
  }
);

intersectionObserver.observe($observe);
