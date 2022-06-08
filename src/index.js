const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const limit = 10;
localStorage.clear('pagination');

const getData = async(api, offset) => {
    localStorage.setItem('pagination', offset);
    const url = `${api}/?offset=${offset}&limit=${limit}`;
    try {
        const response = await fetch(url);
        const products = await response.json();
        let output = products.map(
            product => `
              <article class="Card">
                <img src="${product.images[0]}" alt="${product.title}"/>
                <h2>
                  ${product.title}
                  <small>$ ${product.price}</small>
                </h2>
              </article>
              `
        );
        let newItem = document.createElement('section');
        newItem.classList.add('Items');
        newItem.innerHTML = output;
        $app.appendChild(newItem);
        localStorage.setItem('pagination', offset);
    } catch (error) {
        console.log(error);
    }
}

const loadData = async(offset) => {
    if (offset >= 200) {
        $observe.remove();
        let newItem = document.createElement('div');
        newItem.classList.add('msg');
        newItem.style.textAlign = 'center';
        newItem.style.padding = '2rem 0';
        newItem.innerHTML = 'Todos los productos Obtenidos';
        $app.appendChild(newItem);
        return;
    }

    try {
        await getData(API, offset);
    } catch (error) {
        console.error(error);
        let newItem = document.createElement('div');
        newItem.classList.add('error-msg');
        newItem.innerHTML = 'Algo salio mal';
        $app.appendChild(newItem);
    }
}

const intersectionObserver = new IntersectionObserver(
    entries => {
        if (entries[0].isIntersecting) {
            const offset = localStorage.getItem('pagination');
            loadData(offset || 5);
        }
    }, {
        rootMargin: '0px 0px 100% 0px',
    });

intersectionObserver.observe($observe);