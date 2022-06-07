const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
// Challenge 3.3 - Load first 10 when reload or close tab
var page  = 1;
// Challenge 1.2: Start from product 5
const offset = 5;
// Challenge 3.1 - Show first 10
const limit = 10;
const API = 'https://api.escuelajs.co/api/v1/products';
var more_results = true;
var paginatorStorage = window.localStorage;

// Challenge 1.3: Save pagination
const set_page = (this_page) => {
  paginatorStorage.setItem('pagination', this_page);
}
set_page(page);

const get_page = () => {
  return parseInt(paginatorStorage.getItem('pagination'));
}

// Challenge 1.3: Save pagination
var current_api = (API) => {
  let pagination = get_page();
  let current_page = pagination * offset;
  let next_page =  pagination + 1;
  let query = "?offset="+current_page+"&limit="+limit;
  set_page(next_page);
  return API+query;
}

const product_html = (product) => {
  return `<article class="Card"> \
        <img src="${product.images[0]}" /> \
        <h2> \
          ${product.title} \
          <small>$ ${product.price} </small> \
        </h2> \
      </article>`;
}

// Challenge 3.3: Async/Await
const getData = async api => {
  await fetch(api)
    .then(response => response.json())
    .then(response => {
      // Challenge 4.1 - Show message when no more results
      if(response.length == 0){
        $observe.innerHTML += "<h3 class=no-more>Todos los productos Obtenidos</h3>";
        more_results = false;
        return false;
      }
      let products = response;
      let output = products.map(product => {
        template = product_html(product);
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = template;
      $app.appendChild(newItem);
      });
      
    })
    .catch(error => console.log(error));
}
getData(current_api(API));

const intersectionObserver = new IntersectionObserver(entries => {
  // Challenge 4.1 - avoid to call multiple times when all is loaded
  if(more_results === true){
    getData(current_api(API));
  }else{
    // Challenge 4.2 - unobserve element
    intersectionObserver.unobserve($observe);
  }
}, {
  rootMargin: '0px 0px 100% 0px',
  threshold: 0.25
});

intersectionObserver.observe($observe);

// Challenge 3.2 - Load first 10 when reload or close tab
window.onbeforeunload = function () {
  paginatorStorage.removeItem('pagination');
 }