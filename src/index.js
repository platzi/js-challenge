const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage.clear();

const getData = async ({api, offset, limit}) => {
  const url = `${api}?offset=${offset}&limit=${limit}`;
  localStorage.setItem('pagination', offset);
  fetch(url)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map((product) => `
        <article class="Card">
          <img src="${product.images[0]}" />
          <h2>
            ${product.title}
            <small>${product.price}</small>
          </h2> 
        </article>
      `
      );
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      if (products.length < limit) {
        const message = document.createElement('p');
        message.innerHTML = 'Todos los productos Obtenidos';
        $app.appendChild(message);
        intersectionObserver.unobserve($observe);
      }
    })
    .catch(error => console.log(error));
}

const loadData = async (offset) => {
  getData({
    api: API,
    offset: offset,
    limit: 10,
  });
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting) return;
		const offset = localStorage.getItem('pagination')
			? parseInt(localStorage.getItem('pagination')) + 10
			: 5;
		loadData(offset);
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
