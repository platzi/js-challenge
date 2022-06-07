const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
localStorage.clear();
const getData = (api,offset) => {
  offset==null?offset=5:offset;
  fetch(`${api}?offset=${offset}&limit=10`)
    .then(response => response.json())
    .then(response => {
      localStorage.setItem('pagination',offset);
      let products = response;
      let output = products.map(product => {
        return `<article class="Card">
        <img src="${product.category.image}" />
        <h2>
          ${product.title}
          <small>${product.price}</small>
        </h2>
      </article>`
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const actualPagination =localStorage.getItem('pagination');
      const offset = (actualPagination!=null)? Number(actualPagination)+10 : 5;
      getData(API,offset);
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
