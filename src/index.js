//-----------------------------------------------

const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage.removeItem("pagination");
localStorage.setItem("pagination", "4");    // Para iniciar en el 5to ítem de la API
const LIMIT = 10;                           // Para mostrar los siguientes 10 (bloques de 10)

//-----------------------------------------------

const getData = api => {
    fetch(api)
        .then(response => response.json())
        .then(response => formatData(response))
        .catch(error => console.log(error));
}

//-----------------------------------------------

const loadData = async () => {
    const currPagination = parseInt(localStorage.getItem("pagination"));
    localStorage.setItem("pagination", currPagination + LIMIT);     // Actualizar paginación

    const filter = currPagination + LIMIT > 200 ?       // Crear paginación sin pasar de 200 productos
        `?offset=${currPagination}&limit=${200 - currPagination}` :
        `?offset=${currPagination}&limit=${LIMIT}`;
    await getData(API + filter);
}

//-----------------------------------------------

function checkEndOfItems(currPagination) {
    if (currPagination >= 200) {
        let newItem = document.createElement('H2');     // Para crear mensaje de todos los productos obtenidos
        newItem.innerHTML = "Todos los productos obtenidos";
        $app.appendChild(newItem);

        intersectionObserver.disconnect();      // Detener el observer cuando llega al final de productos
    }
}

//-----------------------------------------------

function formatData(data)
{
    let products = data;
    let output = products.map(product =>        // Crear artículo con clase Card
        `<article class="Card">
            <img src="${product.images[0]}" />
            <h2>${product.title}<small>$ ${product.price.toFixed(2)}</small></h2>
        </article>`
    );

    let itemsDiv = document.createElement('div');   // Para crear el elemento Items (grid)
    itemsDiv.classList.add('Items');

    output.forEach(item => {      // Para insertar cada ítem en el grid
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = item
      itemsDiv.appendChild(newItem);
    });
    
    $app.appendChild(itemsDiv);   // Agregando grid de items a App

    checkEndOfItems(parseInt(localStorage.getItem("pagination")));
}

//-----------------------------------------------

const intersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {    // Lógica para scroll infinito
            return;
        } else {
            loadData();
        }
    });
}, {
    rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

//-----------------------------------------------