const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

const initalLimit = 4;
const Limit = 10;
var Page = 0;

const createUrl = (limit = Limit, offset = initalLimit) => {
  return `${API}?offset=${offset}&limit=${limit}`;
};

const addPage = () => {
  savePage(Page);
  const page = Page * Limit + initalLimit;
  Page++;
  return page;
};

const savePage = (page) => {
  localStorage.setItem("page", page);
};

const getData = (offset) => {
  fetch(createUrl(Limit, offset))
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.map((product) => {
        return Card(product);
      });
      let newItem = document.createElement("section");
      newItem.classList.add("Item");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

const loadData = () => {
  const offset = addPage();
  getData(offset);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    // logic...
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadData();
      }
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

function Card(product) {
  return `
  <p>${product.id}</p>
  <article class="Card">
    <img src="${product.images[0]}" alt="${product.title}"/>
    <h2>
      ${product.title}
      <small>$ ${product.price}.00</small>
    </h2>
  </article>`;
}

intersectionObserver.observe($observe);
