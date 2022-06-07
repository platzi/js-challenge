import { Product } from "./types/product";

const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
const PAGINATION_KEY = "pagination";

const INITIAL_PRODUCTS_OFFSET = 5;
const PRODUCTS_PER_REQUEST = 10;
const MAX_PRODUCTS = 200;

let isLoadingProducts = false;

const getPagination = () => {
  // Defaults to 0
  return Number(localStorage.getItem(PAGINATION_KEY));
};

const storePagination = (pagination: number) => {
  localStorage.setItem(PAGINATION_KEY, pagination.toString());
};

const clearLocalStorage = () => {
  localStorage.clear();
};

const calcOffset = (
  page: number,
  initialOffset: number,
  itemsPerPage: number
) => {
  return initialOffset + page * itemsPerPage;
};

const renderItem = (products: Product[]) => {
  const output = products.map(({ images, title, price }) => {
    return `
      <article class="Card">
        <img src="${images[0]}" alt="${title} product" />
        <h2>
        ${title}
          <small>$${price}</small>
        </h2>
      </article>`;
  });
  const newItem = document.createElement("section");
  newItem.classList.add("Item");
  newItem.innerHTML = output.join(`<br />`);
  $app.appendChild(newItem);
};

const getData = async (api: string, offset: number, limit: number) => {
  try {
    const res = await fetch(`${api}?offset=${offset}&limit=${limit}`);
    const products: Product[] = await res.json();
    renderItem(products);
  } catch (e) {
    console.error(e);
  }
};

const loadData = async () => {
  try {
    if (isLoadingProducts) return;
    isLoadingProducts = true;

    const pagination = getPagination();

    const offset = calcOffset(
      pagination,
      INITIAL_PRODUCTS_OFFSET,
      PRODUCTS_PER_REQUEST
    );

    const maxPage = MAX_PRODUCTS / PRODUCTS_PER_REQUEST;

    storePagination(pagination >= maxPage - 1 ? 0 : pagination + 1);

    console.log({ offset });
    getData(API, offset, PRODUCTS_PER_REQUEST);
  } catch (e) {
    console.log(e);
  } finally {
    isLoadingProducts = false;
  }
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    const [target] = entries;
    if (!target?.isIntersecting) return;

    loadData();
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
clearLocalStorage();
