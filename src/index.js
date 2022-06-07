const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

const LIMIT_PRODUCTS = 10;
const INIT_PAGINATION = 5;

localStorage.setItem("pagination", INIT_PAGINATION);
let pagination = localStorage.getItem("pagination");

const getData = (api) => {
  fetch(`${api}?offset=${pagination}&limit=${LIMIT_PRODUCTS}`)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.map(({ title, price, images, id }) => {
        if (id === 200) {
          intersectionObserver.unobserve($observe);
        }

        if (id === 201) {
          return `
            <h2>Todos los productos optenidos</h2>
          `;
        }

        if (!images.some((image) => image.startsWith("https"))) return null;

        return `
          <article class="Card">
            <img src="${images[0]}" alt="Imágen del artículo ${title}" />
            <h2>
              ${title}
              <small>$ ${price}</small>
            </h2>
          </article>
          `;
      });
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

const loadData = async () => {
  await getData(API);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // localStorage.setItem("pagination", Number(pagination) + LIMIT_PRODUCTS);
        loadData();
      }
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
