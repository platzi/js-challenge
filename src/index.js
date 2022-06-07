const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let firstProduct=5;
const nProducts=10;
const maxProducts=200;
localStorage.clear('pagination');


const getData =async api => {
  const offsetProduct=localStorage.getItem('pagination')!=null
  ?parseInt(localStorage.getItem('pagination'))+nProducts
  :firstProduct
  localStorage.setItem('pagination',offsetProduct);
  //console.log('offset',offsetProduct)
  if(offsetProduct<=maxProducts){
    try {
    const response = await fetch(`${api}?offset=${offsetProduct}&limit=${nProducts}`); 
        let products = await response.json();
        let output = products.map(product => {
          return `<article class="Card">
          <img src="${product.images[0]}" alt="${product.title}" />
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
      
    } catch (error){
      console.log(error)
    }
  }else{
    let newItem= document.createElement('div');
    newItem.classList.add('msg');
    newItem.style.textAlign= 'center';
    newItem.innerHTML= "Todos los productos Obtenidos";
    $app.appendChild(newItem);
    $observe.remove();
  }
}

const loadData = async() => {
    getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  //console.log('entries',entries)
  if (entries[0].isIntersecting) loadData();
}, {
  threshold: 1,
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
