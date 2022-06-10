const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=5';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      products.map(product => {
        product.price = product.price.toLocaleString('en-EU', { style: 'currency', currency: 'USD' });
        let newItem = document.createElement('div');
        newItem.classList.add('Item');
        newItem.innerHTML = `
        <article class="Card">
        <img src="${product.images[0]}" />
        <h2>
        ${product.title}
        <small>${product.price}</small>
        </h2>
        <p>${product.description}</p>
        </article>`;	
        $app.appendChild(newItem);
      });
    })
    .catch(error => console.log(error));
}


const loadData = async () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.map(entry => {
    if (entry.isIntersecting) {
      console.log(typeof(entry.target));
      getData(API);
      loadData();
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
  threshold: 0.5
});

intersectionObserver.observe($observe);