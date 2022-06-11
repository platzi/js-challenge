const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const LIMIT = 10;
const INITIAL_OFFSET = 5;
const NUMBER_ITEMS = 10;

window.addEventListener('beforeunload', function () {
  localStorage.clear();
});

const setOffset = () => {
  const value = !localStorage.getItem('pagination') ? INITIAL_OFFSET : (+localStorage.getItem('pagination') + NUMBER_ITEMS)
  localStorage.setItem('pagination', value);
  return value;
}

const createTemplate = (product) => {
  return `
    <article class="Card">
      <img src="${product.images[0]}" />
      <h2>
        ${product.title}
        <small>$ ${product.price}</small>
      </h2>
    </article>
  `;
};

const createItem = (output) => {
  let newItem = document.createElement('section');
  newItem.classList.add('Items');
  newItem.innerHTML = output;
  $app.appendChild(newItem);
};

const getData = async (api) => {
  try {
    const offset = setOffset();
    const urlApi = `${api}?limit=${LIMIT}&offset=${offset}`
    const response = await fetch(urlApi);
    return await response.json();
    } catch (error) {
    console.log(error)
  }
}

const loadData = async () => {
  const data = await getData(API);
  const output = data.map((product) => createTemplate(product));
  createItem(output);
}

const launchNotification = () =>{
  intersectionObserver.disconnect();
  $app.insertAdjacentHTML(
    "beforeEnd",
    `<h2>Todos los productos Obtenidos</h2>`
  );
}

const callBack = async([entrie]) => {
  if (entrie.isIntersecting) {
    localStorage.getItem('pagination') < 194 ? await loadData() : launchNotification()
  }
}

const intersectionObserver = new IntersectionObserver(callBack, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
