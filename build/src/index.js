const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

localStorage.removeItem("pagination");

const getData = (api) => {
  let pagination = localStorage.getItem("pagination")
  if(pagination === null){
    localStorage.setItem("pagination", '5');
    pagination = 5;
  }else{
    pagination = parseInt(localStorage.getItem("pagination")) + 10;
    localStorage.setItem("pagination", pagination);
  }
  offset = pagination;
  console.log(offset);
  fetch(api.concat(`?offset=${offset}&limit=10`))
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      $app.appendChild(newItem);
      products.forEach((product) => {
        const template = `<article class="Card">
        <img src="${product.images[0]}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`;
        newItem.innerHTML += template;
      });
    })
    .catch((error) => console.log(error));
};

const loadData = () => {
  getData(API);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    // logic...
    if (entries[0].isIntersecting === true) {
      loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);

const mutation = new MutationObserver(() => {
  const pagination = parseInt(localStorage.getItem("pagination"));
  if (pagination > 195) {
    intersectionObserver.disconnect();
    $observe.innerHTML += "<p>Todos los productos Obtenidos</p>";
  }
});

const list = document.getElementById("app");

mutation.observe(list, { childList: true, subtree: true });
