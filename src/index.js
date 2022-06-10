const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const INITIAL_OFFSET_PAGINATION = 5;
const END_OFFSET_PAGINATION = 205; // 205 - 5 initialPosition = 200 products
const LIMIT_PAGINATION = 10;

const TemplateProduct = (item) => {
	return `
			<article class="Card">
  			<img src="${
					item?.images[0].includes('http')
						? item?.images
						: '/public/images/image-not-found.jpeg'
				}" alt="product ${item?.title}" loading="lazy"/>
  			<h2>${item?.title}<small>$ ${item?.price}</small></h2>
			</article>
		`;
};

const getData = async (offset, limit) => {
	try {
		const response = await fetch(`${API}?offset=${offset}&limit=${limit}`);
		const products = await response.json();
		const output = products.map((product) => TemplateProduct(product)).join('');
		const newItem = document.createElement('section');
		newItem.classList.add('Item');
		newItem.innerHTML = output;
		$app.appendChild(newItem);
		window.localStorage.setItem(
			'productInitialPosition',
			Number(offset) + LIMIT_PAGINATION
		);
	} catch (error) {
		$app.innerHTML = '500 - Internal server error';
		console.log(error);
	}
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
				// se llega al offset 205 se debe desconectar el intersectionObserver ya que no debe observar más. se coloca ese número ya que comienza mostrando desde la posición 5
				if (Number(pagination) === END_OFFSET_PAGINATION) {
					const newItem = document.createElement('section');
					newItem.innerHTML = `<h2>Todos los productos Obtenidos</h2>`;
					$app.appendChild(newItem);
					intersectionObserver.disconnect($observe);
				} else loadData(pagination, LIMIT_PAGINATION);
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

// function initial
(() => {
	if (window.localStorage.getItem('productInitialPosition'))
		window.localStorage.removeItem('productInitialPosition');
})();
