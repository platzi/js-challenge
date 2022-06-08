const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

let intersectionObserver;

const PAGINATION_LIMIT = 10;

const setPaginationInStorage = (offset) => {
  localStorage.setItem("pagination", offset);
};

const getData = (api) => {
  const pagination = JSON.parse(localStorage.getItem("pagination"));
  const apiUrl = `${api}?offset=${pagination}&limit=${PAGINATION_LIMIT}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((products) => {
      let output = products
        .map(
          (product) =>
            `
            <article class="Card">
              <img src="${product.images[0]}" alt="${product.title}">
              <h2>
                ${product.title}
                <small>${product.price}</small>
              </h2>
            </article>
          `
        )
        .join("");
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

const loadData = async (offset) => {
  setPaginationInStorage(offset);
  if (offset <= 200) {
    await getData(API);
  } else {
    intersectionObserver.unobserve($observe);
    let endOfItemsMessage = document.createElement("section");
    endOfItemsMessage.classList.add("Center");
    endOfItemsMessage.innerHTML = `
      <h1>Todos los productos Obtenidos</h1>
    `;
    $app.appendChild(endOfItemsMessage);
  }
};

function createObserver() {
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const actualOffset = JSON.parse(localStorage.getItem("pagination"));
          if (!actualOffset) {
            loadData(5);
          } else {
            loadData(actualOffset + PAGINATION_LIMIT);
          }
        }
      });
    },
    {
      rootMargin: "0px 0px 100% 0px",
      threshold: 1.0,
    }
  );
  intersectionObserver.observe($observe);
}

window.addEventListener(
  "load",
  (event) => {
    createObserver();
  },
  false
);

window.addEventListener("beforeunload", function () {
  return localStorage.clear(), setPaginationInStorage(0);
});
window.addEventListener("beforereload", function () {
  return localStorage.clear(), setPaginationInStorage(0);
});
