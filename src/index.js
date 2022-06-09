const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

const limit = 10;
let intersect = 1;
let offset = 5;

const addElement = (items) => {
	return items.map((item) => {
		return `
		<article class="card">
			<img src=${item.images[0]} />
			<h2>${item.title}</h2>
      <p>$${item.price}</p>
		</article>`;
	});
};

const getData = async (api) => {
	const response = await fetch(api);
	const products = await response.json();

	localStorage.removeItem("pagination");

	try {
		let output = addElement(products);

		let newItem = document.createElement("section");
		newItem.classList.add("Items");
		newItem.innerHTML = output.join("");
		$app.append(newItem);

		localStorage.setItem("pagination", parseInt(offset));
		offset += 10;
	} catch {
		console.error(err);
	}
};

const loadData = async () => {
	let pagination = `?offset=${offset}&limit=10`;
	getData(API + pagination);
};

const intersectionObserver = new IntersectionObserver(
	(entries) => {
		// logic...
		if (entries[0].isIntersecting) {
			loadData();
		} else if (offset >= 200) {
			const info = `<p class="limit-reached">Todos los productos Obtenidos</p>`;
			$observe.innerHTML = info;
			intersectionObserver.disconnect();
		}
	},
	{
		rootMargin: "0px 0px 100% 0px",
	}
);

intersectionObserver.observe($observe);

//Eliminamos el storage (Tercer Problema, item 2)
window.onbeforeunload = () => {
  localStorage.removeItem('pagination');
};
