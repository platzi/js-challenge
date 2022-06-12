const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage.clear();

const PAGINTAION_STORAGE = 'pagination';
const initialPagination = 5;

const getData = async (api) => {
  const response = await fetch(api);
  const products = await response.json();

  if (!products.length) {
    intersectionObserver.unobserve($observe);
    const message = document.createElement('p');
    message.innerHTML = 'Todos los productos Obtenidos';
    return $app.appendChild(message);
  }

  const output = products.map(
    (product) => `
      <article class="Card">
        <img src="${product.images[0]}" />
        <h2>
          ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>
    `,
  );

  const newItem = document.createElement('section');
  newItem.classList.add('Items');
  newItem.innerHTML = output.join('');
  $app.appendChild(newItem);
};

const getNewPagination = () => {
  const pagination = localStorage.getItem(PAGINTAION_STORAGE);
  localStorage.setItem(PAGINTAION_STORAGE, pagination ? Number(pagination) + 10 : initialPagination);
  return localStorage.getItem(PAGINTAION_STORAGE);
};

const loadData = async () => {
  const pagination = getNewPagination();
  const objPAarams = { offset: pagination, limit: 10 };
  const strParams = new URLSearchParams(objPAarams).toString();
  const PARAMETERIZED_API = `${API}?${strParams}`;
  await getData(PARAMETERIZED_API);
};

let = false;
const intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  },
  {
    rootMargin: '0px 0px 100% 0px',
    threshold: 1,
  },
);

intersectionObserver.observe($observe);
