const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
let pagination = 5;
let limit = 10;
const API = 'https://api.escuelajs.co/api/v1/products?limit='+limit+'&offset=';

const init = () =>{
    localStorage.setItem("pagination", pagination);
}

const getData = async api => {
    console.log(api);
  await fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
        return "<article class='Card'>" +
            "<img src='"+product.images[parseInt(Math.random()*3)]+"' />" +
            "<h2>" +
            product.title +
            "<small>$"+ product.price+"</small>" +
            "</h2>"+
        "</article>";
      });
      output.forEach(element => {
          let newItem = document.createElement('section');
          newItem.classList.add('Item');
          newItem.innerHTML = element;
          $app.appendChild(newItem);
      });
    })
    .catch(error => console.log(error));
}

const loadData = () => {
    getData(API+pagination);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  pagination = parseInt(localStorage.getItem("pagination")) + limit;
  if(pagination <= 200){
      localStorage.setItem("pagination", pagination);
      getData(API+pagination);
  } else {
    const $notification = document.getElementById('notification');
    $notification.innerHTML="<h1>Todos los productos Obtenidos</h1>";
    intersectionObserver.disconnect();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
