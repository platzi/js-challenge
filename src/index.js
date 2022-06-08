const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const $limit = 10;
const $offset = 4;

const $notIMG = "https://dummyimage.com/400x200/000/fff";

const getProductImage = (product) => {
  return product.images && product.images.length > 0
    ? product.images[0]
    : $notIMG;
};
const getData = (api, limit, offset) => {
  console.log('getData')
  fetch(`${api}?limit=${limit}&offset=${offset}`)
    .then(response => response.json())
    .then(response => {
      
      let products = response;
      console.log(products)
      let output = products.map(product => {
        // template
        return `
        <article class="Card">
        <img alt="product image" src="${getProductImage(product)}"/>
        <h2>
          ${product.id} - ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>
      `;
      });
      let newItem = document.createElement("section");
      newItem.classList.add("Item");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};



const loadData = () => {
  let offset = window.localStorage.getItem("pagination")
  ? parseInt(window.localStorage.getItem("pagination")) + $limit
  : $offset;
  getData(API, $limit, offset);
  window.localStorage.setItem("pagination", offset);
};
const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) loadData();
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
