const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products?offset=5&limit=10";

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

const loadData = () => {
  getData(API);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    // logic...
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);

loadData();
