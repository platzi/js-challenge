const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

const PRODUCT_ID_OFFSET = 1; // In which product id to start the fetching (offset)
localStorage.setItem("pagination", 4); // set initial pagination to 5 (4 + 1 at first load)

// converted from then-catch to async-await
const getData = async api => {
  try {
    const response = await fetch(api);
    const products = await response.json();
    console.log(products);
    if (products.length === 0) {
      $observe.innerText = "Todos los productos obtenidos";
      intersectionObserver.unobserve($observe); // stop observing
    }
    let output = products.map(
      product =>
        `<article class="Card" key={${product.id}}>
            <img src=${product.category.image} alt="product" />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>`
    );
    let newItem = document.createElement("section");
    newItem.classList.add("Items");
    newItem.innerHTML = output.join("");
    $app.appendChild(newItem);
  } catch (error) {
    console.log(error);
  }
};

const loadData = (offset = 0, limit = 10) => {
  let pagination = +localStorage.getItem("pagination");
  pagination = pagination + 1;
  localStorage.setItem("pagination", pagination);
  const queryParameters = `?offset=${offset - 1 + pagination * 10}&limit=${limit}`;
  const fetchUrl = API.concat(queryParameters);
  getData(fetchUrl);
};

const intersectionObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      loadData(PRODUCT_ID_OFFSET, 10); // takes initial product id & desired amount.
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
