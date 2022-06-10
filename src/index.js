const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const offsetPaginationProduct = 5;
const limitPagintationProduct = 10;
const totalProducts = 200
const totalPages = Math.ceil(totalProducts / limitPagintationProduct)
let currentPage = 0;

/**
 * Get pagination data from API products
 * If pagination not exist in local storage, the offset is offsetPaginationProduct
 * @returns {Number} offset
 */
const getPaginationProduct = () => {
  if (!localStorage.getItem('pagination')) {
    localStorage.setItem('pagination', offsetPaginationProduct);
    return offsetPaginationProduct;
  }
  const offset = parseInt(localStorage.getItem('pagination')) + limitPagintationProduct;
  localStorage.setItem('pagination', offset);
  return offset;
}

const getDataProducts = async api => {
  const offset = getPaginationProduct();
  try {
    const response = await fetch(
      `${api}?offset=${offset}&limit=${limitPagintationProduct}`
    )
    const products = await response.json();

    const newItem = document.createElement('section');
    newItem.classList.add('Item');

    products.forEach(product => {
      if (!product.images.length || !product.title || !product.price) return
      const addProductCardToDOM = productCard(product.images[0], product.title, product.price);
      newItem.innerHTML += addProductCardToDOM;
    })

    $app.appendChild(newItem);
    currentPage += 1;
  }
  catch (error) {
    console.log(error);
  }
}

const loadData = () => {
  getDataProducts(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (currentPage === totalPages) {
      intersectionObserver.unobserve($observe);
      $app.innerHTML += endProducts();
    }
    if (entry.isIntersecting) loadData();
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.onbeforeunload = () => {
  localStorage.clear();
}