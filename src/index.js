const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

let offset = 0;
localStorage.setItem('pagination',5);
let lastProduct;

let intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      offset++;
      getData();
    }

  })
}, {
  rootMargin: '0px 0px 100% 0px',
  threshold: 1.0
});


const getData = async () => {
  try {
    const response = await fetch(`${API}?offset=${offset * 10}&limit=10`)
    const data = await response.json()
    let products = data;
    let productsHtml = '';
    products.map(product => {
      productsHtml += `
        <article class="Card">
        <img src="${product.images[1]}" />
        <h2>
          ${product.title}
          <small>$${product.price}</small>
        </h2>
      </article>`
    });
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = productsHtml;
    $app.appendChild(newItem);

    if (offset < 20) {
      if (lastProduct) {
        intersectionObserver.unobserve(lastProduct)
      }
      const productsOnScreen = document.querySelectorAll('.Card img');
      lastProduct = productsOnScreen[productsOnScreen.length - 1];
      intersectionObserver.observe(lastProduct)
    } else {
      window.alert("Todos los productos Obtenidos");
      intersectionObserver.disconnect()
    }

  } catch (error) {
    console.log(error);
  }

}

getData();

