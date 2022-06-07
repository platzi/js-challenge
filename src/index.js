const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

// Eliminar el localStorage
localStorage.clear();

const getData = async ({ api, offset, limit }) => {
  const url = `${api}?offset=${offset}&limit=${limit}`;
  localStorage.setItem("pagination", offset);

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

  let newItem = document.createElement("section");
  newItem.classList.add("Items");
  newItem.innerHTML = output;
  $app.appendChild(newItem);

  // Implementar mensaje: "Todos los productos Obtenidos".
  // Deja de observar el elemento "observe".
  if (products.length < limit) {
    const message = document.createElement("p");
    message.innerHTML = "Todos los productos Obtenidos";
    $app.appendChild(message);
    intersectionObserver.unobserve($observe);
  };


  // Actualiza la función loadData() a Async/Await.
  const loadData = async (offset) => {
    await getData({
      api: API,
      limit: 10, //Mostrar los primeros 10 productos.
      offset: offset
    });
  }

  const intersectionObserver = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    const offset = localStorage.getItem('pagination')
      ? parseInt(localStorage.getItem('pagination')) + 10
      : 5; //Implementa la API de productos iniciando en el producto 5 y obteniendo los siguientes 10 productos.
    loadData(offset);
  }, {
    rootMargin: '0px 0px 100% 0px',
  });

}
intersectionObserver.observe($observe);
