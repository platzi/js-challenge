const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage.removeItem("pagination");

const getData = api => {
  const count = localStorage.getItem("pagination")
  fetch(api + `?offset=${count}&limit=10`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
        return `<article class="Card">
        <img src="${product.images[0]}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      output.forEach(element => {
        newItem.innerHTML += element 
      });
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  if(entries[0].isIntersecting){
    if(localStorage.getItem("pagination")==null){
      localStorage.setItem("pagination", '5')
    }else{
      localStorage.setItem("pagination", parseInt(localStorage.getItem("pagination")) + 10)
    }
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
}); 

intersectionObserver.observe($observe);
