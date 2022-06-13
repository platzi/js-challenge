const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = (api,limit = 10) => {
  const offset= localStorage.getItem('pagination') ? parseInt(localStorage.getItem('pagination')) + 10 : 5-1;
  localStorage.setItem('pagination', offset)
  fetch(`${api}?offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let lengths =products.length;
      console.log(products);
      let output = products.map(product =>( 
        
        `<article class="Card" id="${product.id}">
          <img src="${product.images[0]}" alt="${product.title}" />
          <h2>
            Producto: ${product.title}
            <small>$: ${product.price}</small>
          </h2>
        </article>`
        
      ));
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      if (lengths < limit){
          let message = document.createElement('span')
          message.innerText = 'Todos los productos Obtenidos'
          $app.appendChild(message)
          intersectionObserver.unobserve($observe)
      }
    })
    .catch(error => console.log(error));
}

const loadData = async() => {
  const get = await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) loadData() })
}, 
{
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.addEventListener("beforeunload", (event) => 
{
  event.preventDefault()
  localStorage.clear()
})
