const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products?offset={{offset}}&limit={{limit}}';

window.addEventListener("beforeunload", () => {
    resetPagination();
});

const getPagination = () => {
    return parseInt(localStorage.getItem('pagination'));
}

const resetPagination = () => {
    localStorage.removeItem('pagination');
}

const nextPage = () => {
    const pagination = getPagination();
    localStorage.setItem('pagination', !pagination ? 5 : pagination + 10);
}

const getApi = api => {
    const pagination = getPagination();
    const offset = 5 + pagination;
    return api.replace('{{offset}}', offset).replace('{{limit}}', 10);
}

const getData = async api => {
    try {
        const response = await fetch(api);
        const data = await response.json();
        const output = data.map(product => (`
                <article class="Card">
                    <img src="${product.images[0]}" alt="Product Image" />
                    <h2>
                        ${product.title}
                        <small>$ ${product.price}</small>
                    </h2>
                </article>
            `).trim())
            .join('');

        const newItem = document.createElement('section');
        newItem.classList.add('Items');
        newItem.innerHTML = output;
        $app.appendChild(newItem);

        if (data.length < 10) {
            let newItem = document.createElement('div');
            newItem.classList.add('Message');
            newItem.innerHTML = 'Todos los productos Obtenidos';
            $app.appendChild(newItem);
            $observe.remove();
        }
    } catch (error) {
        console.log(error);
    }
}

const loadData = async () => {
    nextPage();
    await getData(getApi(API));
}

const intersectionObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
        loadData();
    }
}, {
    root: null,
    rootMargin: "0px 0px 100% 0px",
    threshold: 1
});

intersectionObserver.observe($observe);