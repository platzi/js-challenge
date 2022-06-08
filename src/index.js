const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const initOffset = 5;
const productLength = 10;
localStorage.setItem("pagination", initOffset);

const getData = api => {
  const actualOffset = parseInt(localStorage.getItem("pagination"));
  fetch(`${api}?offset=${actualOffset}&limit=${productLength}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
        return `${product.id}<img src=${product.images[0]}>}`
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      localStorage.setItem("pagination", actualOffset + productLength);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(
  entries =>
    // logic...
    entries.forEach(entry => {
      if (entry.isIntersecting) loadData();
    })
  , {
    rootMargin: '0px 0px 100% 0px',
  });

intersectionObserver.observe($observe);
