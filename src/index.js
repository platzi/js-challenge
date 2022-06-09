const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

const initalLimit = 4;
const Limit = 10;
var Page = 0;
var count = 4;

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
  localStorage.setItem("pagination", page + 5);
};

const getData = async (offset) => {
  try {
    const res = await fetch(createUrl(Limit, offset));
    const products = await res.json();

    let output = products.map((product) => {
      return Card(product);
    });
    let newItem = document.createElement("section");
    newItem.classList.add("Items");
    newItem.innerHTML = output;
    $app.appendChild(newItem);
  } catch (error) {
    console.log(error);
  }
};

const loadData = () => {
  const offset = addPage();
  count = offset;
  getData(offset);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadData();
        if (count >= 200) {
          unobserve();
        }
      }
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

function Card(product) {
  if (product.id < 201) {
    return `
          <article class="Card">
            <img src="${product.images[0]}" alt="${product.title}"/>
            <h2>
              ${product.title}
              <small>$ ${product.price}.00</small>
            </h2>
          </article>`;
  }

  return `
  <article class="Card">
    <h2 >Todos los productos Obtenidos</h2>
  </article>`;
}

function ClearLocalStorage() {
  window.onbeforeunload = function () {
    localStorage.removeItem("pagination");
    return "";
  };
}

function unobserve() {
  intersectionObserver.unobserve($observe);
}

intersectionObserver.observe($observe);
ClearLocalStorage();
