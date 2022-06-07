const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
const firstPage = 5;
const amount = 10;
const getData = async (api) => {
  try {
    let response = await fetch(api);
    response = await response.json();
    let products = response;
    if (response.length === 0) {
      let title = document.createElement("h3");
      title.innerHTML = "Todos los productos obtenidos";
      $app.appendChild(title);
      intersectionObserver.disconnect();
    }
    let output = products.map((product) => {
      return Card(product);
    });
    let newItem = document.createElement("section");
    newItem.classList.add("Item");
    newItem.innerHTML = output;
    $app.appendChild(newItem);
  } catch (err) {
    console.log(err);
  }
};
const Card = (product) => {
  return `<article class="Card">
          <img src="${product.images[0]}" alt="${product.title}" />
          <h2>
            ${product.title}
            <small>$${product.price}</small>
          </h2>
        </article>`;
};
const loadData = async () => {
  let offset = localStorage.getItem("pagination");
  offset = offset === NaN ? firstPage : parseInt(offset);
  await getData(`${API}?offset=${offset}&limit=${amount}`);
  localStorage.setItem("pagination", offset + amount);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    // logic...
    entries.forEach((entrie) => {
      if (entrie.isIntersecting) {
        loadData();
      }
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);
const init = async () => {
  localStorage.setItem("pagination", firstPage);
  await loadData();
};
init();

intersectionObserver.observe($observe);
window.onclose = localStorage.removeItem("pagination");
