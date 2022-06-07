const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
window.onbeforeunload = closeIt;

const getData = async (api) => {
  const responseProducts = await fetch(api);
  try {
    const response = await responseProducts.json();
    let products = response;
    let productList = products.map(createCard);
    renderProducts(productList);
  } catch (error) {
    console.log(error);
  }
};

const createCard = (product) => {
  return `
    <article class="Card">
      <img width=640 height=480 src=${product.images[0]} />
      <h2>
        ${product.title}
        <small>${product.price}</small>
      </h2>
    </article>
  `;
};

const renderProducts = (productList) => {
  let newItem = document.createElement("section");
  newItem.classList.add("Item");
  newItem.innerHTML = productList;
  $app.appendChild(newItem);
};

const resetStorage = () => {
  localStorage.removeItem("offset");
};

function closeIt() {
  resetStorage();
}

const loadData = async () => {
  await getData(API);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      getData(getURL(getOffset(), 10));
      setOffset(getOffset() + 5);
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);

const getOffset = () => {
  const offset = localStorage.getItem("offset") || "5";
  return Number(offset);
};

const setOffset = (offset) => {
  localStorage.setItem("offset", offset);
};

const getURL = (offset, limit) => {
  return `${API}?offset=${offset}&limit=${limit}`;
};
