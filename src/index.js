const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

var articulos=''; // variable global para darle formato a los articulos
inicializar(); // Carga el estado de la página como quiero que esté al inicio


//Funcion que lee la API y agrega los productos a 'app'
const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      if(Object.keys(products).length === 0)
      {
        FinProductos(); //si no hay más API para consumir Cierro todo
      }
      else
      {
        let output = products.map(product => {
        articulos =articulos+format(`${product.title}`,`${product.price}`,`${product.images}`);   
        }); // Mientras haya API, tomo los articulos y les voy aplicando el formato html
      }

      if(articulos!='')
      {// Si hubo algún articulo lo agrego a 'app'
        let newItem = document.createElement('section');
        newItem.classList.add('Item');
        newItem.innerHTML = articulos;
        articulos='';
        $app.appendChild(newItem); 
      }

    })
    .catch(error => console.log(error)); // si hubo error en el fetch escribo el log
}

/*
const loadData = () => {
  var request = paginarAPI();
  getData(request);
}
*/

// Funcion loadData() hecha con async/await como pedido
// La funcion acondicion API y hace el pedido al consumo de la api
async function loadData()
{
  try
  {
    var request = paginarAPI();
    await getData(request);
  }
  catch(error)
  {
    console.log(error);
  }
}

// Funcion que solo se ejecutará cuando el elemento de observación este visible
const intersectionObserver = new IntersectionObserver(entries => {
  // logic...

    entries.forEach((entry) => {
      if (entry.isIntersecting) { // cuando se ve $observe se cargan mas datos de la API
        setTimeout( () => { loadData() }, 100); //retardo de 100ms para consumir la API
      }
    });

}, {
  root: null,
  //rootMargin: '0px 0px 100% 0px', //Con esta configuración no funcionaba
  rootMargin: "0px",
  threshold: 0.25
});

intersectionObserver.observe($observe); // pongo en observacion el $observe






////////////////////////////Aca comienzan mis funciones////////////////////////////////////


//Da formato html a los articulos
function format(titulo, precio, imagenes)
{
  imagenes=imagenes.split(",",1); //solo tomo la primer imagen para seguir estructura solicitada
  $html='<article class="Card"><img src="'+imagenes+'" /><h2>'+titulo+'<small>$ '+precio+'</small></h2></article>';
  return $html;
}

// deja de observar $observe, imprime que se termino de consumir la API en html, alert y console.log
function FinProductos()
{
  intersectionObserver.unobserve($observe); // funcion para dejar de observar
  articulos='Todos los productos Obtenidos';
  let newItem = document.createElement('section');
  newItem.classList.add('Item');
  newItem.innerHTML = '<h3>'+articulos+'</h3>'; // para imprimirlo en el html
  articulos='';
  $app.appendChild(newItem); 
  console.log(articulos);       // lo manda por consola
  alert(articulos);             // Manda un alert
}

//Crea la paginación utilizando localStorage como solicitado
function paginarAPI()
{
  var pagination=localStorage.getItem("pagination"); // intenta de leerlo
  if(!pagination)
  {
    pagination=4; // si no está definido lo setea en 4 (el 5to elemento como se solicitó)
  }
  else
  {
    pagination=parseInt(pagination, 10)+10; // si está definido castea y adisiona 10.
  }
  localStorage.setItem("pagination",pagination);      // setea el nuevo valor en localstorage
  var request=API+'?offset='+pagination+'&limit=10'; // genera la API a consumir
  //console.log(request);
  return request;
}

//borra localstorage para cuando se resetea la página
function inicializar()
{
  localStorage.removeItem("pagination");
}