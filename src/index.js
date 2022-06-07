const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

const initPosition = 0;
const limit = 10;

const getData = (api, offset, limit) => {
  fetch(`${api}?offset=${offset}&limit=${limit}`)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      if (products.length) {
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
        newItem.classList.add("Item");
        newItem.innerHTML = output;
        $app.appendChild(newItem);
      }

      if (products.length < limit) {
        let output = `
        <h2>
          Todos los productos Obtenidos
        </h2>
      `;

        let newItem = document.createElement("section");
        newItem.classList.add("Item");
        newItem.innerHTML = output;
        $app.appendChild(newItem);
        intersectionObserver.unobserve($observe);
      }
    })
    .catch((error) => console.log(error));
};

const loadData = () => {
  let positionString = localStorage.getItem("pagination");
  let position = initPosition;
  if (!isNaN(positionString)) {
    position = Number(positionString);
  }
  localStorage.setItem("pagination", position + limit);
  getData(API, position, limit);
};

const init = () => {
  localStorage.setItem("pagination", initPosition + limit);
  getData(API, initPosition, limit);
};

document.onload = init();

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadData();
      }
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
