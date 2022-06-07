const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        console.log(products);
        /*let max = 0;
        console.log(max);
        console.log(product.id, max);*/
        if(product.id > 4){
            max++;
            console.log(max);
            return `<article class="Card" alt="${product.description}"><img src="${product.category.image}"/><h2>${product.title}<small>$ ${product.price}</small></h2></article>`;
          }
        // template
      });/*.filter(function(x){
        return x !== undefined;
      });*/
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
  loadData();
  // logic...
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
