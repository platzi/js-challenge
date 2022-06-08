const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

//Use closeOrReload for control close or reload event
localStorage.setItem('pagination', localStorage.getItem('closeOrReload') ? 0 : 4);

app.classList.add('Items');

const getData = api => {
    fetch(api + '?limit=10&offset=' + localStorage.getItem('pagination'))
        .then(response => response.json())
        .then(response => {
            let products = response;

            if (products && products.length > 0) {
                products.forEach(product => {

                    //HTML
                    //<article class="Card">
                    let newProduct = document.createElement('article');
                    newProduct.classList.add('Card');

                    //  <img src="imagen.png" />
                    let img = document.createElement('img');
                    const imgSrc = document.createAttribute("src");
                    imgSrc.value = product.images[0];
                    img.setAttributeNode(imgSrc);
                    newProduct.appendChild(img);

                    // <h2>
                    //     Producto
                    //     <small>$ Precio</small>
                    // </h2>
                    let h2 = document.createElement('h2');
                    h2.innerHTML = product.title;

                    let small = document.createElement('small');
                    small.innerHTML = '$ ' + product.price;
                    h2.appendChild(small);

                    newProduct.appendChild(h2);

                    $app.appendChild(newProduct);
                });
            } else {

                //unobserve
                intersectionObserver.unobserve($observe);

                let finalPagination = document.createElement('p');
                finalPagination.innerHTML = "Todos los productos Obtenidos";

                $app.appendChild(finalPagination);
            }

        })
        .catch(error => console.log(error));
}

//async await
async function loadData() {
    await getData(API);

    //update pagination: offset
    localStorage.setItem('pagination', parseInt(localStorage.getItem('pagination'), 10) + 10);
}

const intersectionObserver = new IntersectionObserver(entries => {
    // logic...

    //CAN IMPLEMENT INFINITE SCROLL
    entries.forEach((entry) => {

        // console.log(entry);
        if (entry.isIntersecting) {
            loadData();
        };
    });

}, {
        rootMargin: '0px 0px 100% 0px',
    });

intersectionObserver.observe($observe);


//Reload or close page function
function closeOrReload() {

    if (localStorage.getItem('pagination')) {
        localStorage.removeItem('pagination');
        localStorage.setItem('closeOrReload', true);
    }
}

window.addEventListener("beforeunload", function (event) {
    closeOrReload();
});