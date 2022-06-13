const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const limitPaginate = 10;
let offsetPaginate=5;

if (localStorage.getItem("pagination")) {
  //parseo el localStorage que es un string para sumar
  offsetPaginate = parseInt(localStorage.getItem("pagination")) + limitPaginate;

  //set nuevo offsetPaginate del localStorage
  localStorage.setItem("pagination", offsetPaginate);
  console.log("offsetPaginate",offsetPaginate);
} else {
  //si no existe, entonces se toma el valor definido en offsetPaginate
  localStorage.setItem("pagination", offsetPaginate);
}

let urlPaginate=`?offset=` + offsetPaginate + `&limit=` + limitPaginate;

const loadData = (papa) => {

  console.log(API+urlPaginate);
  getData(API+urlPaginate);
  console.log("hola", papa);
}

window.onload = loadData;
  
const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const traerMas = () => {
  console.log(typeof(urlPaginate))
  console.log(urlPaginate)
  console.log(typeof(limitPaginate))

    //parseo el localStorage que es un string para sumar
    offsetPaginate = parseInt(localStorage.getItem("pagination")) + limitPaginate;

    //set nuevo offsetPaginate del localStorage
    localStorage.setItem("pagination", offsetPaginate);
    console.log("offsetPaginate",offsetPaginate);
 
  console.log(localStorage.getItem("pagination"));
  //nuevamente se construye la url para que vaya incrementado
  urlPaginate =`?offset=` + localStorage.getItem("pagination") + `&limit=` + limitPaginate;
  console.log(urlPaginate); 
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

