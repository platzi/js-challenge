const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let offset = JSON.parse(localStorage.getItem('pagination') || '5');
const limit = 10;
const newItem = document.createElement('section');
newItem.classList.add('Items');


window.onbeforeunload = () => {
  localStorage.clear();
}

const getData = async api => {
  try {
    const response = await fetch(api);
    const products = await response.json();
    console.log('====================================');
    console.log(products);
    console.log('====================================');
    const output = products.map(product => {
      // template
      const article = document.createElement('article');
      article.classList.add('Card');

      article.innerHTML = `
        <article class="Card">
          <img src="${product.images[0]}" alt="${product.title}"/>
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>
      `
      return article.innerHTML;
    });
    newItem.innerHTML += output.join('');
    $app.appendChild(newItem);
  } catch (error) {
    console.error(error);
  }
}

const loadData = () => {
  getData(`${API}?offset=${offset}&limit=${limit}`);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  if (offset >= 190) {
    $observe.innerHTML = `
      <h2>Todos los productos Obtenidos</h2>
    `
    intersectionObserver.unobserve($observe);
    return;
  }

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
      saveLocalStorage();
      offset += 10;
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
  threshold: 1.0
});

const saveLocalStorage = () => {
  localStorage.setItem('pagination', JSON.stringify(offset));
}

intersectionObserver.observe($observe);