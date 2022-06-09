const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
let offset = 4;
let limit = 10;
const baseURL = `${API}?offset=${offset}&limit=${limit}`;

window.onload = () => {
  if (localStorage.getItem("offset")) {
    localStorage.setItem("offset", 0);
  }
};

const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.map((product) => {
        return `
            <article class="Card">
              <img src="${product.category.image}" />
              <h2>
                ${product.title}
              <small>$ ${product.price}</small>
              </h2>
            </article>
            `;
      });
      let newItem = document.createElement("section");
      let empty = document.createElement("h3");

      newItem.classList.add("Item");
      newItem.innerHTML = output;
      empty.innerHTML = "Todos los productos Obtenidos";

      if (output.length === 0) {
        $app.appendChild(empty);
      } else {
        $app.appendChild(newItem);
      }
    })
    .catch((error) => console.log(error));
};

const loadData = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      getData(`${API}?offset=${(offset += 10)}&limit=${limit}`);
      localStorage.setItem("offset", offset);
    }
  });
};

const intersectionObserver = new IntersectionObserver(loadData, {
  root: null,
  rootMargin: "0px 0px 100% 0px",
  threshold: 0.5,
});

intersectionObserver.observe($observe);
