const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
const OFFSET = 5;
const LIMIT = 10;
const STORAGE_PAGE_KEY = "pageStored";

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

const setLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
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

const loadData = () => {
  getData(
    `${API}?offset=${getLocalStorage(STORAGE_PAGE_KEY, OFFSET)}&limit=${LIMIT}`
  );
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    // logic...
    const { isIntersecting } = entries[0];
    if (isIntersecting) {
      console.log("isIntersecting");
      loadData();
      setLocalStorage(
        STORAGE_PAGE_KEY,
        getLocalStorage(STORAGE_PAGE_KEY, OFFSET) + LIMIT
      );
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
