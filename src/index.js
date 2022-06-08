const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let miStorage = window.localStorage;

const getData = async(api) => {
  let pagination = miStorage.getItem('pagination')  
  api = api + '?offset='+ eval(5+10*pagination) +'&limit=10' 
  await fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      if (products.length != 0) {
        let output = products.map(product => {
          // template
          return `<article class="Card">
            <img src="${product['images'][0]}" />
            <h2>
              ${product['title']}
              <small>$ ${product['price']}</small>
            </h2>
          </article>`
        });
        let newItem = document.createElement('section');
        newItem.classList.add('Item');
        newItem.innerHTML = output;
        $app.appendChild(newItem);
      } else {
        let newItem = document.createElement("div");
        newItem.innerHTML = "Todos los productos Obtenidos";
        $app.appendChild(newItem);
        $observe.remove();
      }
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting) {
    let pagination = miStorage.getItem('pagination');
    miStorage.setItem('pagination',parseInt(pagination)+1);
    loadData();
  }  
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.addEventListener('load', function() {
  miStorage.setItem('pagination', -1);
});

window.close = () => {
  Storage.clear();
};
