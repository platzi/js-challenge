const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
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
        // template
        //format(`${product.title}`,`${product.price}`,`${product.images}`);
        //var output =(`${product.id}: ${product.title}`);
        var output =format(`${product.title}`,`${product.price}`,`${product.images}`);
      console.log("Hola yo ya estoy aca...");
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);        
      });

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
    pagination=4; // it doesn't have to enter here but just in case there is a problem with localstorage
  }
  else
  {
    pagination=parseInt(pagination, 10)+10;
  }
  localStorage.setItem("pagination",pagination);  
  var request=API+'?offset='+pagination+'&limit=10';
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
  
  $html="Product="+titulo+"<br>";
  $html=$html+"Price="+precio+"<br>";
  $html=$html+"Images="+imagenes+"<br><br>";
  return $html;

  alert($html);
}