const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
const firstPage = 5;
const amount = 10;
window.localStorage.clear();
const getData = async (api) => {
  const pagination = localStorage.getItem("pagination")
    ? Number(localStorage.getItem("pagination")) + amount
    : firstPage;
  localStorage.setItem("pagination", pagination);
  const response = await fetch(api + `/?limit=${amount}&offset=${pagination}`);
  const products = await response.json();
  if (products.length > 0) {
    const output = await products.map((product) => {
      return Card(product);
    });
    let newItem = document.createElement("section");
    newItem.classList.add("Items");
    output.map((products) => {
      newItem.innerHTML += products;
    });
    $app.appendChild(newItem);
  } else {
    let newItem = document.createElement("h3");
    newItem.innerHTML = "Todos los productos Obtenidos";
    $app.appendChild(newItem);
    $observe.remove();
  }
};

const Card = (product) => {
  return `<article class="Card">
          <img src="${product.images[0]}" alt="${product.title}" />
          <h1>${product.id}</h1>
          <h2>
            ${product.title}
            <small>$${product.price}</small>
          </h2>
        </article>`;
};
const loadData = async () => {
  await getData(API);
};
const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        loadData();
      }
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);
intersectionObserver.observe($observe);
