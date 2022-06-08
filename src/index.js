const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';


const max = 200;
const startOffset = 5;
const pageLmt = 10;

localStorage.removeItem('pagination');

const getData = async (api, offset, limit) => {
  const url = `${api}?offset=${offset}&limit=${limit}`;    
  localStorage.setItem('pagination', offset);

  const response = await fetch(url);
  const data = await response.json();  
  const products = data.map(product => 
    `<article class="Card Item">
      <img src="${product.images[0]}" alt="${product.title}"/>
      <h2> ${product.title}
        <small>$ ${product.price}</small>
      </h2>
    </article>`)

  let newItem = document.createElement('section');  
  newItem.classList.add('Items');
  newItem.innerHTML = products.join(' ');    
  $app.appendChild(newItem);
}

const unobserve = (observe) => {

  let newSection = document.createElement('section');  
  newSection.classList.add('Item');
  newSection.innerHTML ='<h2>Todos los productos Obtenidos</h2>';    
  $app.appendChild(newSection);

  intersectionObserver.unobserve(observe);
}


const loadData = async (offset) => {
  await getData(API, offset, pageLmt);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting)
  {
    const pagination = localStorage.getItem('pagination') 
    const offSet = pagination ? parseInt(pagination) + pageLmt : startOffset;

    if(offSet - startOffset >= max) 
      return unobserve($observe);      

    loadData(offSet);   
  }  
}, { rootMargin: '0px 0px 100% 0px', });

intersectionObserver.observe($observe);

