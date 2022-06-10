const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products?offset={{offset}}&limit={{limit}}';

const getPagination = () => {
    return parseInt(localStorage.getItem('pagination')) || 0;
}

const resetPagination = () => {
    localStorage.removeItem('pagination');
}

const nextPage = () => {
    const pagination = getPagination() + 1;
    localStorage.setItem('pagination', pagination);
}

const getApi = api => {
    const pagination = getPagination();
    const offset = 5 + (pagination * 10);
    const limit = 10 + (pagination * 10);
    return api.replace('{{offset}}', offset).replace('{{limit}}', limit);
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

        nextPage();

        const newItem = document.createElement('section');
        newItem.classList.add('Item');
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
    await getData(getApi(API));
}

const intersectionObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        loadData();
    }
}, {
    rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.addEventListener("beforeunload", () => {
    resetPagination();
});