const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = `https://api.escuelajs.co/api/v1/products`;

localStorage.removeItem('pagination');
localStorage.setItem('pagination', 5);

const getData = api => {
  fetch(api + `?offset=${localStorage.getItem('pagination')}&limit=10`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => `
        <article class="Card">
          <img src=${product.category.image} />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>
        `);
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output.join(' ');
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API);
}

let page = 0

const intersectionObserver = new IntersectionObserver(entries => { 
  if (entries[0].isIntersecting) {
    page++
    localStorage.setItem('page', page);
    if (page > 1) {
      localStorage.setItem('pagination', parseInt(localStorage.getItem('pagination')) + 10)
    }

    if (page > 20) {
      alert("Todos los productos Obtenidos")
      intersectionObserver.unobserve($observe);
    }
    
    loadData()
    console.log(page)
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
