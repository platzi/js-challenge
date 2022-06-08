const $Items = document.getElementById("Items");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products/?";

window.onbeforeunload = (e) => localStorage.clear();

const getData = async (api) => {
    try {
        const response = await fetch(
            api +
                new URLSearchParams({
                    limit: 10,
                    offset: 5 + parseInt(localStorage.getItem("page")) * 10,
                })
        );
        const responseJSON = await response.json();

        const products = responseJSON;
        products.map((product) => {
            productHTML = `
                  <img src="${product.images[0]}" alt="${product.title}" >
                  <h2>
                    ${product.title}
                    <small>$${product.price}</small>
                  </h2>
                `;
            let newItem = document.createElement("article");
            newItem.classList.add("Card");
            newItem.innerHTML = productHTML;
            $Items.appendChild(newItem);
        });
    } catch (error) {
        console.log(error);
    }
};

const loadData = async () => {
    await getData(API);
};

const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(
        (entry) => {
            console.log(entry);
            if (entry.isIntersecting) {
                const newPage =
                    (parseInt(localStorage.getItem("page")) || 0) + 1;

                if (newPage === 20) {
                    intersectionObserver.disconnect();
                    document.getElementById("endList").classList.remove("hide");
                } else {
                    localStorage.setItem("page", newPage);
                    loadData();
                }
            }
        },
        {
            rootMargin: "0px 0px 100% 0px",
        }
    );
});

intersectionObserver.observe($observe);
