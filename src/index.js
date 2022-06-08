const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

// Clear local storage
localStorage.clear();

const getData = async (api) => {
	// API url
	const url = api.url + "?offset=" + api.offset + "&limit=" + api.limit;
	localStorage.setItem("pagination", api.offset);

	// Card
	const data = await fetch(url);
	const products = await data.json();
	const output = products.map(
		(product) => `
			<article class="Card">
				<img src="${product.images[0]}" alt="${product.name}">
				<h2>
					${product.title}
					<small>$ ${product.price}</small>
				</h2>
			</article>
		`
	);

	// Insert item (product)
	let newItem = document.createElement("section");
	newItem.classList.add("Items");
	newItem.innerHTML = output.join("");
	$app.appendChild(newItem);

	// Scroll completed
	if (products.length < api.limit) {
		intersectionObserver.unobserve($observe);
		let message = document.getElementById("message");
		// Avoid duplicated elements
		if (!message) {
			message = document.createElement("p");
			message.setAttribute("id", "message");
			$app.appendChild(message);
		}
		message.innerHTML = "Todos los productos obtenidos.";
	}
};

const loadData = async (offset, limit) => {
	await getData({
		url: API,
		offset: offset,
		limit: limit,
	});
};

const intersectionObserver = new IntersectionObserver(
	(entries) => {
		const offset = localStorage.getItem("pagination") ? parseInt(localStorage.getItem("pagination")) + 10 : 5;
		loadData(offset, 10);
	},
	{
		rootMargin: "0px 0px 100% 0px",
	}
);

intersectionObserver.observe($observe);
