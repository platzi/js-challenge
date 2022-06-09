const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const $items = document.getElementById('items')
const API = 'https://api.escuelajs.co/api/v1/products';
// const API = 'https://api.escuelajs.co/api/v1/products?offset=5&limit=10';

window.addEventListener('beforeunload', function () {
  localStorage.clear();
});

const handleLocalStorage = async () => {
  let page = await localStorage.getItem('pagination');
  if (page == null || page == NaN) {
    await localStorage.setItem('pagination', -5);
    page = -5
  }    
  return page
}

const handleNextPage = async () => {
  let page = await handleLocalStorage()  
  let now = parseInt(page) + 10
  page = await localStorage.setItem('pagination', now)    
  if (now + 10 >= 200) {    
    let newItem = document.createElement('div');
    newItem.innerHTML = `
      <h1>Todos los datos obtenidos</h1>
    `
    $app.appendChild(newItem);
    await intersectionObserver.unobserve($observe)
  }
  return now
  
}

const eachProductTemplate = product => {  
  return `<article class="Card" id=${product.id}>
      <div class="group-images">
        <img src="${product.images[0]}" alt=${product.title}/>
      </div>
      <h2>
        ${product.title}
        <small>$ ${product.price}</small>
      </h2>
    </article>`
}

const getData = api => {  
  console.log(api)
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;      
      let output = products.map(product => eachProductTemplate(product));      
      output = output.toString().replace(/,/g, '')      
      $items.innerHTML += output;
      
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  const page = await handleNextPage()
  getData(API+`?offset=${page}&limit=10`);
}

const intersectionObserver = new IntersectionObserver(async entries => {
   const first = entries[0];
    if (first.isIntersecting) {        
        await loadData()
    }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
