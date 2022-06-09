const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const dOffset = 4;
const dLimit = 10;
localStorage.setItem('offset', dOffset);

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => 
        `<article class='Card'>
          <img src='${product.images[0]}' />
          <h2>              
          ${product.title}
          <small>$${product.price}</small>
          </h2>
          </article>`
      );
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      if(products.length < dLimit){
        let span = document.createElement('span');
        span.classList.add('message');
        span.innerHTML = 'Todos los productos obtenidos';
        $app.appendChild(span);
        intersectionObserver.disconnect()
      }
    })
    .catch(error => console.log(error));
}

const loadData = async (offset = 4, limit = dLimit) => {
  localStorage.setItem('offset', `${offset+limit}`)
  await getData(`${API}?offset=${offset}&limit=${limit}`);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      let offset = parseInt(localStorage.getItem('offset'))||dOffset
      loadData(offset);
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
