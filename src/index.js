const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;

      let output = products.map((product) => {
        // let li = document.createElement("li");
        // let title = document.createElement("h3");
        // let description = document.createElement("p");
        
        // title.innerText = product.title;
        // description.innerText = product.description;
        
        // li.appendChild(title);
        // li.appendChild(description);
        console.log(product)
        // return li.outerHTML;
        let price = document.createElement("small");
        let title = document.createElement("h2");
        let img = document.createElement('img');
        let article = document.createElement('article');
        article.classList.add('Card');

        price.innerText = `$ ${product.price}`
        title.innerText = product.title;
        title.appendChild(price);
        img.setAttribute('src', product.images[2]);

        article.appendChild(img);
        article.appendChild(title);
        return article.outerHTML;
      });

      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output.join();

      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

const loadData = async (offset, limit) => {
  const page = parseInt(localStorage.pagination);
  offset = offset * page;
  await getData(`${API}?offset=${offset}&limit=${limit}`);
  localStorage.setItem("pagination", page + 1 );
};

const options = {
  root: null,
  rootMargin: "0px 0px 100% 0px",
  threshold: 1.0,
};

const offset = 5;
const limit = 5;
localStorage.setItem("pagination", 0);
const intersectionObserver = new IntersectionObserver((entries) => {
  // logic...
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadData(offset, limit);
    }
  });
}, options);

intersectionObserver.observe($observe);
