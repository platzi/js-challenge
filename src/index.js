const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';


window.addEventListener('load', () => { localStorage.clear() });

const handleAllProductsFetched = () => {
  $observe.innerHTML = "Todos los productos Obtenidos";
  intersectionObserver.disconnect();
}

const getData = async (api) => {
  if (!api) return;
  const grid = document.createElement("section");
  grid.className = "Items";
  $app.appendChild(grid);

  const offset = parseInt(localStorage.getItem("pagination"));
  if (offset === 205) {
    handleAllProductsFetched();
    return;
  }
  try {
    const req = await fetch(`${api}?offset=${offset}&limit=10`);
    const response = await req.json();
    response.forEach(product => {
      const productCard = createProduct(product);
      grid.appendChild(productCard);
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


  const actualPage = localStorage.getItem("pagination");
  if (!actualPage) {
    localStorage.setItem("pagination", 5);
    return;
  }
  localStorage.setItem("pagination", parseInt(actualPage) + 10);

}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      nextPage();
      loadData();
    }
  });

}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);



