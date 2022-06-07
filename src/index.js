const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = `https://api.escuelajs.co/api/v1/products`;

function itemTemplate(data) {
    return `
    <article class="Card Item">
    <img src=${data.images[0]} />
    <h2>
    ${data.title}
    <small>$ ${data.price}</small>
    </h2>
    </article>
    `;
}

const getData = (api) => {
  const currentPage = localStorage.getItem('pagination') || 0;
  const paginatedApi = `${api}?offset=${(Number(currentPage) * 10) + 5}&limit=10`;
  fetch(paginatedApi)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      if (products.length === 0) {
        let endOfItems = document.createElement('h3')
        endOfItems.classList.add('FinalMessage');
        endOfItems.innerText = 'All the products have been shown'
        $app.appendChild(endOfItems);
        intersectionObserver.disconnect($observe);
      }
      let output = products && products.map((product) => {
        return itemTemplate(product);
      });
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output.join(' ');
      $app.appendChild(newItem);
    })
    .catch((error) => console.error(error));
};

const loadData = async () => {
  await getData(API);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    window.onbeforeunload = function() {
      localStorage.removeItem('pagination');
      window.scrollTo(0, 0);
    }

    if (!entries[0].isIntersecting) {
      const getCurrentPage = localStorage.getItem('pagination');
      const newPage = Number(getCurrentPage) + 1;
      localStorage.setItem('pagination', newPage)
    }

    if (entries[0].isIntersecting) {
      loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
