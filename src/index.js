const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

let intersectionObserver;

const setPaginationInStorage = (offset, limit) => {
  const pagination = {
    offset,
    limit,
  };
  localStorage.setItem("pagination", JSON.stringify(pagination));
};

const getData = (api) => {
  const pagination = JSON.parse(localStorage.getItem("pagination"));
  const apiUrl = `${api}?offset=${pagination.offset}&limit=${pagination.limit}`;
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

const loadData = async (offset, limit) => {
  setPaginationInStorage(offset, limit);
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
          const actualPagination = JSON.parse(
            localStorage.getItem("pagination")
          );
          loadData(
            actualPagination.offset + actualPagination.limit,
            actualPagination.limit
          );
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
    loadData(5, 10).then(() => {
      createObserver();
    });
  },
  false
);
