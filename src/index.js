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
let localStorage = {
  start: 0,
  limit: 10
}

//Use this to put the start and the limit of a fetch with diferent information
const loadDataWithPagination = (start, limit) => {
  let localStorage = `?offset=${start}&limit=${limit}`
  getData(API + localStorage);
};

//This is a funcion to disconnect the observer
const disconnectObserver = () => {
  intersectionObserver.disconnect($observe);
}


const intersectionObserver = new IntersectionObserver(
  (entries) => {
    loadDataWithPagination(localStorage.start, localStorage.limit)
    localStorage.start = localStorage.start + localStorage.limit;
    if (localStorage.start === 180) {
      alert("Todos los productos Obtenidos");
      disconnectObserver()
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);