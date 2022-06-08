const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
//https://api.escuelajs.co/api/v1/products?limit=11&offset=4
let start = 5
let limit = 15
let itemsSeen = false;

const getData = (api, start, limit) => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.slice(start, limit).map((product) => {
        return `<article class='Card'>
          <img src='${product["category"]["image"]}' />
          <h2>
          ${product["title"]}
          <small>$${product["price"]}-${product["id"]}</small>
          </h2>
          </article>`;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = (start, limit) => {
  getData(API, start, limit);
  if(start>200){
    if(!itemsSeen){
      let newText = '<article class=message><h1>Todos los elementos han sido mostrados!</h1></article>'
      let lastText = document.createElement('section');
      lastText.innerHTML = newText;
      lastText.setAttribute('class', 'Card');
      $app.appendChild(lastText);
      itemsSeen = true;
    }
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      loadData(start, limit)
      if(start<200){
        start += 10
        limit += 10
      }
      console.log(start)
    }
    
  })

}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
if(start > 200){
  intersectionObserver.unobserve($observe)
  
}


