const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
import '../public/styles.css';
const DEFAULT_INITIAL_PAGE = 5;
const INCREMENT_OFFSET = 10;
const PRODUCTS_LIMIT = 200;

window.onbeforeunload = () => {
  alert("¡Gracias por visitarnos!");
  console.log("Bye");
  localStorage.setItem("pagination", DEFAULT_INITIAL_PAGE);
};

const getApiPaginated = (api, page) => api + "?offset=" + page + "&limit=10";

const getData = async (api) => {
  try {
    const page = localStorage.getItem("pagination") || DEFAULT_INITIAL_PAGE;
    if(page >= PRODUCTS_LIMIT) {
      alert("Todos los productos Obtenidos")
      clearObserver();
      return;
    }
    const rawResponse = await fetch(getApiPaginated(api,page));
    const products = await rawResponse.json();
    let output = products.map((product) => {
      // template
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
    newItem.classList.add("Item");
    newItem.innerHTML = output.join("");
    $app.appendChild(newItem);
    localStorage.setItem("pagination", parseInt(page) + INCREMENT_OFFSET);

  } catch (err) {
    console.log(err);
  }
};

const loadData = async () => {
  await getData(API);
};

// use the intersection observer to detect when the user scrolls to the bottom of the page and load more data
const intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);

const clearObserver = () => {
  intersectionObserver.disconnect();
};
