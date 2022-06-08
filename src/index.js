const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
const INITIAL_OFFSET = 5;
const LIMIT = 10;
const STORAGE_PAGE_KEY = "pagination";
const ITEMS_LIMIT = 200;

if (window.performance) {
  console.info("window.performance works fine on this browser");
}
// Return a PerformanceNavigationTiming object
// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming
// Use this because the requirements do not consider the "back_forward"
const navigation = window.performance.getEntriesByType("navigation")[0];
if (navigation.type === "reload" || navigation.type === "navigate") {
  localStorage.clear();
}

let offset = INITIAL_OFFSET;

const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let requestOffset = parseInt(localStorage.getItem(STORAGE_PAGE_KEY));
      if (requestOffset > ITEMS_LIMIT) {
        let newMessageItem = document.createElement("message");
        newMessageItem.innerHTML =
          "<h1>Todos los productos fueron mostrados</h1>";
        $app.append(newMessageItem);
        intersectionObserver.disconnect();
        return;
      }

      let products = response;
      let output = products.map(
        (product) => `
        <article class="Card">
        <img src=${product.images[2]} alt=${product.description}/>
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>
        `
      );
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output.join(" ");
      $app.appendChild(newItem);

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
    // logic...
    const { isIntersecting } = entries[0];
    if (isIntersecting) {
      loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

const stopRequest = () => {
  let newItem = document.createElement("span");
  newItem.innerHTML = "Todos los productos Obtenidos";
  $app.appendChild(newItem);
  intersectionObserver.disconnect($observe);
};

intersectionObserver.observe($observe);

setTimeout(() => {
  intersectionObserver.observe($observe);
}, 2100);
