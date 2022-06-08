const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
let offset = 5
let limit = 10
let maxProducts = 200;


const getData = async (api) => {
    localStorage.setItem("pagination", offset);
    const actualOffset = localStorage.getItem("pagination");

    if (offset <= maxProducts) {
        try {
            const response = await fetch(
                `${api}?offset=${actualOffset}&limit=${limit}`
            );
            let products = await response.json();
            let output = products.map((product) => {
                return mostrarHTML(
                    product.images[0],
                    product.title,
                    product.id,
                    product.price,
                    product.description
                );
            });
            let newItem = document.createElement("section");
            newItem.classList.add("Item");
            newItem.innerHTML = output;
            $app.appendChild(newItem);
            $app.appendChild($observe);
        } catch (error) {
            console.log(error);
        }

        offset += limit;
    } else {
        let newItem = document.createElement("div");
        newItem.classList.add("msg");
        newItem.style.textAlign = "center";
        newItem.innerHTML = "Todos los productos Obtenidos";
        $app.appendChild(newItem);
        $observe.remove();
    }
};

const mostrarHTML = (image, prodTitle, prodId, prodPrice, prodDesc) => {
    return `<article class="Card">
        <img src="${image}" alt="${prodTitle}"/>
        <h2>
          ${prodId} ${prodTitle}
          <small>$ ${prodPrice}</small>
        </h2>
        <p>
            ${prodDesc}
        </p>
      </article>`;
};

const loadData = () => {
    getData(API);
};

window.close = () => {
    Storage.clear();
};

const intersectionObserver = new IntersectionObserver(
    (entries) => {
        if (entries[0].isIntersecting) loadData();
    },
    {
        rootMargin: "0px 0px 100% 0px",
    }
);

intersectionObserver.observe($observe);
