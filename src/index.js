const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

let initial = 5;
let limit = 10;
let loading = false;
let offset = 0;

localStorage.clear();
localStorage.setItem("pagination", initial);

const getData = async (api) => {
  try {
    const products = await (fetch(`${api}?offset=${offset-1}&limit=${limit}`)
                                  .then((response) => response.json()));

    const output = products.map(
      (product) =>
        `<article class="Card">
          <img src="${product.images[0]}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`);
    let newItem = document.createElement("section");
    newItem.classList.add("Items");
    newItem.innerHTML = output.join(" ");
    $app.appendChild(newItem);
    localStorage.setItem("pagination", offset);
  } catch (error) {
    console.error(error);
  } finally {
    loading = false;
  }
};

const loadData = async () => {
  if (offset === 0) {
    offset = Number(localStorage.getItem("pagination"));
  } else {
    offset = Number(localStorage.getItem("pagination")) + 10;
  }
  await getData(API);
};


const intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].intersectionRatio > 0 && offset >= 200) {
      alert('Todos los datos obtenidos');
      intersectionObserver.disconnect();
    } else {
      loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);