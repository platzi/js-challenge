import {getProducts} from "./api/products.js";

const $app = document.getElementById('app');
const $ended = document.getElementById('ended');
const $observe = document.getElementById('observe');
const limit = 10;

const loadData = async () => {

    const pagination = localStorage.getItem('pagination')
    const currentOffset = pagination
        ? parseInt(pagination) + 10
        : 5;

    localStorage.setItem('pagination', currentOffset);

    const products = await getProducts(currentOffset, limit)

    if (products){

        let output = products.map(product => {
            if (product.id > 200) return;

            return `<article id="${product.id}" class="Card" >
              <img src="${product.images[0]}" alt="${product.title}" />
              <h2>
                ${product.title}
                <small>$ ${product.price}</small>
              </h2>
            </article>`
        });

        let newItem = document.createElement('section');
        newItem.classList.add('Items');
        newItem.innerHTML = output.join(' ');
        $app.appendChild(newItem);

        if (products.length < limit) { //llegamos al final

            if ($ended.innerHTML === ""){
                let endItem = document.createElement('span');
                endItem.classList.add('End');
                endItem.innerHTML = "Todos los productos Obtenidos";
                $ended.appendChild(endItem);
            }


            intersectionObserver.unobserve($observe)

            return true
        }
    }

    return false

}


window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    localStorage.clear();
});

const intersectionObserver = new IntersectionObserver(
    (entries, observer) =>
        entries.forEach(async (entry) => {

            if (entry.isIntersecting){
                const end = await loadData();
                if (end){
                    observer.disconnect();
                }
            }

        }),
    { rootMargin: '100px 0px 100% 0px' }
);

intersectionObserver.observe($observe);



