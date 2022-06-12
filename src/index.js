const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const PRODUCT_OFFSET = 5;
const PRODUCT_LIMIT = 10;

const getData = async(api) => {
  try{
    const response = await fetch(API);
    if(response.status != 200){ 
      throw new error(response.message);
    }
    const data = await response.json();
    //console.log(data);
    return data;
  }catch (err)
  {
    throw new error(err);
    console.log("Error: " + err);
  }
}

const loadData = async() => {
  // getData(API);
  try{
    let products = await getData(`${API}?offset=${PRODUCT_OFFSET}&limit=${PRODUCT_LIMIT}`)
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
    catalogue.classList.add("Items"); //
    catalogue.innerHTML = structure;
    $app.appendChild(catalogue);

  }
  catch(err){
    // throw new error(err);
    console.error(err);
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
//getData();
loadData();