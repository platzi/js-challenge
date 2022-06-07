const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        console.log(product);
        return `<h2>${product.title}</h2>`;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  const pagination = getPagination();
  getData(`${API}/?offset=${pagination - 1}&limit=10`);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  });
}, {
  threshold: 1
});

const getPagination = () => {
  let pagination;
  if (!localStorage.getItem('pagination')) {
    pagination = 5;
    localStorage.setItem('pagination', pagination);
  } else {
    pagination = parseInt(localStorage.getItem('pagination'));
    pagination = pagination + 10;
    localStorage.setItem('pagination', pagination);
  }
  return pagination;
}

intersectionObserver.observe($observe);
