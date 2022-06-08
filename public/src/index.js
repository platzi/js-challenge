const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
const INITIAL_OFFSET = 5;
const LIMIT = 10;
const STORAGE_PAGE_KEY = "pagination";
const ITEMS_LIMIT = 200;

localStorage.clear();
let offset = INITIAL_OFFSET;

const TemplateItem = (product) => `
<article class="Card">
<img src=${product.images[2]} alt=${product.description}/>
  <h2>
    ${product.title}
    <small>$ ${product.price}</small>
  </h2>
</article>
`;

const RenderItems = (products) => {
  let output = products.map(TemplateItem);
  let newItem = document.createElement("section");
  newItem.classList.add("Items");
  newItem.innerHTML = output.join(" ");
  $app.appendChild(newItem);
};

const RenderStop = () => {
  let newMessageItem = document.createElement("message");
  newMessageItem.innerHTML = "<h1>Todos los productos fueron mostrados</h1>";
  $app.append(newMessageItem);
  intersectionObserver.disconnect();
};

const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let requestOffset = parseInt(localStorage.getItem(STORAGE_PAGE_KEY));
      if (requestOffset > ITEMS_LIMIT) {
        RenderStop();
        return;
      }
      RenderItems(response);
      localStorage.setItem(STORAGE_PAGE_KEY, offset);
      offset += LIMIT;
    })
    .catch((error) => console.log(error));
};

const loadData = async () => {
  await getData(API + "?offset=" + offset + "&limit=" + LIMIT);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    const { isIntersecting } = entries[0];
    if (isIntersecting) {
      loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
