const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const limit = 10;
const miStorage = window.localStorage;
miStorage.clear();


const getData = async(api) => {

    const pagination = miStorage.getItem('pagination') ?  parseInt(miStorage.getItem('pagination')) + limit : 5;
    miStorage.setItem('pagination', pagination);

    await fetch(api+`/?limit=${limit}&offset=${pagination-1}`)
        .then(response => response.json())
        .then(response => {
            if(response.length == 0){
                alert("Todos los productos Obtenidos")
                $observe.remove(); 
            }else{
                let products = response;
                let output = products.map(product => {
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
            }
        })
        .catch(error => console.log(error));
    
}

const loadData = () => {
    getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
    const paginacion = miStorage.getItem("pagination");
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            loadData();
        }
    });
}, {
    rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
