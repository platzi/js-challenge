const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage.clear();

const getData = (api, offset, limit) => {
    localStorage.setItem('pagination', offset);
    const url = `${api}?offset=${offset}&limit=${limit}`;
    fetch(url)
        .then(response => response.json())
        .then(response => {
            let products = response;
            let output = products.map(product => {
                return `<article class="Card">
                          <img src="${product.images[0]}" alt="${product.title}"/>
                          <h2>
                            ${product.title}
                            <small> $ ${product.price}</small>
                          </h2>
                        </article>
                      `
            });
            let newItem = document.createElement('section');
            newItem.classList.add('Item');
            newItem.innerHTML = output;
            $app.appendChild(newItem);

            if (products.length < limit) {
                let message = document.createElement('p');
                message.innerHTML = 'Todos los productos Obtenidos';
                $app.appendChild(message);
                intersectionObserver.unobserve($observe);
            }
        })
        .catch(error => console.log(error));
}

const loadData = (offset) => {
    const limit = 10;
    getData(API, limit, offset);
}

const intersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const { isIntersecting, target } = entry;
        if (isIntersecting) {
            const newOffset = !localStorage.getItem('pagination') ? 5 : parseInt(localStorage.getItem('pagination')) + 10;
            loadData(newOffset)
        }
    })
}, {
    rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);