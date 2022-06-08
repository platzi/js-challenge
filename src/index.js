const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
const limitPagination = 10;
const initialOffset = 5;
const finalOffset = 200;

const setOffset = async (offset) => {
  await localStorage.setItem("pagination", offset);
};
function getOffset() {
  const offset = localStorage.getItem("pagination");
  return Number(offset);
}

const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;

      let output = products.map((product) => {
        return `<article class="Card">
        <img src=${product.images[0]} />
        <h2>
         ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>`;
      });
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output.join(" ");
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

const loadData = async (offset) => {
  await getData(getURL(offset));
};

const getURL = (offset) => {
  return `${API}?offset=${offset}&limit=${limitPagination}`;
};

function updateOffset() {
  if (!localStorage.getItem("pagination")) {
    return 5;
  }
  return getOffset() + limitPagination;
}

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setOffset(updateOffset());
        loadData(getOffset());

        if (getOffset() - initialOffset === finalOffset) {
          $observe.innerHTML = `<h2 style="text-align:center">Todos los elementos se han mostrado</h2>`;
          intersectionObserver.disconnect();
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

window.addEventListener("beforeunload", () => {
  localStorage.clear();
  window.scrollTo(0, 0);
});
