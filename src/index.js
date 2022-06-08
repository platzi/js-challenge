const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let offset = JSON.parse(localStorage.getItem('pagination') || '5');
const limit = 10;

window.onbeforeunload = () => {
  localStorage.clear();
}

const getData = async api => {
  try {
    const response = await fetch(api);
    const products = await response.json();
    if (products.length <= 0) return
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
    const newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output.join('');
    $app.appendChild(newItem);
  } catch (error) {
    console.error(error);
  }
}

const loadData = async () => {
  await getData(`${API}?offset=${offset}&limit=${limit}`);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  if (offset >= 200) {
    $app.innerHTML += `Todos los productos Obtenidos`;
    intersectionObserver.unobserve($observe);
    intersectionObserver.disconnect();
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