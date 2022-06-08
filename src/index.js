const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
if (!(localStorage.getItem("offset") == 0)) localStorage.setItem("offset", 4);
localStorage.setItem("limit", 10);
let offset = localStorage.getItem("offset");
let limit = localStorage.getItem("limit");
let realAPI = API + `?offset=${offset}&limit=${limit}`;
const getData = async (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.map((product) => {
        return `
        <article class="Card">
          <img src="${product.images[0]}" />
            <h2>
            ${product.title}
              <small>$ ${product.price}</small>
            </h2>
        </article>`;
      });
      let newItem = document.createElement("section");
      newItem.classList.add("Item");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

const loadData = async () => {
  await getData(realAPI);
};

loadData();

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.8) {
        let limit = localStorage.getItem("limit");
        if (limit >= 199) {
          $app.insertAdjacentHTML(
            "beforeEnd",
            `<h1>Todos los productos Obtenidos</h1>`
          );
          intersectionObserver.disconnect();
        } else {
          localStorage.setItem("limit", Number(limit) + 10);
          localStorage.setItem("offset", Number(limit) + 10);
          let realAPI = API + `?offset=${offset}&limit=${limit}`;
          getData(realAPI);
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
