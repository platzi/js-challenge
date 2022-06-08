const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const $limit = 10;
const $offset = 4;
const API = "https://api.escuelajs.co/api/v1/products";
const $dummyUrl = "https://dummyimage.com/400x200/000/fff";

const getProductImage = (product) => {
  return product.images && product.images.length > 0
    ? product.images[0]
    : $dummyUrl;
};

const getData = async (api, limit, offset) => {
  const response = await fetch(`${api}?limit=${limit}&offset=${offset}`);
  const products = await response.json();
  if (products.length) {
    let output = products.map((product) => {
      return `
          <article class="Card">
            <img alt="product image" src="${getProductImage(product)}"/>
            <h2>
              ${product.id} - ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
        `;
    });

    let newItem = document.createElement("section");
    newItem.classList.add("Items");
    newItem.innerHTML = output;
    $app.appendChild(newItem);
  } else {
    let noMoreProductsCopy = document.createElement("h2");
    noMoreProductsCopy.innerHTML = "Todos los productos Obtenidos";
    $app.appendChild(noMoreProductsCopy);
    intersectionObserver.unobserve($observe);
  }
};

const loadData = async () => {
  let offset = window.localStorage.getItem("pagination")
    ? parseInt(window.localStorage.getItem("pagination")) + $limit
    : $offset;
  await getData(API, $limit, offset);
  window.localStorage.setItem("pagination", offset);
};

window.localStorage.removeItem("pagination");

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      console.log("observer");
      if (entry.isIntersecting) loadData();
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);

window.onbeforeunload = () => {
  window.localStorage.removeItem("pagination");
};
