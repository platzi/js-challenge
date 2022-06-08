const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const $main = document.querySelector('.Main');

const API = "https://api.escuelajs.co/api/v1/products";

const LIMIT = 10;
const INITIAL_PAGE = 5;


localStorage.setItem('pagination', 0);

const loadPagination = () => {
  return parseInt(localStorage.getItem('pagination') || FIST_PAGE);
}

let indexValue = loadPagination();

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
  } catch (error) {
    console.log(error);
  };
  
};

const loadData = () => {
  const apiRequest = API.concat(`?offset=${INITIAL_PAGE}&limit=${LIMIT}`)
  getData(apiRequest);
  localStorage.setItem('pagination' , +indexValue +1);
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
      indexValue = +localStorage.getItem('pagination');

      if (indexValue === 20) {
        endScroll();
      } else {
        loadData();
      }
    } else {
      return;
    }
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
