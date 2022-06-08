const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

const initPosition = 5;
const limit = 10;

const getData = async (api, offset, limit) => {
  try {
    const response = await fetch(`${api}?offset=${offset}&limit=${limit}`);
    const products = await response.json();

    if (products.length) {
      let output = products.map((product) => {
        return `
        <article class="Card">
          <img src="${product.images[0]}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>
        `;
      });
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output.join("");
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
  } catch (err) {
    console.log(error);
  }
};

const loadData = () => {
  let positionString = localStorage.getItem("pagination");
  if (positionString && !isNaN(positionString)) {
    position = Number(positionString) + limit;
  } else {
    position = initPosition;
  }
  localStorage.setItem("pagination", position);
  getData(API, position, limit);
};

const init = async () => {
  localStorage.clear();
  localStorage.setItem("pagination", initPosition);
  await getData(API, initPosition, limit);
};

window.onload = () => {
  localStorage.clear();
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      loadData();
    }
    /*entries.forEach((entry, index) => {
      if (entry.isIntersecting && index !==0 ) {
        loadData();
      }
    });*/
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
