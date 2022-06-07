const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
const DEFAULT_INITIAL_PAGE = 5;
const INCREMENT_OFFSET = 10

const getApiPaginated = (page) => API + '?offset=' + page + '&limit=10';

const getData = (api) => {
  const page = localStorage.getItem("pagination") || DEFAULT_INITIAL_PAGE;
  fetch(getApiPaginated(page))
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.map((product) => {
        // template
        return `
        <article class="Card">
          <img src="${product.images[0]}" />
        <h2>
          ${product.title}
          <small>$ ${product.price}</small>
        </h2>
        </article>
`;
      });
      let newItem = document.createElement("section");
      newItem.classList.add("Item");
      newItem.innerHTML = output.join('');
      $app.appendChild(newItem);
      localStorage.setItem("pagination", parseInt(page) + INCREMENT_OFFSET);
    })
    .catch((error) => console.log(error));
};

const nextPage = () => {
  let page = localStorage.getItem("pagination") || DEFAULT_INITIAL_PAGE;
  page = parseInt(page) + INCREMENT_OFFSET;
  localStorage.setItem("pagination", page);
  loadData();
};

const previusPage = () => {
  let page = localStorage.getItem("pagination") || DEFAULT_INITIAL_PAGE;
  page = parseInt(page) - INCREMENT_OFFSET;
  localStorage.setItem("pagination", page);
  loadData();
};

const loadData = () => {
  getData(API);
};

// use the intersection observer to detect when the user scrolls to the bottom of the page and load more data
const intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      loadData()
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
