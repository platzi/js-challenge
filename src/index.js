const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
const offset = 5;
const limit = 10;

const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let products = response;
      if (products.length == 0) {
        intersectionObserver.unobserve($observe);
        window.alert("Todos los productos Obtenidos");
        window.removeEventListener("scroll", scrollFunction);
        return;
      }
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
      newItem.classList.add("Items");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

async function loadData() {
  let indicador = localStorage.getItem("indicador");
  if (!indicador) {
    indicador = offset;
  } else {
    indicador = parseInt(indicador) + limit;
  }
  getData(API + `?offset=${indicador}&limit=${limit}`);
  localStorage.setItem("indicador", indicador);
}
function scrollFunction() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadData();
  }
}

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    loadData();
    window.addEventListener("scroll", scrollFunction, {
      passive: true,
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);
window.onclose = localStorage.clear();

intersectionObserver.observe($observe);
