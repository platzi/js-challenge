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
      //aca igualo el array products con la respuesta del fetch
      let products = response;
      console.log("productod",products);
      //aca ejecuto un map que permite hacer algo por cada item del arreglo
      let output = products.map(product => {
        // template
        console.log("producto", product)
        return `<article class="Card">
                  <img src=${product.images} />
                  <h2> ${product.title} <small>$${product.price}</small>
                  </h2>
              </article>`;
      });
      console.log("output",output);
      //aqui se supone que debo crear la nueva seccion de los nuevos elementos
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      //newItem.innerHTML = output;
      //aqui escribo nuevos amigues por cada arreglo recibido
      //newItem.innerHTML = '<p> Hola amigues</p>';
      //aqui los anado 
      $app.appendChild(newItem);
      output.map(product => document.querySelector('section').insertAdjacentHTML("beforeend", product))
      //document.querySelector('section').insertAdjacentHTML("beforeend", output);
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
  getData(API+urlPaginate);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) traerMas();
  })
  console.log(observe, "te estoy mirando");
  // logic...
}, {
  rootMargin: '0px 0px 100% 0px'
});

intersectionObserver.observe($observe);

