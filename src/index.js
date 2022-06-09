const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
localStorage["pagination"] = 5;
let firstIteration = true;

window.onbeforeunload = () => {
  localStorage.removeItem("pagination");
};

let template = (imgSrc, imgLabel, productName, productPrice) => {
  return `
    <article class="Card">
      <img src="${imgSrc}" alt="${imgLabel}" />
      <h2>
        ${productName}
        <small>$ ${productPrice}</small>
      </h2>
    </article>
    `;
};

const getData = async (api) => {
  try {
    let response = await fetch(api);
    let data = await response.json();

    if (data.length) {
      let output = [];
      for (const singleProduct of data) {
        let htmlItem = template(
          singleProduct.images[0],
          singleProduct.description,
          singleProduct.title,
          singleProduct.price,
        );
        output.push(htmlItem);
      }

      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output.join("");
      $app.appendChild(newItem);
    } else {
      intersectionObserver.unobserve($observe);
      let message = document.createElement("p");
      message.setAttribute("lang", "es");
      message.textContent = "Todos los productos Obtenidos";
      $observe.appendChild(message);
    }
  } catch (error) {
    console.log(error);
  }
};

const loadData = async () => {
  if (firstIteration) {
    firstIteration = false;
  } else {
    localStorage["pagination"] =
      parseInt(localStorage.getItem("pagination")) + 10;
  }
  console.log(localStorage.getItem("pagination"));
  await getData(`${API}?offset=${localStorage.getItem("pagination")}&limit=10`);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  },
  {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.5,
  },
);

intersectionObserver.observe($observe);
