const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
var articulos='';

inicializar();
function inicializar()
{
  localStorage.removeItem("pagination");
}

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
      articulos =articulos+format(`${product.title}`,`${product.price}`,`${product.images}`);
      });
      //console.log(articulos);
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = articulos;
      articulos='';
      $app.appendChild(newItem);     
    })
    .catch(error => console.log(error));
}


const loadData = () => {
  var request = paginarAPI();
  getData(request);
}


function paginarAPI()
{
  var pagination=localStorage.getItem("pagination");
  if(!pagination)
  {
    pagination=4; 
  }
  else
  {
    pagination=parseInt(pagination, 10)+10;
  }
  localStorage.setItem("pagination",pagination);  
  var request=API+'?offset='+pagination+'&limit=10';
  console.log(request);
  return request;
}


const intersectionObserver = new IntersectionObserver(entries => {
  // logic...

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout( () => { loadData() }, 1000);
      }
    });

}, {
  root: null,
  //rootMargin: '0px 0px 100% 0px',
  rootMargin: "0px",
  threshold: 0.25
});

intersectionObserver.observe($observe);



function format(titulo, precio, imagenes)
{
  imagenes=imagenes.split(",",1); //solo tomo la primer imagen para seguir estructura solicitada
  $html='<article class="Card"><img src="'+imagenes+'" /><h2>'+titulo+'<small>$ '+precio+'</small></h2></article>';
  return $html;
}