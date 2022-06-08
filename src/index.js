const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.map((product) => {
        return `<article class="Card">
          <img src="${product.category.image}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
          <p>${product.id}</p>
        </article>`
      });
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output.toString().split(",").join("");
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

//Use this if you get all the informaation
const loadData = () => {
  getData(API);
};

//Let local Storge
let localStorage = 0;

//Use this to put the start and the limit of a fetch with diferent information
const loadDataWithPagination = (start, limit) => {
  let Storage = `?offset=${start}&limit=${limit}`
  getData(API + Storage);
};

//This is a funcion to disconnect the observer
const disconnectObserver = () => {
  intersectionObserver.disconnect($observe);
}

const firstProduct = () => {
  loadDataWithPagination(localStorage, 10)
    localStorage = localStorage + 10;
  }

firstProduct();

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    loadDataWithPagination(localStorage, 10)
    localStorage = localStorage + 10;
    if (localStorage === 180) {
      alert("Todos los productos Obtenidos");
      disconnectObserver()
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);