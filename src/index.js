const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

// Remove offset from localStorage on each load
localStorage.removeItem('offset');

const getData = async (api) => {
  try {
    const response = await fetch(api);
    const products = await response.json();
    const output = products.map((product) => {
      return `<article class='Card'>
              <img src='${product.images[0]}' alt='${product.title}' />
              <h2>
                ${product.title}
                <small>$ ${product.price}</small>
              </h2>
            </article>`;
    });
    const newItem = document.createElement('section');
    newItem.classList.add('Item');
    newItem.innerHTML = output.join('');
    $app.appendChild(newItem);
  } catch (error) {
    console.error(error);
  }
};

const loadData = async () => {
  const limit = 10;
  const initialOffset = 5;
  const offset =
    parseInt(localStorage.getItem('offset')) + limit || initialOffset;

  localStorage.setItem('offset', offset);

  const queryParams = new URLSearchParams({
    offset,
    limit,
  });

  await getData(API + '?' + queryParams);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && loadData()),
  { rootMargin: '0px 0px 100% 0px' }
);

intersectionObserver.observe($observe);
