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
          <div class="Card">
            <div class="card-body">
              <h2 class="card-title">${product.title}</h2>
              <img src="${product.category.image}" alt="${product.title}" class="card-img-top">
              <p class="card-text">${product.description}</p>
              <p class="card-text">${product.price}</p>
            </div>
          </div>
        `;	
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}


const loadData = () => {
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