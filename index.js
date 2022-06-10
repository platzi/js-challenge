const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
let offset= 0;
let limit= 10;
const API = 'https://api.escuelajs.co/api/v1/products';


const getData = API => {
  fetch(API+`?offset=${offset}&limit=${limit}`)
  .then(response => response.json())
  .then(response => {
    localStorage.setItem('pagination', limit);
    console.log(response.length);
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
console.log(offset)
offset += 10;


const loadData = async () => {
  getData(API);
}

const options = {
  root: null,
  threshold: 0,
  rootMargin: '0px 0px 100% 0px'
}



const Observer = new IntersectionObserver(entries => {
  entries.map(entry => {
    console.log(entry.target);
    if (entry.isIntersecting) {
      console.log(typeof(entry.target));
      getData(API);
      loadData();
    }
  });
}, 
options);

Observer.observe($observe);