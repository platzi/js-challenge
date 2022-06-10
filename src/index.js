const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const INITIAL_OFFSET_PAGINATION = 5;
const LIMIT_PAGINATION = 10;

const TemplateProduct = (item) => {
	return `
			<article class="Card">
  			<img src="${
					item.images[0].trim().length > 0
						? item.images
						: '/public/images/image-not-found.jpeg'
				}" alt="product ${item?.title}" loading="lazy"/>
  			<h2>${item?.title}<small>$ ${item?.price}</small></h2>
			</article>
		`;
};

const getData = (offset, limit) => {
	fetch(`${API}?offset=${offset}&limit=${limit}`)
		.then((response) => response.json())
		.then((response) => {
			const products = response;
			const output = products
				.map((product) => TemplateProduct(product))
				.join('');
			const newItem = document.createElement('section');
			newItem.classList.add('Item');
			newItem.innerHTML = output;
			$app.appendChild(newItem);
			window.localStorage.setItem(
				'productInitialPosition',
				Number(offset) + LIMIT_PAGINATION
			);
		})
		.catch((error) => console.log(error));
};

const loadData = (offset, limit) => {
	getData(offset, limit);
};

const intersectionObserver = new IntersectionObserver(
	(entries) => {
		// if isIntersecting
		if (entries[0].isIntersecting) {
			// localStorage empty
			if (window.localStorage.getItem('productInitialPosition')) {
				const pagination = window.localStorage.getItem(
					'productInitialPosition'
				);
				loadData(pagination, LIMIT_PAGINATION);
			} else {
				// position initial
				loadData(INITIAL_OFFSET_PAGINATION, LIMIT_PAGINATION);
			}
		}
	},
	{
		rootMargin: '0px 0px 100% 0px',
	}
);

intersectionObserver.observe($observe);
