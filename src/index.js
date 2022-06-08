const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const $limit = 10;
const $offset = 4;
const API = "https://api.escuelajs.co/api/v1/products";

const getData = (api, limit, offset) => {
  fetch(`${api}?limit=${limit}&offset=${offset}`)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.map((product) => {
        return `
          <h2>${product.id} - ${product.title}</h2>
        `;
      });
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

const loadData = () => {
  let offset = window.localStorage.getItem("pagination")
    ? parseInt(window.localStorage.getItem("pagination")) + $limit
    : $offset;

  getData(API, $limit, offset);
  window.localStorage.setItem("pagination", offset);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) loadData();
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
