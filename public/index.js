const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

localStorage.setItem("pagination", 5);
let offset = localStorage.getItem('offset') == 0;

if (offset == 0) localStorage.setItem("pagination", 0);
localStorage.setItem("limit", 10);

let pagination = localStorage.getItem("pagination");
let limit = localStorage.getItem("limit");
let fullAPI = API + `?offset=${pagination}&limit=${limit}`;

const getData = async (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.map((product) => {
        return `<article class="Card">
          <img src="${product.images[0]}"/>
            <h2>
            ${product.title}
              <small>$ ${product.price}</small>
            </h2>
        </article>`;
      });
      let newItem = document.getElementsByClassName('Item');
      if (newItem.length < 2) {
        newItem = document.createElement("section");
        newItem.classList.add("Item");
        output.forEach(element => {
          newItem.insertAdjacentHTML('beforeend', element);
        })
        $app.appendChild(newItem);
      } else {
        output.forEach(element => {
          newItem[1].insertAdjacentHTML('beforeend', element);
        })
      }
    })
    .catch((error) => console.log(error));
};

const loadData = async () => {
  await getData(fullAPI);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.8) {
        if (offset >= 199) {
          $app.insertAdjacentHTML(
            "beforeEnd",
            `<h1>Todos los productos Obtenidos</h1>`
          );
          intersectionObserver.disconnect();
        } else {
          loadData();
          offset = Number(localStorage.getItem("offset")) + 10;
          localStorage.setItem("offset", offset);
          fullAPI = API + `?offset=${offset}&limit=${limit}`;
        }
      }
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);

window.addEventListener("beforeunload", function () {
  return localStorage.clear(), localStorage.setItem("offset", 0);
});
window.addEventListener("beforereload", function () {
  return localStorage.clear(), localStorage.setItem("offset", 0);
});