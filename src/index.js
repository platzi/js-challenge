const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = async api => {
  const limit = 10;
  let offset = 5;
  const response = await fetch(`${api}?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  console.log(data);

  await fetch(response.url)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
        return `
          <article class="Card">
            <img src="${product.images[0]}" />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
        `;
      }).join('');
            

      if(products.length === 0){
        intersectionObserver.unobserve($observe);
        output = "<small>Todos los productos obtenidos</small>";
      }
      
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.intersectionRatio > 0 ? loadData() : null;
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
