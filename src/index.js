const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';



const getData = async api => {
  let limit = 10;
  let offset =  localStorage.getItem('pagination')?  parseInt(localStorage.getItem('pagination')) + limit : 5;
  localStorage.setItem('pagination', offset);

  fetch(api + `?offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return`
          <article class="Card">
            <img src="${product.images[0]}" />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
          `;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);

      if(offset + limit >= 200) {
        intersectionObserver.disconnect();
        let newItem = document.createElement('section');
        newItem.innerHTML = `<h1>Todos los productos Obtenidos</h1>`;
        $app.appendChild(newItem);
      } 
    })
    .catch(error => console.log(error));
}



const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry =>{
    if(entry.isIntersecting) {
      loadData();
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.addEventListener('beforeunload', function (e) {
  localStorage.clear();
});
