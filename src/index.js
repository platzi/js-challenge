const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

let offset = 4,
  limit = 10,
  loading = false;

const getData = api => {
  loading = true;
  if (offset < 200) {
    fetch(`${api}?offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return `
          <article class="Card">
            <img src="${product.category.image}" />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
        `;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      localStorage.setItem('pagination', offset);
      console.log(offset);
      offset += limit;
      setTimeout(() => {
        loading = false;
      }, 1000);
    })
    .catch(error => console.log(error));
  } else {
    alert('No hay mas productos');
    observer.disconnect();
  }

}

async function loadData() {
  if (!loading) {
    await getData(API);
  }
}

window.close = () => {
  Storage.clear();
}

const intersectOptions = {
  threshold: 1,
};

let observer = new IntersectionObserver(loadData, intersectOptions)

observer.observe($observe);