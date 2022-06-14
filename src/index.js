const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

const limit = 10;

window.addEventListener("beforeunload", ()=> {
  localStorage.removeItem("pagination")
})

const getData = (api, offset, limit) => {
  const endpoint = `${API}?offset=${offset}&limit=${limit}`;
  fetch(endpoint)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      if(products.length > 0){
      let output = products.map(product => {
        return `<article class="Card">
        <img class="Card-img" src=${product.images[0]} alt=${product.title}/>
        <h2 class="Card-h2">
          ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>`;
      }); 
      let newItem = document.createElement("section");
      newItem.classList.add("Items"); 
      newItem.innerHTML = output.join("");
      $app.appendChild(newItem);
    }else{
      let finalMessage = document.createElement("p")
      finalMessage.innerText = "Todos los productos obtenidos 📦"
      $app.appendChild(finalMessage)
      intersectionObserver.unobserve($observe)
    }
    })
    .catch((error) => console.error(error));
};

const loadData = async () => {
  if(!localStorage.getItem("pagination")){
    let pagination = await localStorage.setItem("pagination", 5)
    let obtainData = await getData(API, localStorage.getItem("pagination"), limit)
  }else{
    let offset = await parseInt(localStorage.getItem("pagination")) + limit;
    let changeStorage = await localStorage.setItem("pagination", offset)
    let obtainData = await getData(API, localStorage.getItem("pagination"), limit)
  }
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if(entry.intersectionRatio > 0){
        loadData()
      } 
    })
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
