const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
localStorage.setItem('pagination', 1);

const getData = async (api,pagination) => {
  await fetch(api+`?offset=${4+10*pagination}&limit=10`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      console.log(products);
      let output = products.map(product => {
        // template
        return `
        <article class="Card">
          <img loading="lazy" alt="${product.description}" src="${product.category.image}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      //Implementar mensaje: "Todos los productos Obtenidos".
      if(response.length < 10){
        $observe.innerHTML = `<h1> Todos los productos Obtenidos </h1> `;
        intersectionObserver.disconnect()
      }
    })
    .catch(error => console.log(error));
  
}

//Actualiza la función loadData() a Async/Await
const loadData = async (pagination) => {
  await getData(API,pagination);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  //Guarda en localStorage la posición inicial ("pagination") y actualízala en cada petición nueva para traer los siguientes productos
  if (entries[0].isIntersecting){
    let pagination = localStorage.getItem('pagination');
    loadData(pagination-1)
    localStorage.setItem('pagination', parseInt(pagination)+1);
  }

}, {
  rootMargin: '0px 0px 100% 0px',
});

window.onbeforeunload = function(){
  localStorage.clear();
};

intersectionObserver.observe($observe);
