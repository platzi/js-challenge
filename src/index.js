const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

let miStorage = window.localStorage;
miStorage.clear();
miStorage.setItem("pagination", 0);

const getElements = product => {
    const pagination = parseInt(miStorage.getItem("pagination"))
    return product.id >= (10 * pagination) - 5 && product.id <= 4 + (10 * pagination);
}

const getData = async(api) => {
    await fetch(api)
        .then(response => response.json())
        .then(response => {
            let products = response;
            let output = products.filter(getElements).map(product => {
                return `
                    <article class="Card">
                        <img src="${product.images[0]}" alt="${product.description}" title="${product.title}" />
                        <h2>${product.title}<small>$ ${product.price}</small></h2>
                    </article>
                `
            });
            let newItem = document.createElement('section');
            newItem.classList.add('Items');
            newItem.innerHTML = output;
            $app.appendChild(newItem);
        })
        .catch(error => console.log(error));
}

const loadData = () => {
    miStorage.setItem("pagination", parseInt(miStorage.getItem("pagination"))+1);
    getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
    const paginacion = miStorage.getItem("pagination");
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (paginacion < 20) {
                loadData();
            } else {
                alert("Todos los productos Obtenidos")
               $observe.remove(); 
            }
        }
    });
}, {
    rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
