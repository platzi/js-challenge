const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const PRODUCT_OFFSET = 5;
const PRODUCT_LIMIT = 10;

const setPagination = (value) => {
  localStorage.setItem("pagination", value);
}

const getPagination = () => {
  if (!localStorage.getItem("pagination")) {
    localStorage.setItem("pagination", PRODUCT_OFFSET);;
  }

  return parseInt(localStorage.getItem("pagination"));
}

const clearPagination = () => {
  localStorage.removeItem("pagination");
}

const getData = async(api) => {
  let offset = getPagination();
  if ($app.childNodes.length !== 0) {
    setPagination(offset + PRODUCT_LIMIT);
  }
  
  try{
    const response = await fetch(`${api}?offset=${offset}&limit=${PRODUCT_LIMIT}`);
    if(response.status != 200){ 
      console.log("Algo salió mal !");
    }
    const data = await response.json();
    
    return data;
  }catch (ex)
  {
    console.log("Error: " + ex);
  }
}

const loadData = async() => {
  try{
    let products = await getData(API);
    let structure = ``;
    
    products.forEach(product => {
      structure += `
          <article id="product_${product.id}" class="Card">
            <img src="${product.images[0]}" />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
      `;
    });

    let catalogue = document.createElement("section");
    catalogue.classList.add("Items");
    catalogue.innerHTML = structure;
    $app.appendChild(catalogue);

    if (products.length < PRODUCT_LIMIT) {
      let span = document.createElement("span");
      span.classList.add("Message");
      span.innerHTML = "Todos los productos obtenidos";
      $app.appendChild(span);
      intersectionObserver.disconnect();
    }
  }
  catch(ex){
    console.log(ex);
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
clearPagination();