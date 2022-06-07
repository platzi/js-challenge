const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage.clear()
localStorage.setItem('pagination','5');
localStorage.setItem('pagination1','5');

const getData = async api => {
  let idx = parseInt(localStorage.getItem('pagination1'));
  let query = `?offset=${idx-1}&limit=10`
  fetch(api+query)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => 
        `
          <article class="Card">
            <img src="${product.images[0]}" alt="${product.title}"/>
            <h2>
              ${product.title}
              <small> $ ${product.price}</small>
            </h2>
          </article>
        `
      );
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output; 
      $app.appendChild(newItem);
      if(products.length < 10) {
        let message = document.createElement('p');
        message.innerHTML = 'Todos los productos Obtenidos';
        $app.appendChild(message);
        intersectionObserver.unobserve($observe);
      }
      localStorage.setItem('pagination1', idx+10);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
loadData();

