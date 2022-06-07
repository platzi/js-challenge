const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
const OFFSET = 5;
const LIMIT = 10;
const STORAGE_PAGE_KEY = "pageStored";
const ITEMS_LIMIT = 200;

const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
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
      newItem.classList.add("Item");
      newItem.innerHTML = output.join(" ");
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

/// ******Storage Tools********
const setLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};
const removeLocalStorage = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};
const getLocalStorage = (key, initialValue) => {
  try {
    const item = window.localStorage.getItem(key);
    return item != null ? JSON.parse(item) : initialValue;
  } catch (e) {
    return initialValue;
  }
};
/// ****************************
const loadData = async () => {
  try {
    await getData(
      `${API}?offset=${getLocalStorage(
        STORAGE_PAGE_KEY,
        OFFSET
      )}&limit=${LIMIT}`
    );
  } catch (e) {
    console.error(e);
  }
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    // logic...
    let requestNumber = parseInt(getLocalStorage(STORAGE_PAGE_KEY, OFFSET));
    const { isIntersecting } = entries[0];
    if (isIntersecting && requestNumber < ITEMS_LIMIT) {
      loadData();
      setLocalStorage(
        STORAGE_PAGE_KEY,
        getLocalStorage(STORAGE_PAGE_KEY, OFFSET) + LIMIT
      );
    } else {
      stopRequest();
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

if (window.performance) {
  console.info("window.performance works fine on this browser");
}
// Return a PerformanceNavigationTiming object
// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming
const navigation = window.performance.getEntriesByType("navigation")[0];
if (navigation.type === "reload" || navigation.type === "navigate") {
  removeLocalStorage(STORAGE_PAGE_KEY);
}
