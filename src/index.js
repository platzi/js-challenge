const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

window.addEventListener("beforeunload", () => localStorage.removeItem('pagination'));

const getData = async api => {
  const pagination = localStorage.getItem("pagination");
  const limit = 10;
  let offset;

  if(pagination) {
    offset = Number(pagination) + limit;
    localStorage.setItem("pagination", offset)
  } else {
    localStorage.setItem("pagination", 5)
    offset = localStorage.getItem("pagination");
  }
  try{
      const response = await fetch(`${api}?offset=${offset}&limit=${limit}`)
      const products = await response.json()
      const output = products.map(product => {
        // template
      return `<article class="Card">
        <img src="${product.images[0]}" />
        <h2>
          ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>`
      });

      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output.join('');
      $app.appendChild(newItem);
      return products;
  } catch(e){
    console.log(e)
  }
}

const loadData = async () => {
  const products = await getData(API);
  if(products.length < 10) {
    alert('Todos los productos Obtenidos');
    intersectionObserver.disconnect()
  }
}

const intersectionObserver = new IntersectionObserver((entries, obs) => {
  // logic...
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    loadData(API);
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
