class Data {
  static saveData(data = {}, name = "") {
    localStorage.setItem(name, JSON.stringify(data));
    //console.log(localStorage);
  }
  static loadData(name = "") {
    return JSON.parse(localStorage.getItem(name));
  }
  static removeData(name = "") {
    localStorage.removeItem(name);
  }
  static clear() {
    localStorage.clear();
  }
}

const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

if(Data.loadData('products')) Data.removeData('products');

const addData = (output) => {
  let newItem = document.createElement("section");
  newItem.classList.add("Item");
  newItem.innerHTML = output;
  $app.appendChild(newItem);
};

const getInitProduct = () => {
  let products = {
    offset: 3,
    limit: 10,
    limit_query: -1,
  };
  Data.saveData(products, "products");
};

const getLimit = () => {
  fetch("https://api.escuelajs.co/api/v1/products")
    .then((response) => response.json())
    .then((response) => {
      let products = Data.loadData("products");
      products.limit_query = response.length;
      Data.saveData(products, "products");
    })
    .catch((error) => console.log(error));
};

const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let products = response;
      let productsLocal = Data.loadData("products");
      productsLocal.offset += 10;
      let output = products.map((product) => {
        return `<article class="Card" id="product-${product.id}">
        <img src="${product.images ? product.images[0] : "#"}" alt="pruduct ${
          product.category.name
        }" loading="lazy">
              <h2>${product.title} <small>$${product.price}</small></h2>
              <p>${product.description}</p>
              <div>
                <span id="${product.category.id}">${
          product.category.name
        }</span>
              </div>
              </article>`;
      });
      Data.saveData(productsLocal, "products");
      addData(output);
      if (productsLocal.offset >= productsLocal.limit_query) {
				$observe.innerHTML = `<h1>Todos los productos Obtenidos</h1>`;
				intersectionObserver.disconnect($observe);
			}
    })
    .catch((error) => console.log(error));
};

const loadData = async () => {
  try{
    let products = Data.loadData("products");
    if (!products) {
      getInitProduct();
      try{
        await getLimit();
      }catch(error){
        console.error(error);
      }
      products = Data.loadData("products");
    }
     getData(API + "?offset=" + products.offset + "&limit=" + products.limit);
  }catch (error) {
		console.error(error);
	}
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
		if (entries[0].isIntersecting) {
			loadData();
		}
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
