const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
let offset = 5;
const limit = 10;


const getData = async (api) => {
  const response = await fetch(api);
  const data = await response.json();
  if(data.length > 0){
    renderData(data);
  }
  if(data.length < limit){
  
    console.log("Todos los productos Obtenidos");
    //agregar mensaje de que no hay mas productos
    let newItem = document.createElement("section");
    newItem.innerHTML = `<h2 class="text-center">Todos los productos Obtenidos</h2>`;
    $app.appendChild(newItem);
    //destruir el observer
    intersectionObserver.disconnect();
  }
};

// renderData
const renderData = (data) => {
  let output = data.map((product) => {
  let image =  product.images[0];
    return `<article class="Card"><img src="${image}" /><h2>${product.title}<small>$ ${product.price}</small></h2></article>`;
  });

  console.log(output);
  let newItem = document.createElement("section");
  newItem.classList.add("Items");
  output.forEach(
    (item) => {
      newItem.innerHTML += item;
    }
  );
  $app.appendChild(newItem);
}

//guardar posicion_inicial en localStorage
const savePosition = (offset) => {
  localStorage.setItem("offset", offset);
};
//recuperar posicion_inicial de localStorage
const getPosition = () => {
  return localStorage.getItem("offset");
};
//eliminar posicion_inicial de localStorage
const removePosition = () => {
  localStorage.removeItem("offset");
}

let firstTime = true;

const loadData = () => {

  let position = offset;
  if (!firstTime) {
    position = parseInt(getPosition()) + limit;
  }else{
    position = parseInt(offset);
    firstTime = false;
  }
  getData(`${API}?offset=${position}&limit=${limit}`);
  savePosition(position);
};



const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadData();
      }
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);

window.addEventListener('beforeunload', () => {
  removePosition();
});
