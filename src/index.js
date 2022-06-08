const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const limit = 10;
window.localStorage.removeItem('pagination');

function setPagination(){
  let pagination;
  if(localStorage.getItem('pagination') === null){
    pagination = 5;
  }else{
    pagination = Math.trunc(localStorage.getItem('pagination')) + limit;
  }
  localStorage.setItem('pagination', pagination);
  return pagination;
}

const getData = async (api) => {
  const pagination = setPagination();
  fetch(`${api}?offset=${pagination}&limit=${limit}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      if(products.length === 0){
        alert('Todos los productos Obtenidos');
        intersectionObserver.disconnect();
      }else{
          let output = products.map(product => {
          return `<article class="Card">
            <img src="${product.images[0]}" />
            <h2>
            ${product.id}-${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>`
        });
        let newItem = document.createElement('section');
        newItem.classList.add('Items');
        newItem.innerHTML = output;
        $app.appendChild(newItem);
      }
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
 await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
