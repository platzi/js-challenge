const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const $main = document.querySelector('.Main');

const API = "https://api.escuelajs.co/api/v1/products";

const LIMIT = 10;
const INITIAL_PAGE = 5;
const LAST_PAGE = 200;


const savePagination = (pagination) => {
  localStorage.setItem('pagination', Math.max(INITIAL_PAGE, pagination));
}

const loadPagination = () => {
  return parseInt(localStorage.getItem('pagination') || INITIAL_PAGE);
}

const clearPagination = () => {
  localStorage.removeItem('pagination');
}

let currentPage = loadPagination();


const getData = async (api) => {
  try {
    const response = await fetch(api);
    const products = await response.json();
    const output = products.map((product) => {
      return `<article class="Card" >
        <img src="${product.images[0]}" alt="${product.description}" />
        <h2>
          ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>`;
    });

    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output.join('');
    $app.appendChild(newItem);

    savePagination(currentPage);
    currentPage += products.length;

    if (currentPage === LAST_PAGE) {
      endScroll();
    }
  } catch (error) {
    console.log(error);
  };
  
};

const loadData = () => {
  const apiRequest = API.concat(`?limit=${LIMIT}&offset=${currentPage}`)
  getData(apiRequest);
 

};

const endScroll = () =>{
  const messageContainer = document.createElement('div');
  const message = document.createElement('p');
  messageContainer.classList.add('Message');
  message.innerText = 'Fin! Todos los productos Obtenidos';
  messageContainer.appendChild(message);
  $main.appendChild(messageContainer);
  intersectionObserver.unobserve($observe);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
window.addEventListener('beforeunload', () => clearPagination());
