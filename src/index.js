const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

let number_of_products = 10
let max_products = 200;
let page = 0;
localStorage.removeItem('pagination');
localStorage.setItem('pagination', 5);

const getData = api => {
  let initial_position = localStorage.getItem("pagination");
  
  if (initial_position >= max_products) {
    initial_position = 0;
  } 
  url=`${api}?offset=${initial_position}&limit=${number_of_products}`;
  fetch(url)
    .then(response => response.json())
    .then(response => {
        let products = response;
        let output = products.map(product => {
          return buildCard(product);
        });
        let newItem = document.createElement('section');
        newItem.classList.add('Items');
        newItem.innerHTML = output;
        $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const buildCard = (product) => {
  return `<article class="Card">
      <img src="${product.images[0]}" alt="${product.title}"/>
      <h2>
        ${product.title}
        <small>$ ${product.price}</small>
      </h2>
      <p>
        ${product.description}
      </p>
    </article>`;
};

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {

  console.log("entries",entries);
  if (entries[0].isIntersecting) {
    loadData();
    page++;
    if (page > 1){
        let initial_position = Number(localStorage.getItem("pagination")) + Number(number_of_products);
        localStorage.setItem("pagination", initial_position);
    }
  };
  
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
