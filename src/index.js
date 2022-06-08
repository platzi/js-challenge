const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const limit = 10;
localStorage.clear('pagination');

const getData = async(api) => {
    const offset = localStorage.getItem('pagination') == null ? 5 : parseInt(localStorage.getItem('pagination')) + limit

    localStorage.setItem('pagination', offset);
    if (offset <= 200) {
        try {
            const url = `${api}/?offset=${offset}&limit=${limit}`;
            const response = await fetch(url);
            const products = await response.json();
            let output = products.map(product =>
                `<article class="Card">
                    <img src="${product.images[0]}" />
                    <h2>
                      ${product.title}
                      <small>$ ${product.price}</small>
                    </h2>
                  </article>`
            ).join("");
            let newItem = document.createElement('section');
            newItem.classList.add('Items');
            newItem.innerHTML = output;
            $app.appendChild(newItem);
            localStorage.setItem('pagination', offset);
        } catch (error) {
            console.log(error);
        }
    } else {
        let newItem = document.createElement('div');
        newItem.classList.add('msg');
        newItem.style.textAlign = 'center';
        newItem.style.padding = '2rem 0';
        newItem.innerHTML = 'Todos los productos Obtenidos';
        $app.appendChild(newItem);
        $observe.remove();
    }
}

const loadData = async() => {
    await getData(API);
}

const intersectionObserver = new IntersectionObserver(
    entries => {
        if (entries[0].isIntersecting) {
            loadData();
        }
    }, {
        rootMargin: '0px 0px 100% 0px',
    });

intersectionObserver.observe($observe);