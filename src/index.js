const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

let indexValue;

localStorage.setItem("pagination", 0);

const getData = async (api) => {
  try {
    const response = await fetch(api);
    const data = await response.json();

    let products = data;
    let output = products.map((product) => {
      return `<article class="Card" key=${product.id}>
            <img src=${product.category.image} />
            <h2>
              ${product.title}
              <small>${product.price}</small>
            </h2>
          </article>`;
    });

    let newItem = document.createElement("section");
    newItem.classList.add("Item");
    newItem.innerHTML = output.join("");
    $app.appendChild(newItem);
  } catch (error) {
    console.log(error);
  }
};

const loadData = (initial, limit = 10) => {
  const apiQuery = API.concat(`?offset=${initial}&limit=${limit}`);

  getData(apiQuery);

  localStorage.setItem("pagination", +indexValue + 1);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      const $main = document.querySelector(".Main");
      indexValue = +localStorage.getItem("pagination");
      const offset = 4 + 10 * indexValue;

      if (indexValue === 20) {
        const messageContainer = document.createElement("div");
        const message = document.createElement("p");
        messageContainer.classList.add("Message");
        message.innerHTML = "Todos los productos Obtenidos";
        messageContainer.appendChild(message);
        $main.appendChild(messageContainer);

        intersectionObserver.unobserve($observe);
      } else {
        loadData(offset);
      }
    } else {
      return;
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
