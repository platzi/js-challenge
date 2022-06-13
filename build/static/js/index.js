const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let nextPageLoad = false;

const getData = api => {
  return new Promise((resolve,reject) => {
    fetch(api)
      .then(response => response.json())
      .then(response => {
        let products = response;
        let output = products.map(product => {
          // template
          return buildProductTemplate(product);
        });
        if(products.length == 0){
          output = [];
          let message = document.createElement('p');
          message.innerHTML = "Todos los productos Obtenidos";
          output.push(message);
          intersectionObserver.unobserve($observe);
        }
        let productsDiv = document.createElement('div');
        productsDiv.classList.add('Items');

        output.forEach(element => {
          let newItem = document.createElement('section');
          newItem.classList.add('Item');
          newItem.appendChild(element);
          productsDiv.appendChild(newItem);
        });
        $app.appendChild(productsDiv);
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}

const loadData = async (api) => {
  await getData(api);
}

const buildProductTemplate = (product) => {
  let articleElement = document.createElement('article');
  articleElement.classList.add('Card');
  let descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('product-description');
  let categoryDiv = document.createElement('div');
  categoryDiv.classList.add('product-category');

  let title = document.createElement('h2');
  let img = document.createElement('img');
  let price = document.createElement('small');
  let description = document.createElement('p');
  let category = document.createElement('span');

  let productCategory = product.category;
  let productDescription = product.description;
  title.innerHTML = product.title;
  img.setAttribute('src',product.images[0]);
  price.innerHTML = product.price + "$";
  title.appendChild(price);
  description.innerHTML = productDescription.length > 15 ? productDescription.slice(0,45) + "..." : productDescription;
  category.innerHTML = "Category: " + productCategory.name;

  categoryDiv.appendChild(category);
  descriptionDiv.appendChild(description);

  articleElement.appendChild(img);
  articleElement.appendChild(title);
  articleElement.appendChild(categoryDiv);
  articleElement.appendChild(descriptionDiv);

  return articleElement;
}

const setStorage = (pagination, limit) =>{
  localStorage.setItem("pagination", pagination);
  localStorage.setItem("limit", limit);
}

const nextPage = () =>{
  let previousOffset = localStorage.getItem("pagination");
  let previousLimit = localStorage.getItem("limit");
  let newOffset = parseInt(previousOffset) + parseInt(previousLimit);
  setStorage(newOffset, previousLimit);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.forEach(entry => {
    if(nextPageLoad) {
      nextPage();
    }
    if(entry.intersectionRatio > 0){
      let offset = localStorage.getItem("pagination");
      let limit = localStorage.getItem("limit");
      let apiPagination = API + "?offset=" + offset + "&limit=" + limit;
      loadData(apiPagination);
      nextPageLoad = false;
    }
    if(entry.intersectionRatio == 0){ 
      nextPageLoad = true;
    }
  });
}, {
  rootMargin: "0px 0px 100% 0px",
});

setStorage(5,10);
window.onbeforeunload = () => {
  setStorage(5,10);
}
intersectionObserver.observe($observe);
