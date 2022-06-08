const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const limit = 10;
window.localStorage.setItem("offset",5);

const getData = api => {
  let offset = window.localStorage.getItem('offset');
  fetch(`${api}?offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(
        product => {
            // If there is no image, will use the category one
            let image = product.category.image;
            if (Object.keys(product.images[0]).lenght > 0) {
                image = product.images[0];
            }

            let $product = `
                <article class="Card">
                  <img src="${image}" width="768" height="576" alt="${product.title}">
                  <h2>
                    ${product.title}
                    <small>US$${product.price}</small>
                  </h2>
                </article>
            `;
            return $product
        }
      );
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output.join('');
      $app.appendChild(newItem);
      window.localStorage.setItem("offset",limit+parseInt(offset));
      if(output.length < 10){
        let newItem = document.createElement('div');
        newItem.classList.add('Warning');
        newItem.innerHTML= 'Todos los productos obtenidos';
        $app.appendChild(newItem);
        $observe.remove();
      }
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  getData(API);
}

window.onbeforeunload = () => {
  window.localStorage.removeItem("offset");
}

const intersectionObserver = new IntersectionObserver(async entries => {
  if (entries[0].isIntersecting){
    await loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
