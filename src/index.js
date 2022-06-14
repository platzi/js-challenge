const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

let pagination = 5;
let stopObserve = false;

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      if (pagination < response.length) {
        localStorage.setItem('pagination', JSON.stringify(pagination));
        let products = response.slice(pagination, pagination + 10);

        let output = products.map((product) => {
          let article = document.createElement('article');
          article.classList.add('Card');

          let img = document.createElement('img');
          img.src = product.category.image;

          let h2 = document.createElement('h2');
          h2.innerHTML = product.category.name;

          let price = document.createElement('small');
          price.innerHTML = `$ ${product.price}`;

          h2.appendChild(price);
          article.appendChild(h2);
          article.appendChild(img);

          return article.outerHTML;
        });

        let newItem = document.createElement('section');
        newItem.classList.add('Items');
        newItem.innerHTML = output.join('');
        $app.appendChild(newItem);
        pagination += 10;
      } else {
        stopObserve = true;
        let message = document.createElement('h1');
        message.innerHTML = 'Todos los productos Obtenidos';
        $app.appendChild(message);
      }

    })
    .catch(error => console.log(error));
}


const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadData();
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

if (!stopObserve) {
  intersectionObserver.observe($observe);
} else {
  intersectionObserver.unobserve($observe);
}
localStorage.removeItem('pagination');
