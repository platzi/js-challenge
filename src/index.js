const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const LIMIT = 10;
const FIRST_ITEM = 5;
const MAX_RESULT = 200;

localStorage.clear();
localStorage.setItem("pagination", FIRST_ITEM);

const getData = async api => {
  try{
    let response = await fetch(api);
    let products = await response.json();
  
    let output = products.map(product => {
        return `
        <article class="Card">
        <img src="${product.images}"/>
        <h2>
          Producto
          <small>$ Precio ${product.price}</small>
        </h2>
        </article>`
    });
    let newItem = document.createElement('section');
    newItem.classList.add('Item');
    newItem.innerHTML = output;
    $app.appendChild(newItem);
  }catch(e){
    console.log(e);
  }
}

const loadData = async () => {
  let offset = parseInt(localStorage.getItem("pagination"));
  if(offset <= MAX_RESULT){
    localStorage.setItem("pagination", offset + LIMIT);
    await getData(API + '?offset=' + offset + '&limit=' + LIMIT);
  }else{
      let newItem = document.createElement('section');
      newItem.innerHTML = `<p>Todos los productos Obtenidos</p>`;
      $app.appendChild(newItem);
      intersectionObserver.unobserve($observe);
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      loadData();
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
