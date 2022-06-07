const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const FIRSTITEM = 185;
const LOADAMOUNT = 10;
const MAXITEMS = 200;
localStorage.setItem("Pagination", FIRSTITEM-1);

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}
const getDataPagination = (api, limit) => {
  let pagination = localStorage.getItem("Pagination");
  let params = `?offset=${pagination}&limit=${limit}`;
  fetch(api+params)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        if (product.id <=200) {
            return(`
            <article class="Card">
              <img src="${product.images[0]}" />
              <h2>
                ${product.title}
                <small>$ ${product.price}</small>
              </h2>
            </article>`)
        } else{
          return("Todos los productos Obtenidos")
        }
        });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
};

const loadData = () => {
  getDataPagination(API, LOADAMOUNT);
  pagination = parseInt(localStorage.getItem("Pagination"), 10);
  console.log(localStorage.getItem("Pagination"));
  if(pagination + LOADAMOUNT <= MAXITEMS) {
    localStorage.setItem("Pagination", pagination + LOADAMOUNT);
  } else{
    intersectionObserver.unobserve($observe);
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    console.log(entry)
    if (entry.isIntersecting) {
      loadData();
    }
  })

}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
