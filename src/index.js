import Data from "/src/Data.js";

const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const $body = document.getElementById("body");
const API = "https://api.escuelajs.co/api/v1/products";
/*
const APIinit = {
  product: {
    query: "https://api.escuelajs.co/api/v1/products?offset=" /0&limit=10/,
    init: 5,
    limit: 15,
    type: "producto",
  },
};
*/
$body.addEventListener("beforeunload", () => {
  alert("Se esta cerrando");
});
const addData = (output) => {
  let newItem = document.createElement("section");
  newItem.classList.add("Item");
  newItem.innerHTML = output;
  $app.appendChild(newItem);
};

const getInitProduct = () => {
  let products = {
    offset: 3,
    limit: 10,
    limit_query: -1,
  };
  Data.saveData(products, "products");
};

const getLimit = () => {
  fetch("https://api.escuelajs.co/api/v1/products")
    .then((response) => response.json())
    .then((response) => {
      let products = Data.loadData("products");
      products.limit_query = response.length;
      Data.saveData(products, "products");
    })
    .catch((error) => console.log(error));
};

const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let products = response;
      let productsLocal = Data.loadData("products");
      if (!productsLocal) {
        getInitProduct();
        productsLocal = Data.loadData("products");
      }
      productsLocal.offset += 10;
      let output = products.map((product) => {
        return `<article class="Card" id="product-${product.id}">
        <img src="${product.images ? product.images[0] : "#"}" alt="pruduct ${
          product.category.name
        }" loading="lazy">
              <h2>${product.title} <small>$${product.price}</small></h2>
              <p>${product.description}</p>
              <div>
                <span id="${product.category.id}">${
          product.category.name
        }</span>
              </div>
              </article>`;
      });
      Data.saveData(productsLocal, "products");
      addData(output);
    })
    .catch((error) => console.log(error));
};

const loadData = () => {
  let products = Data.loadData("products");
  if (!products) {
    getInitProduct();
    getLimit();
    products = Data.loadData("products");
  }
  if (products.offset > products.limit_query) return;
  getData(API + "?offset=" + products.offset + "&limit=" + products.limit);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    loadData();
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
