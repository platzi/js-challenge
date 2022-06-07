const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const speedLoad = 500;

localStorage.clear();

const getData = async (api,offset) => {
  console.log(offset);
  localStorage.setItem('pagination',offset);
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return `<article class="Card">
          <img src="${product.images[0]}" alt="${product.title}"/>
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}


const loadData = async (offset) => {
  console.log(offset);
  let pagination =`?offset=${offset}&limit=10`;
  await getData(API+pagination,offset);
}


const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let offset = !localStorage.getItem('pagination') ? 5 : parseInt(localStorage.getItem('pagination')) + 10;
      console.log(offset);
      console.log(localStorage.getItem('pagination'));
      if(offset>=200){
        $observe.innerHTML="<h2>Todos los productos obtenitdos</h2>";
        intersectionObserver.disconnect();
        return;
      }
      loadData(offset);
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
