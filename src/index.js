const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const limit = 10;
localStorage.clear();
localStorage.setItem('pagination','5');

const message = () => {
  let newItem = document.createElement('message');
  newItem.innerHTML = `<h1>Todos los productos Obtenidos</h1>`;
  $app.appendChild(newItem);

}

const getData = api => {
  const offset = localStorage.getItem('pagination');

  localStorage.setItem('pagination', parseInt(localStorage.getItem('pagination')) + 10 )

  fetch(`${api}?offset=${offset - 1}&limit=${limit}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
        return `
        <article class="Card">
          <img src= ${product.images[0]} />
          <h2>
          ${product.title}
          <small>${product.price}</small>
          </h2>
        </article>
        `
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async() => {
  await getData(API);
}


const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.forEach(entry=>{
    if(entry.isIntersecting) loadData();
    if(localStorage.getItem('pagination') > 205 ){
      intersectionObserver.unobserve($observe);
      message(); 
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

