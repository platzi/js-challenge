const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
let offset = 5;
let limit = 10;
const API = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;
const storage = window.localStorage;

const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      console.log(products);

      storage.setItem("pagination", JSON.stringify(products))
      if (storage.getItem("pagination")) {
        console.log('Data is stored in localStorage');
        storage.setItem("pagination", JSON.stringify(products))
      } else { 
        console.log('No data in localStorage');
      }

      let output = products.map(product => {
      // template
      const template = `
      <article class="Card">
        <img src="${product.images[0]}" />
          <h2>
            // ${product.title}
          <small>$ ${product.price}</small>
          </h2>
      </article>
      `
      return template
      });

      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};


const loadData = async (limit) => {
  try {
    await getData(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
  } catch (error) {
    console.log(error);
  }
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    // logic...
    console.log(entries);
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadData(limit += 10);
      }
    });  
  },
  {
    rootMargin: "0px 0px 100% 0px",
    // threshold: 0.5
  }
);

intersectionObserver.observe($observe);
