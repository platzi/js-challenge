const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const initialPosition = window.localStorage;

const getPosition = () =>{
  let position = parseInt(initialPosition.getItem('value'), 10);
  return position;
}

const setPosition = () =>{
  initialPosition.setItem('value', getPosition()+10);
}

const getData = async (api) => {
  
  await fetch(api)
  .then(response => response.json())
  .then(response => {
    let products = response;
    console.log(products);
    if(products.length === 0){console.log("no tengo nada"); return false};
    let output = products.map(({id, title, price, images}) =>{
      let template =`
        <article class="Card">
          <img src=${images[0]}>
          <h2>${title}
            <small>${price}</small>
          </h2>
        </article>
      `
      return template;
    })
    let newItem = document.createElement('section');
    newItem.classList.add('Item');
    let articles = output.join(" ");
    newItem.innerHTML = articles;
    $app.appendChild(newItem);
  }).catch(error => console.log(error));
    
}

const loadData = async () => {

  console.log(getPosition());
  getData(API+`?offset=${getPosition()}&limit=10`);
  setPosition();
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      loadData();
      console.log(getPosition());
    }
    if(getPosition()>200){
      $observe.append((document.createElement('h2')).innerHTML = 'Todos los productos Obtenidos');
      intersectionObserver.disconnect();
    } 
  })
},{
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.addEventListener('beforeunload', ()=>{
  initialPosition.clear();
});
window.onload = initialPosition.setItem('value', 4);