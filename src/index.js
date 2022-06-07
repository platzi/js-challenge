const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const limit = 10;
const totalProducts = 200;

const generateProductCard = ({id,images,title,price}) => {
  return `<article id="${id}" class="Card">
            <img src="${images[0]}" alt="${title}" />
            <h2>
              Producto ${title}
              <small>$ ${price}</small>
            </h2>
          </article>`
}

const getData = api => {
  const offset = localStorage.getItem('pagination')
  ? parseInt(localStorage.getItem('pagination')) + 10
  : 5;
  localStorage.setItem('pagination', offset);

  fetch(`${api}?offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      console.log(products)
      let productsTemplate = products.map(product => generateProductCard(product));
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = productsTemplate;
      $app.appendChild(newItem);
      if (products.length < limit) {
        let message = document.createElement('span');
        message.innerText = 'Todos los productos Obtenidos';
        $app.appendChild(message);
        intersectionObserver.unobserve($observe);
      }

    })
    .catch(error => console.log(error));
}

const loadData = async() => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.forEach(entry=>{
    if(entry.isIntersecting)
      loadData();
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.addEventListener("beforeunload", (event) => {
  event.preventDefault()
  localStorage.clear()
}); 