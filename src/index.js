const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const INIT_INDEX = 4;
const LIMIT = 10;

localStorage.clear();

const getPagination = () => {
  const pagination = parseInt(localStorage.getItem("pagination"));
  return Number.isInteger(pagination) ? pagination : INIT_INDEX;
};

const getData = async (api, limit, offset) => {
  try {
    const response = await fetch(`${api}?limit=${limit}&offset=${offset}`);
    const products = await response.json();
    let newItem = document.createElement('section');
    let output = "";
    if (products?.length === 0) {
      output = `<span class="Closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        Todos los productos Obtenidos.`;
      newItem.classList.add('Alert');
      // Stop observing
      intersectionObserver.unobserve($observe);
    } else {
      localStorage.setItem('pagination', getPagination()+LIMIT);
      output = products.map(product => {
        return `<article class="Card">
          <img src="${product.images[0]}" onerror="console.log('The image could not be loaded.');"/>
          <h2>
          ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`;
      }).join("");
      newItem.classList.add('Items');
    }
    newItem.innerHTML = output;
    $app.appendChild(newItem);
  } catch (error) {
    console.log(error);
  }
}

const loadData = async () => {
  localStorage.setItem('pagination', getPagination());
  await getData(API, LIMIT, getPagination());
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.map(entrie => {
    if (entrie.isIntersecting) {
      loadData();
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
