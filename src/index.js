const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

// Definiciones generales
localStorage.setItem("pagination",5);
const limitePaginado = 20;

// Se despliega los datos obtenidos de la API al front-end
const getData = async(api) => {  
  try{
      const response = await fetch(
          `${api}?offset=${localStorage.getItem("pagination")}&limit=${limitePaginado}`
      );
      const products = await response.json();
      let output = products.map(
          (product) =>
              `<article class="Card">
          <img src=${product.images[0]}/>
          <h1>
            ${product.title}
            <small>$${product.price}</small>
          </h1>
        </article>`
      );
      let item = document.createElement("section");
      item.classList.add("Items");
      item.innerHTML = output.join("");
      $app.appendChild(item);
  } catch(error){
      console.error(error);
  }
};

// Carga los datos en Async/Await.
const loadData = async()=> {
  // Se accede a la API escuelajs.co
  await getData(API);
};

// scroll infinito con Intersection Observer.
const intersectionObserver = new IntersectionObserver(
  (entries, self)=>{
      if (entries[0].isIntersecting && window.scrollY !== 0){
          const actual = +localStorage.getItem("pagination");
          const siguiente = actual + limitePaginado;
          localStorage.setItem("pagination", siguiente);
          getData(API);
      }

      // Si la paginación supera los 200 se destruye el intersectionObserver
      if (localStorage.getItem("pagination") >= 200) {
          self.unobserve($observe);
          alert("Todos los productos Obtenidos");
      }
  },

  {
      rootMargin: "0px 0px 100% 0px",
  }
);

// Se carga los datos
loadData();

// Se pasa el div observe al intersectionObserver
intersectionObserver.observe($observe); 
