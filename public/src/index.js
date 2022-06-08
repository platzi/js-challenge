
const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
let offset = 5;
let limit = 10;
const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.map((product) => {
        return product;
      });
      let pagination = Number(localStorage.getItem("offset"));
      if (pagination >= 190) {
        endDataPrint();
      } else {
        dataPrint(output);
      }
    })
    .catch((error) => console.log(error));
};
const dataPrint = (data) => {
  data.map((product) => {
    let main = document.createElement("section");
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
    main.classList.add("Main");

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    items.appendChild(card);
    main.appendChild(items);
    $app.appendChild(main);
  });
  offset += 10;
  limit = 10;
};
const endDataPrint = () => {
  let message = document.createElement("p");
  message.classList.add("EndItems");
  message.innerText = "All products obtened";
  $app.appendChild(message);
  intersectionObserver.unobserve($observe);
  localStorage.removeItem("offset");
};

window.BeforeUnloadEvent = () => {
  localStorage.removeItem("offset");
};

const loadData = async () => {
  localStorage.setItem("offset", offset);
  let params = `?offset=${offset}&limit=${limit}`;
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
