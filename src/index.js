const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

// $app.addEventListener("onload", loadData);

const getData = (api, lazyLoad = true) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      // let output = products.map((product) => {
      // });
      let newItem = document.createElement("section");
      newItem.classList.add("Item");

      products.forEach((element) => {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("container-card");

        const imgProduct = document.createElement("img");
        imgProduct.classList.add("img-card");
        imgProduct.setAttribute("alt", element.title);
        imgProduct.setAttribute(
          lazyLoad ? "data-img" : "src",
          element.images[0]
        );

        if (lazyLoad) {
          lazyLoader.observe(imgProduct);
        }

        const title = document.createElement("h2");
        title.textContent = element.title;

        const price = document.createElement("h4");
        price.textContent = "Precio: $" + element.price;

        cardContainer.appendChild(title);
        cardContainer.appendChild(imgProduct);
        cardContainer.appendChild(price);

        newItem.appendChild(cardContainer);
      });

      $app.appendChild(newItem);

      const buton = document.querySelector("#load");
      buton.addEventListener("click", getPaginated);
    })
    .catch((error) => console.log(error));
};

async function loadData() {
  await getData(API);
}
loadData();

// window.addEventListener("scroll", getPaginated);

async function getPaginated() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  const validationScroll = scrollTop + clientHeight >= scrollHeight - 15;

  if (validationScroll) {
    page++;
    await fetch(API, {
      params: {
        page,
      },
    });
    const movies = data.results;

    createMovies(movies, genericSection, { lazyLoad: true, clean: false });
  }
}

const lazyLoader = (intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const url = entry.target.getAttribute("data-img");
        entry.target.setAttribute("src", url);
      }
    });
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
));

intersectionObserver.observe($observe);
