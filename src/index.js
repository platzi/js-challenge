const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const LIMIT = 10;

window.addEventListener('beforeunload', function () {
  localStorage.clear();
});

const getData = async (api) => {
  try {
    const offset = JSON.parse(localStorage.getItem('pagination')) || 5;
    const response = await fetch(`${api}?offset=${offset}&limit=${LIMIT}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const createTemplate = (product) => {
  const $article = document.createElement('article');
  const $h2 = document.createElement('h2');
  const $img = document.createElement('img');
  const $small = document.createElement('small');

  $img.src = product.images[0];
  $img.alt = product.description;
  $small.textContent = `$  ${product.price}`;

  $h2.textContent = `${product.title} `;
  $h2.appendChild($small);
  $article.classList.add('Card');
  $article.appendChild($img);
  $article.appendChild($h2);

  return $article;
};

const createItem = (output) => {
  let newItem = document.createElement('section');
  newItem.classList.add('Items');

  for (const item of output) {
    newItem.appendChild(item);
  }

  $app.appendChild(newItem);
};

const loadData = async () => {
  try {
    const data = await getData(API);
    const output = data.map((product) => createTemplate(product));

    createItem(output);

    // const offset = JSON.parse(localStorage.getItem('pagination')) || 5;
    // localStorage.setItem('pagination', offset + LIMIT);
  } catch (error) {
    console.error(error);
  }
};

const launchNotification = () => {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    new Notification('Todos los productos Obtenidos');
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        new Notification('Todos los productos Obtenidos');
      }
    });
  }
  intersectionObserver.disconnect();
};

const callback = async ([entrie]) => {
  if (entrie.isIntersecting) {
    let pagination = JSON.parse(localStorage.getItem('pagination'));
    if (!pagination) {
      pagination = 5;
      localStorage.setItem('pagination', pagination);
    } else {
      localStorage.setItem('pagination', pagination + LIMIT);
    }

    pagination < 194 ? await loadData() : launchNotification();
  }
};

const intersectionObserver = new IntersectionObserver(callback, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
