import {getProducts} from "./api/products.js";

const $app = document.getElementById('app');
const $ended = document.getElementById('ended');
const $observe = document.getElementById('observe');

const loadData = async () => {

    const currentOffset = localStorage.getItem('offset') || 0
    const limit = 10

    const products = await getProducts(currentOffset, limit)

    if (products){

        let output = products.map(product =>
           `<article class="Card">
              <img src="${product.images[0]}" />
              <h2>
                ${product.title}
                <small>$ ${product.price}</small>
              </h2>
            </article>`
        );

        let newItem = document.createElement('section');
        newItem.classList.add('Item');
        newItem.innerHTML = output.join(' ');
        $app.appendChild(newItem);

        const newOffset = parseInt(currentOffset) + limit

        localStorage.setItem('offset', newOffset)

        if (products.length < limit) { //llegamos al final

            if ($ended.innerHTML === ""){
                let endItem = document.createElement('span');
                endItem.classList.add('End');
                endItem.innerHTML = "Todos los productos Obtenidos";
                $ended.appendChild(endItem);
            }


            return true
        }
    }

    return false

}


window.addEventListener('beforeunload', function (e) {
    localStorage.removeItem('offset')
});

window.addEventListener('load', function (e) {

    const intersectionObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {
            loadData().then(ended => {
                if (ended){
                    intersectionObserver.unobserve($observe)
                }
            })
        })

    }, {
        rootMargin: '0px 0px 100% 0px',
    });

    intersectionObserver.observe($observe);

});


