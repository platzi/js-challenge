const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let initialPage = JSON.parse(localStorage.getItem('page') || '5');
const max = 10;
const newItem = document.createElement('section');
newItem.classList.add('Items');


window.onbeforeunload = () => {
  localStorage.clear();
}

const getData = async api => {
  try {
    const response = await fetch(api);
    const products = await response.json();
    const output = products.map(product => {
      const article = document.createElement('article');
      article.classList.add('Card');

      article.innerHTML = `
        <article class="Card">
          <img src="${product.images[0]}" />
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
  getData(`${API}?offset=${initialPage}&limit=${max}`);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  console.log(entries);
  if (initialPage >= 190) {
    observe.innerHTML = `
      <h2>Todos los productos Obtenidos</h2>
    `
    intersectionObserver.unobserve($observe);
    return;
  }

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
      saveStorage();
      initialPage += 10;
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
  threshold: 1.0
});

const saveStorage = () => {
  localStorage.setItem('initialPage', JSON.stringify(initialPage));
}

intersectionObserver.observe($observe);