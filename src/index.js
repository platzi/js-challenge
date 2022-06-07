window.localStorage.clear();
const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products?";

function showAlert() {
  const $el = document.createElement("div");
  $el.classList.add("alert");
  $el.innerHTML = '<p class="alert-text">Todos los productos Obtenidos</p>';
  $app.appendChild($el);
}

const getData = async (api, { offset, limit }) => {
  const url = new URLSearchParams();
  url.append("offset", offset);
  url.append("limit", limit);
  const response = await fetch(`${api}${url}`);
  const products = await response.json();
  let output = products.reduce((html, product) => {
    const image = Array.isArray(product.images)
      ? product.images[0]
      : product.category.image;
    html += `<article class="Card">
    <img src=${image} />
    <h2>
      ${product.title}
      <small>$ ${product.price}</small>
    </h2>
  </article>`;
    return html;
  }, "");
  let newItem = document.createElement("section");
  newItem.classList.add("Items");
  newItem.innerHTML = output;
  $app.appendChild(newItem);
};

const loadData = async (offset) => {
  await getData(API, { offset, limit: 10 });
  window.localStorage.setItem("pagination", offset);
};

const intersectionObserver = new IntersectionObserver(
  async (entries) => {
    if (entries[0].isIntersecting) {
      const pagination = Number(window.localStorage.getItem("pagination"));
      if (pagination && !Number.isNaN(pagination)) {
        const currentPagination = pagination + 5;
        if (currentPagination < 200) {
          await loadData(currentPagination);
        } else {
          intersectionObserver.disconnect();
          showAlert();
        }
      } else {
        await loadData(5);
      }
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
