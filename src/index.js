const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

const getData = (api) => {
  let offset = null;
  if (localStorage.getItem("offset")) {
    offset = localStorage.getItem("offset");
  } else {
    offset = 5;
  }
  api += "?offset=" + offset + "&limit=10";
  
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
        let products = response;
        let output = products.map((product) => {
          let template = '<article class="Card"> <img src="'+product.images[0]+'" /> <h2> '+product.description+' <small>$ '+product.price+'</small> </h2>    </article>';
          return template;
        });
        let newItem = document.createElement("section");
        newItem.classList.add("Item");
        newItem.innerHTML = output;
        $app.appendChild(newItem);
        if(response.length == 0){
          intersectionObserver.disconnect();
          let message = document.createElement("section");
          message.innerHTML = 'Todos los productos Obtenidos';
          $app.appendChild(message);
        } else {
          offset = response.slice(-1)[0].id + 1;
          localStorage.setItem("offset", offset);
        }
      }).catch((error) => console.log(error));
};

const loadData = async () => {
  localStorage.removeItem('offset');
  await getData(API);
};

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      getData(API)
    }
  });
}, {
  root: null,
  rootMargin: "0px",
  threshold: 0.25
});

window.addEventListener("load", function () {
  intersectionObserver.observe($observe);
});
