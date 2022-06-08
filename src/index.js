const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

const total = 30;
let initialOffset = 5;
let limit = 10;
let loading = false;

localStorage.clear();

const getOffset = () =>
  localStorage.getItem("pagination")
    ? Number(localStorage.getItem("pagination")) + 10
    : initialOffset;

const getData = async (api) => {
  try {
    loading = true;
    let offset = getOffset();

    const response = await fetch(`${api}?offset=${offset}&limit=${limit}`);
    const result = await response.json();
    const products = result;

    const output = products.map(
      (product) =>
        `
        <article class="Card">
          <img src="${product.images[0]}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>
      `
    );
    let newItem = document.createElement("section");
    newItem.classList.add("Items");
    // Set products without commas
    newItem.innerHTML = output.join(" ");
    $app.appendChild(newItem);

    // Set next page
    localStorage.setItem("pagination", offset);
    // If the total of remaining products is less than the limit, set a new limit
    if (offset < total && total - offset < 10) limit = total - offset;
  } catch (error) {
    console.error(error);
  } finally {
    loading = false;
  }
};

const loadData = async () => {
  await getData(API);
};

const hasMoreProductos = () => {
  return getOffset() + limit <= total;
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (!loading && entries[0].intersectionRatio > 0 && hasMoreProductos()) {
      loadData();
    } else if (!hasMoreProductos()) {
      alert("Todos los productos Obtenidos");
      intersectionObserver.disconnect();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
