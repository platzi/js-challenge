const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products?offset=6&limit=10';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        product.price = product.price.toLocaleString('en-EU', { style: 'currency', currency: 'USD' });
        return `
        <article class="Card">
        <img src="${product.category.image}" />
        <h2>
          ${product.title}
          <small>${product.price}</small>
        </h2>
        <p>${product.description}</p>
      </article>
        `;	
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}


const loadData = async () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.push(entries[0]);
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);