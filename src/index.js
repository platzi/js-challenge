const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = api => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.map(product => {
        // template
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

const loadData = () => {
  const limit = 10;
  const initialOffset = 5;
  const offset =
    parseInt(localStorage.getItem('offset')) + limit || initialOffset;

  localStorage.setItem('offset', offset);

  const queryParams = new URLSearchParams({
    offset,
    limit,
  });

  getData(API + '?' + queryParams);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && loadData()),
  { rootMargin: '0px 0px 100% 0px' }
);

intersectionObserver.observe($observe);
