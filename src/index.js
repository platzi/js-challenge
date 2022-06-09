const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
localStorage["pagination"] = 4;

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

const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let output = [];
      for (const singleProduct of response) {
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
    })
    .catch((error) => console.log(error));
};

const loadData = (entries, observer) => {
  getData(`${API}?offset=${localStorage.getItem("pagination")}&limit=10`);
  localStorage["pagination"] =
    parseInt(localStorage.getItem("pagination")) + 10;
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
