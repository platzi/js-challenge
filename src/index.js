const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const initialOffset = 4;
const limit = 10;
const idLastProduct = 200;

localStorage.clear();

const getData = async (api) => {
  let offset = localStorage.getItem('pagination') 
    ? +localStorage.getItem('pagination') - 1 + limit 
    : initialOffset;

  

  return fetch(api + `/?offset=${offset}&limit=${limit}`)
    .then(response => {
      if(response.ok){
        localStorage.setItem('pagination', offset + 1);
      }
      return response.json()
    })
    .catch(error => console.error(error));
}

const loadData = async () => {
  let isAllProdutsObtained = false;

  let response = await getData(API);
  let products = response;
  let output = products.map(product => {
    if(product.id === idLastProduct){
      isAllProdutsObtained = true; 
    }
    return `<article class="Card">
      <img src="${product.images[0]}" />
      <h2>
      ${product.title}
        <small>$ ${product.price}</small>
      </h2>
    </article>`
  });
  let newItem = document.createElement('section');
  newItem.classList.add('Items');
  newItem.innerHTML = output.join('');
  $app.appendChild(newItem);

  if(isAllProdutsObtained){
    intersectionObserver.unobserve($observe)
    let allProductsMessage = document.createElement('section');
    allProductsMessage.classList.add('Message');
    allProductsMessage.innerText = 'Todos los productos Obtenidos';
    $app.appendChild(allProductsMessage);
    
  };
}




const intersectionObserver = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting){
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
