const $app = document.getElementById('app');
const $observe = document.getElementById('observe');

const localStorage = window.localStorage;
localStorage.clear();
localStorage.setItem('limit', 10);

const getData = async api => {
    fetch(api)
        .then(response => response.json())
        .then(response => {

            let products = response;
            let limit = response.length;

            let output;

            if (limit < 1) {
                intersectionObserver.disconnect();

                output = (` <h3>Todos los productos Obtenidos</h3>`);
            } else {
                output = products.map(product => {
                    return (`
                    <article class="Card">
                        <img src=${product.images} />
                        <h2>
                        ${product.title}
                        <small>$ ${product.price}</small>
                        </h2>
                    </article>`);
                });
            }

            let newItem = document.createElement('section');
            newItem.classList.add('Items');
            newItem.innerHTML = output;
            $app.appendChild(newItem);

            localStorage.setItem('limit', limit);
        })
        .catch(error => console.log(error));
}

const loadData = async (pagination, limit) => {

    const API = `https://api.escuelajs.co/api/v1/products?offset=${pagination}&limit=${limit}`;

    await getData(API);

    localStorage.setItem('pagination', pagination);

}

const intersectionObserver = new IntersectionObserver(entries => {
    // logic...
    let limit = Number(localStorage.getItem('limit'));
    let pagination = (localStorage.getItem('pagination')) ? Number(localStorage.getItem('pagination')) + Number(limit) : 5;

    entries.forEach(entry => {
        if (entry.isIntersecting) {

            if (entry.intersectionRatio >= 0.75) {
                loadData(pagination, limit);
            }
        }
    });

}, {
    rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
