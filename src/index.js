const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const limit = 10;
const maxProducts = 200;
let current = 5;


window.onbeforeunload = () => {
  localStorage.clear();
}

const getData = async api => {
  try {
    const response = await fetch(api);
    const products = await response.json();
    const output = products.map(product => {
        return  `
        <article class="Card">
          <img src="${product.images[0]}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>
      `
    });
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output.join('');
    $app.appendChild(newItem);
    $app.appendChild($observe);
    current+=limit;
    
  } catch (error) {
    console.error(error);
  }
}

const loadData = () => {
  getData(`${API}?offset=${current}&limit=${limit}`);
  
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  if (localStorage.getItem('pagination') >= maxProducts) {
    observe.innerHTML = `
      <h2>Todos los productos Obtenidos</h2>
    `
    intersectionObserver.unobserve($observe);
    return;
  }
  if(entries[0].isIntersecting) {
    loadData();
    saveStorage();
  }

 
}, {
  rootMargin: '0px 0px 100% 0px',
  threshold: 1.0
});

const saveStorage = () => {
  localStorage.setItem('pagination', current);
}

intersectionObserver.observe($observe);
