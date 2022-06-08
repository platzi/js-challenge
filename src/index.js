const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const inicialOffsetPagination = '5';
const limitPagination = 10;
const maxPagination = 20;
let countPagination = 0;

const getPagination = () => {
	if (!localStorage.getItem('pagination')) {
		localStorage.setItem('pagination', inicialOffsetPagination);
		return inicialOffsetPagination;
	}
	const offsetNew = +localStorage.getItem('pagination') + limitPagination;
	localStorage.setItem('pagination', offsetNew);
	return offsetNew;
};

const getData = async api => {
	const offset = getPagination();
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
	await getData(API);
};

const intersectionObserver = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (countPagination === maxPagination) {
				intersectionObserver.unobserve($observe);
				const message = `<h3 class="center">Todos los productos Obtenidos</h3>`;
				$app.insertAdjacentHTML('afterend', message);
				return;
			}
			if (entry.isIntersecting) loadData();
		});
	},
	{
		rootMargin: '0px 0px 100% 0px',
	}
);

localStorage.clear();

intersectionObserver.observe($observe);
