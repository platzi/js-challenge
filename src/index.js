const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;

      let output = products.map(
        (product) =>
          `<article class="Card">
            <img src=${product.images[2]}/>
            <h2> ${product.title} <small>$ ${product.price}</small> </h2>
        </article>`
      );

      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output.join("");
      $app.appendChild(newItem);

      if (products.length < 10) {
        let message = document.createElement('p');
        message.classList.add('Message');
        message.innerText = 'Todos los productos Obtenidos';
        $app.appendChild(message);
        $observe.remove();
    }
    })
    .catch((error) => console.log(error));
};

const loadData = async (offset, limit) => {
  await getData(`${API}?offset=${offset}&limit=${limit}`);
};

const options = {
  rootMargin: "0px 0px 100% 0px",
};

const limit = 10;
const maxProducts = 200;
localStorage.setItem("pagination", 0);
const intersectionObserver = new IntersectionObserver((entries) => {
  // logic...
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let offset = parseInt(localStorage.pagination);

      if (offset == null) {
        offset = 5;
      } else {
        offset = parseInt(offset) + limit;
      }

      loadData(offset, limit);

      localStorage.setItem('pagination', offset);
    }
  });
}, options);

window.addEventListener("beforeunload", () => {
  localStorage.removeItem("pagination");
});

intersectionObserver.observe($observe);
