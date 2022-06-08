const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const initPage = 5;
const offset = 10;
const productsLimit = 200;
let firstLoad = true;

const API = `https://api.escuelajs.co/api/v1/products/`;

window.onbeforeunload = () => {
  localStorage.setItem("pagination", initPage);
};

let page = localStorage.getItem("pagination") || initPage;

const apiPaginated = (api, apiPage) => api + "?offset=" + apiPage + "&limit=10";

const getData = async (api) => {
  try {
    const page = localStorage.getItem("pagination") || initPage;
    if (page >= productsLimit) {
      console.log("No more products");
      cleanObserver();
      return;
    }

    const response = await fetch(apiPaginated(api, page));
    const data = await response.json();

    // fetch(api)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     let products = response;
    //     console.log(products);

    let output = data.map((product) => {
      const template = `
      <article class="Card">
        <img src="${product.images[0]}" />
          <h2>
            // ${product.title}
          <small>$ ${product.price}</small>
          </h2>
      </article>
      `;
      return template;
    });

    let newItem = document.createElement("section");
    newItem.classList.add("Item");
    newItem.innerHTML = output;
    $app.appendChild(newItem);
    console.log('firsLoad: ', firstLoad);
    if (!firstLoad) {
      
      localStorage.setItem("pagination", parseInt(page) + offset);
    }
    firstLoad = false;
  } catch (err) {
    console.log(error);
  }
};

const cleanObserver = () => {
  intersectionObserver.disconnect();
};

const loadData = async () => {
  try {
    await getData(API);
  } catch (error) {
    console.log(error);
  }
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
   
    if(entries[0].isIntersecting){
      loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
    threshold: 0.5
  }
);

intersectionObserver.observe($observe);
