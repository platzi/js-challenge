
const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
let pagination = 5;
let limit = 10;
const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.map((product) => {
        return product;
      });
      let paginationItems = Number(localStorage.getItem("pagination"));
      if (paginationItems >= 190) {
        endDataPrint();
      } else {
        dataPrint(output);
      }
    })
    .catch((error) => console.log(error));
};
const dataPrint = (data) => {
  data.map((product) => {
    let items = document.createElement("div");
    let card = document.createElement("article");
    let img = document.createElement("img");
    let title = document.createElement("h2");
    let price = document.createElement("small");

    title.innerText = product.title;
    price.innerText = `Price : ${product.price}`;
    img.src = product.images[0];
    card.classList.add("Card");
    items.classList.add("Items");

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    items.appendChild(card);
    $app.appendChild(items);
  });
  pagination = pagination + limit;
  limit = 2;
};
const endDataPrint = () => {
  let message = document.createElement("p");
  message.classList.add("EndItems");
  message.innerText = "All products obtened";
  $app.appendChild(message);
  intersectionObserver.unobserve($observe);
  localStorage.removeItem("pagination");
};

window.BeforeUnloadEvent = () => {
  localStorage.removeItem("pagination");
};

const loadData = async () => {
  localStorage.setItem("pagination", pagination);
  let params = `?offset=${pagination}&limit=${limit}`;
  await getData(`${API}${params}`);
};
let options = {
  rootMargin: "0px 0px 1000px 0px",
  threshold: 0.5,
};
const intersect = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadData();
    }
  });
};
const intersectionObserver = new IntersectionObserver(intersect, options);
intersectionObserver.observe($observe);
