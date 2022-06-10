const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const paginationlimit = 10;
const itemTemplate = (product) => {
    return `
<article class="Card">
  <img src="${product.images[0]}" />
  <h2>
    ${product.title}
    <small>${product.price}</small>
  </h2>
</article>
`;
}

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
            return itemTemplate(product);
      }).join('');
      console.log(response);
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  getData(API);
}


const loadDataPagination = (offset=5, limit=paginationlimit) => {
  localStorage.setItem('pagination', offset);
  offset = `?offset=${offset}&limit=${limit}`
  getData(API+offset);
}


const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadDataPagination(parseInt(localStorage.getItem('pagination'))+paginationlimit);
    }
   })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
