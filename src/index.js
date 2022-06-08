const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
localStorage.removeItem("pagination");

const pagination = () => {
  const page = localStorage.getItem("pagination") ? parseInt(localStorage.getItem("pagination")) + 10 : 5;
  localStorage.setItem("pagination", page);
  return page
}
const getData = api => {
  const offset = pagination();
  const getProducts = `${api}?offset=${offset - 1}&limit=10`
  fetch(getProducts)
    .then(response => response.json())
    .then(response => {
      let products = response;
      if (products.length > 0) {
        let output = products.map(product => {
          console.log({ product });
          // template
          const template = `
            <article class="Card">
              <img src=${product.images[0]} />
              <h2>
                ${product.title}
                <small>$ ${product.price}</small>
              </h2>
            </article>
          `;
          return template
        });
        let newItem = document.createElement('section');
        newItem.classList.add('Items');
        newItem.innerHTML = output;
        $app.appendChild(newItem);
      } else {
        let newItem = document.createElement('p');
        newItem.innerHTML = "Todos los productos Obtenidos";
        $app.appendChild(newItem);
        intersectionObserver.unobserve($observe);
      }
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.map(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
