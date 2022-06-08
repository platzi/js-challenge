const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const inicialOffsetPagination = 5;
const limitPagination = 10;
const maxPagination = 20;
let countPagination = 0;

const getData = async api => {
	const offset = localStorage.getItem('pagination') ?? inicialOffsetPagination;
	localStorage.setItem(
		'pagination',
		offset === inicialOffsetPagination ? offset : +offset + limitPagination
	);
	try {
		const response = await fetch(
			api + `?offset=${offset}&limit=${limitPagination}`
		);
		const products = await response.json();
		countPagination = countPagination + 1;

		const newItem = document.createElement('section');
		newItem.classList.add('Items');

		products.forEach(product => {
			if (!product.images.length || !product.title || !product.price) return;
			const productDOM = `<article class="Card">
        <img loading="lazy" src="${product.images[0]}" />
          <h2>${product.title}
            <small>$ ${product.price}</small>
          </h2>
      </article>`;

			newItem.insertAdjacentHTML('beforeend', productDOM);
		});

		$app.appendChild(newItem);
	} catch (error) {
		console.error(error);
	}
};

const loadData = async () => {
	if (countPagination === maxPagination) {
		intersectionObserver.unobserve($observe);
		const message = `<h3 class="center">Todos los productos Obtenidos</h3>`;
		$app.insertAdjacentHTML('afterend', message);
		return;
	}
	await getData(API);
};

const intersectionObserver = new IntersectionObserver(
	entries => {
		if (entries[0].isIntersecting) {
			loadData();
		}
	},
	{
		rootMargin: '0px 0px 100% 0px',
	}
);

localStorage.clear();

intersectionObserver.observe($observe);
