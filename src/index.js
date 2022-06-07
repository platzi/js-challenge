const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage.setItem("pagination", '5');

let first_time = true;

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
        return `
          <article class="Card">
            <img src="${product.images[0]}" />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
        `
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output.join(" ");
      $app.appendChild(newItem);

      if (products.length < 10) {
        intersectionObserver.disconnect();
      }
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  const LIMIT = 10;

  if (!first_time) localStorage.setItem("pagination", parseInt(localStorage.getItem("pagination")) + LIMIT);

  let offset = localStorage.getItem("pagination");

  getData(API + `?offset=${offset}` + `&limit=${LIMIT}`); 

  first_time = false;
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  });
}, {
  rootMargin: '0px 0px 90% 0px',
});

intersectionObserver.observe($observe);
