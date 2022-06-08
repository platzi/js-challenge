const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const $list = document.getElementById('list');
var offset = 0
    // var limit = 0;


const getData = (api) => {
    fetch(api)
        .then(response => response.json())
        .then(response => {
            let products = response;
            let output = products.map(product => {
                // template
                return '<article class = "Card" ><img src =' + product.category.image + '/ >' +
                    '<h2>' + product.title + ' <small > $ ' + product.price + ' </small> </h2> </article>';

            }).join('');
            let newItem = document.createElement('section');
            newItem.classList.add('Item');
            newItem.innerHTML = output;
            $observe.appendChild(newItem);

            let msg = document.createElement('h3');
            // msg.innerHTML = "Todos los productos Obtenidos";
            // $app.appendChild(msg);
            console.log("Todos los productos Obtenidos");
        })
        .catch(error => console.log(error));
}

async function loadData() {
    let apiNew = API + '?offset=' + offset + '&limit=10';
    offset = offset + 10;
    getData(apiNew);
}

loadData();