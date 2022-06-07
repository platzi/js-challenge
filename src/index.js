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
      // Product with id=201 or more is not valid
      if (product.id > 200) return;
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

  if (offset > 200) {
    alert('Todos los productos fueron obtenidos');
    return { disconect: true };
  }

  localStorage.setItem('offset', offset);

  const queryParams = new URLSearchParams({
    offset,
    limit,
  });

  await getData(API + '?' + queryParams);
  return { disconect: false };
};

const intersectionObserver = new IntersectionObserver(
  (entries, observer) =>
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const { disconect } = await loadData();
        disconect && observer.disconnect();
      }
    }),
  { rootMargin: '0px 0px 100% 0px' }
);

intersectionObserver.observe($observe);
