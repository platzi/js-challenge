const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const FIRSTITEM = 5;
const LOADAMOUNT = 10;
const MAXITEMS = 200;

var pagination = FIRSTITEM-1;
const getData = async (api) => {
  let params = `?offset=${pagination.toString()}&limit=${LOADAMOUNT}`;
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
          alert("Todos los productos Obtenidos")
        }
        });
      
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
};

const loadData = async () => {
  await getData(API);
  pagination += LOADAMOUNT;
  if(pagination > MAXITEMS) {
    intersectionObserver.disconnect();
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  })

}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
