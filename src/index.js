const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const INIT_INDEX = 4;
const LIMIT = 10;

const getPagination = () => {
  const pagination = parseInt(localStorage.getItem("pagination"));
  return Number.isInteger(pagination) ? pagination : INIT_INDEX;
};

const getData = (api, limit, offset) => {
  fetch(`${api}?limit=${limit}&offset=${offset}`)
    .then(response => response.json())
    .then(response => {
      localStorage.setItem('pagination', getPagination()+LIMIT);
      let products = response;
      let output = products.map(product => {
        // template
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = (limit, offset) => {
  getData(API, limit, offset);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.map(entrie => {
    if (entrie.isIntersecting) {
      localStorage.setItem('pagination', getPagination());
      loadData(LIMIT, getPagination());
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
