const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

localStorage.clear();
const getData = async ({ offset = 5, limit }) => {
  localStorage.setItem("pagination", offset);
  await fetch(
    API +
      "?" +
      new URLSearchParams({
        offset,
        limit,
      })
  )
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.map((product, index) => {
        return `
        <article class="Card" key=${index}>
          <img src=${product?.category?.image} alt={${product?.category?.name}} />
          <h2>
            Producto
            <small>$ ${product?.price}</small>
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

const loadData = (offset) => getData({ offset, limit: 10 });

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (!entries[0].isIntersecting) return;

    const offset = localStorage.getItem("pagination")
      ? parseInt(localStorage.getItem("pagination")) + 10
      : 5;
    if (offset < 200) {
      loadData(offset);
    } else {
      intersectionObserver.unobserve($observe);
      let newItem = document.createElement('section');
      newItem.innerHTML = `<h1>Todos los productos Obtenidos</h1>`;
      $app.appendChild(newItem);
      return;
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
