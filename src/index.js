const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

// Constantes de inicio
const OFFSET_START = 5;
const LIMIT = 10;

let isAllDisplayed = false;  // Bandera todos los productos mostrados

const getOffset = () => {
  const offset = +localStorage.getItem("pagination") || OFFSET_START;
  return offset;
};

const setOffset = (offset) => {
  localStorage.setItem("pagination", offset);
};

const getPaginationParameters = () => {
  const offset = getOffset();
  const newOffset = offset + LIMIT;
  setOffset(newOffset + 1);
  return `?offset=${offset}&limit=${LIMIT}`;
};

const getData = async (api) => {
  await fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.reduce((previousProducts, product) => {
        return `${previousProducts}<article class="Card">
          <img src="${product.images[0]}" />
          <h2>
          ${product.title}
          <small>$ ${product.price}</small>
          </h2>
          </article>`;
      },'');

      let newItem = document.createElement("section");
      newItem.classList.add("Item");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      if (products.length === 0 && !isAllDisplayed) {
        let newItem = document.createElement("section");
        newItem.innerHTML = `<div style='text-align: center'><small>Todos los productos Obtenidos</small></div>`;
        $app.appendChild(newItem);
        isAllDisplayed = true;
      }
    })
    .catch((error) => console.log(error));
};

const loadData = async () => {
  await getData(API + getPaginationParameters());
};

setOffset(OFFSET_START);

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.intersectionRatio >= 0.75) {
          if (isAllDisplayed) {
            intersectionObserver.unobserve(entry.target);
            return;
          }
            loadData();
        }
      }
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
