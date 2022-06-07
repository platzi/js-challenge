const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = api => {
  const offset = localStorage.getItem('pagination') //Problema 1.2
  ? parseInt(localStorage.getItem('pagination')) + 10 //Si hay un valor, trae los siguientes 10
  : 5; //Si no, empieza con el producto 5
  localStorage.setItem('pagination', offset); //Problema 1.3
  fetch(`${api}?offset=${offset}&limit=10`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      //console.log('PRODUCTOS=>'+JSON.stringify(products));
      let output = products.map(product => { //Problema 2.2
			  return `<article class='Card'> 
                  <img src='${product.images[0]}" alt="${product.title}'>
				          <h2>${product.title}
					          <small>$ ${product.price}</small>
				          </h2>
			          </article>`
      });      
      let newItem = document.createElement('section');
      newItem.classList.add('Items'); //Problema 2.1
      //console.log('OUTPUT=>'+output);
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
} 

const loadData =  async () => {   //Problema 3.3  
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  console.log('PAGINATION=>'+localStorage.getItem('pagination')+' ISINTERSECTING=>'+entries[0].isIntersecting);
  if (entries[0].isIntersecting) {
    loadData();
  } else if(Number(localStorage.getItem('pagination'))>=200){
    const message = document.createElement('p');
    message.innerHTML = 'Todos los productos Obtenidos'; //Problema 4.1 
    $app.appendChild(message);
    intersectionObserver.unobserve($observe); //Problema 4.2
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.addEventListener("beforeunload", (event) => {
  event.preventDefault();
  localStorage.clear(); //Problema 3.2
});