const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = url => {
  fetch(url)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return `
    			<article class="Card">
    				<img src="${product.images[0]}" alt="${product.category.name}">
    				<h2>
    					${product.title}
    					<small>$ ${product.price}</small>
    				</h2>
    			</article>
    		`
      }).join('');

      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = (offset) => {
  const url = `${API}?offset=${offset}&limit=10`;

  getData(url);

  localStorage.setItem('pagination', offset);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    const offset = localStorage.getItem('pagination')
      ? Number(localStorage.getItem('pagination')) + 10
      : 5;

    loadData(offset);
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
