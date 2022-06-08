const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

const limit = 10;
localStorage.setItem("pagination", 5);

const getData = async (api) => {
  try {
    const response = await fetch(
      `${api}?offset=${localStorage.getItem("pagination")}&limit=${limit}`
    );
    const products = await response.json();
    let output = products.map(
      (product) =>
        `<article class="Card">
            <img src=${product.images[0]} />
            <h2>
              ${product.title}
              <small>$${product.price}</small>
            </h2>
          </article>`
    );
    let newItem = document.createElement("section");
    newItem.classList.add("Items");
    newItem.innerHTML = output.join("");
    $app.appendChild(newItem);
  } catch (error) {
    console.error(error);
  }
};

const loadData = async () => {
  await getData(API);
};

const intersectionObserver = new IntersectionObserver(
  (entries, self) => {
    if (entries[0].isIntersecting && window.scrollY !== 0) {
      const actualPosition = +localStorage.getItem("pagination");
      const nextPosition = actualPosition + limit;
      localStorage.setItem("pagination", nextPosition);
      getData(API);
    }
    if (localStorage.getItem("pagination") >= 200) {
      self.unobserve($observe);
      let noMoreItems = document.createElement("p");
      noMoreItems.innerText = "Todos los productos Obtenidos";
      let iconItem = document.createElement('span');
      iconItem.innerText = " 💚"
      noMoreItems.appendChild(iconItem)
      noMoreItems.classList.add("NoMoreItems");
      $app.appendChild(noMoreItems);
    }
  },
  {
    rootMargin: "0px 0px 200px 0px",
  }
);

loadData();

intersectionObserver.observe($observe);
