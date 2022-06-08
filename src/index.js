const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
let intersectionObserver = null;
let $pElement = document.createElement("p");
$pElement.innerHTML = "Todos los productos Obtenidos";

const getData = async (api) => {
  let pagination = validateLocalStorage();

  try {
    const fetchData = await fetch(api + `?offset=${pagination}&limit=${10}`);
    const response = await fetchData.json();
    let products = response;
    if (products.length > 0) {
      updateLocalStorage(pagination);
    } else {
      $app.appendChild($pElement);
      intersectionObserver.unobserve($observe);
    }
    let output = products.map((product) => {
      // template
      return `<article class="Card">
          <img src="${product.images[0]}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`;
    });
    let newItem = document.createElement("section");
    newItem.classList.add("Items");
    newItem.innerHTML = output;
    $app.appendChild(newItem);
  } catch (error) {
    console.log(error);
  }
};

function validateLocalStorage() {
  if (!localStorage.getItem("pagination")) return 5;
  else return Number(localStorage.getItem("pagination")) + 10;
}

function updateLocalStorage(value) {
  localStorage.setItem("pagination", value);
}

const loadData = async () => {
  await getData(API);
};

document.addEventListener("DOMContentLoaded", function () {
  localStorage.removeItem("pagination");

  intersectionObserver = new IntersectionObserver(
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

  intersectionObserver.observe($observe);
});