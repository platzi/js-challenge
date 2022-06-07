const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
let $grid = document.getElementById('grid');
const API = 'https://api.escuelajs.co/api/v1/products';


window.addEventListener('load', () => { localStorage.clear() });

const handleAllProductsFetched = () => {
  $observe.innerHTML = "Todos los productos Obtenidos";
  intersectionObserver.disconnect();
}

const getData = async (api) => {
  if (!api) return;
  nextPage();
  if (!$grid) {
    $grid = document.createElement("section");
    $grid.className = "Items";
    $grid.setAttribute("id", "grid");
    $app.appendChild($grid);
  }
  const offset = parseInt(localStorage.getItem("page"));
  if (offset === 205) {
    handleAllProductsFetched();
    return;
  }
  try {
    const req = await fetch(`${api}?offset=${offset}&limit=10`);
    const response = await req.json();
    response.forEach(product => {
      const productCard = createProduct(product);
      $grid.appendChild(productCard);
    });
  } catch (e) {
    console.error(e);
  }


}

const createProduct = (product) => {
  const [imageSrc] = product.images;
  const card = document.createElement("article");
  card.className = "Card";
  const image = document.createElement("img");
  image.setAttribute("src", imageSrc);
  const content = document.createElement("h2");
  content.innerText = product.title;
  const price = document.createElement("small");
  price.innerText = `$ ${product.price}`;
  content.appendChild(price);
  card.appendChild(image);
  card.appendChild(content);
  return card;

}
const nextPage = () => {


  const actualPage = localStorage.getItem("page");
  if (!actualPage) {
    localStorage.setItem("page", 5);
    return;
  }
  localStorage.setItem("page", parseInt(actualPage) + 10);

}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadData();
    }
  });

}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

