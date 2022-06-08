const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
localStorage.setItem("pagination", 0);

const createProductTemplate = (product) => {
  if ("content" in document.createElement("template")) {
    var template = document.querySelector("#product-card");

    var clone = template.content.cloneNode(true);

    var productName = clone.querySelector("#product-title");
    productName.textContent = product.title;
    var productPrice = clone.querySelector("#product-price");
    productPrice.textContent = `$${product.price}`;
    var productImage = clone.querySelector("#product-image");
    productImage.setAttribute("src", product.images[0]);

    return clone;
  }
};

const renderData = (response) => {
  let products = response;
  let newItem = document.createElement("section");
  newItem.classList.add("Item");

  products.forEach((product) => {
    newItem.appendChild(createProductTemplate(product));
  });

  $app.appendChild(newItem);
};

async function loadData(api) {
  let response = await fetch(api);
  response = await response.json();
  renderData(response);
}

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    const pagination = parseInt(localStorage.getItem("pagination"));
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (pagination <= 190) {
          const urlAppend = `?offset=${pagination}&limit=10`;
          const api = API + urlAppend;
          localStorage.setItem("pagination", pagination + 10);
          loadData(api);
        } else {
          $observe.innerText = "Todos los productos Obtenidos";
          intersectionObserver.disconnect();
        }
      }
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);

window.onbeforeunload = function (e) {
  localStorage.setItem("pagination", 0);
};
