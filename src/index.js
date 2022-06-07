const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const FIRSTITEM = 5;
const LOADAMOUNT = 10;
const MAXITEMS = 200;


localStorage.setItem("pagination", FIRSTITEM);
console.log(localStorage.getItem("pagination"))


const getData = async (api) => {
  let pagination = localStorage.getItem("pagination");
  let params = `?offset=${pagination}&limit=${LOADAMOUNT}`;
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
  console.log(localStorage.getItem("pagination"));
  let pagination = parseInt(localStorage.getItem("pagination"), 10);
  pagination += LOADAMOUNT;
  if(pagination > MAXITEMS) {
    intersectionObserver.disconnect();
  } else {
    localStorage.setItem("pagination", pagination);
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
