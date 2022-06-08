const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

var Position = {
  clearStorage: (() => localStorage.clear())(),
  APIPagination: () => {
    const initialOffset = 5;
    const limit = 10;
    const pagination = localStorage.getItem("pagination");
    const offset = pagination ? parseInt(pagination) + limit : initialOffset;
    localStorage.setItem("pagination", offset);
    return `${API}?offset=${offset}&limit=${limit}`;
  },
};

var checkPagination = {
  validate: (callBack) => {
    const pagination = localStorage.getItem("pagination");
    if (pagination && parseInt(pagination) > 200) {
      let final = (document.createElement("h1").innerHTML =
        "Todos los productos Obtenidos");
      intersectionObserver.unobserve($observe);
      $observe.append(final);
    } else {
      callBack();
    }
  },
};

const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      console.log(products);
      if (products.length === 0) {
        console.log("no tengo nada");
        return false;
      }
      let output = products.map(({ id, title, price, images }) => {
        let template = `
        <article class="Card">
          <img src=${images[0]}>
          <h2>${title} ${id}
            <small>$ ${price}</small>
          </h2>
        </article>
      `;
        return template;
      });
      let newItem = document.createElement("section");
      newItem.classList.add("Item");
      let articles = output.join(" ");
      newItem.innerHTML = articles;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

const loadData = async () => {
  await getData(Position.APIPagination());
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      checkPagination.validate(loadData);
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
