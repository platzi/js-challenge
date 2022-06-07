const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
const offset = 10;
var itemCount = 0;
var isLoading = false;

const getData = async (api) => {
  let page = parseInt(localStorage.getItem("pagination"));
  isLoading = true;
  let start = -5 + 10 * page;

  for (let i = start; i < start + 10; i++) {
    let res = await fetch(api + "/" + i);
    let data = await res.json();
    let newItem = document.createElement("section");
    newItem.classList.add("Item");
    newItem.innerHTML = `
      <article class="Card">
        <img src=${data.images[0]} />
        <h2>
          ${data.title}
          <small>${"$" + data.price}</small>
        </h2>
      </article>`;

    $app.appendChild(newItem);
  }

  isLoading = false;
};

const loadData = () => {
  if (!isLoading) {
    getData(API);
  }
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    let page = parseInt(localStorage.getItem("pagination"));

    if (itemCount >= 200) {
      intersectionObserver.unobserve($observe);
      setTimeout(() => {
        let newItem = document.createElement("section");
        newItem.innerHTML = `<div style="margin-top:40px; margin-bottom:40px; text-align: center;">Todos los productos Obtenidos</div>`;
        $app.appendChild(newItem);
      }, 2000);
      return;
    }
    if (entries[0].isIntersecting) {
      loadData();
      let newPage = page + 1;
      itemCount += 10;
      localStorage.setItem("pagination", newPage);
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

localStorage.setItem("pagination", 1);
loadData();
intersectionObserver.observe($observe);
