const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const paginationlimit = 10;
let paginationOffset = 5;
let isLeaving = false;
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
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  getData(API);
}


const loadDataPagination = async (offset=5, limit=paginationlimit) => {
  page = `?offset=${offset}&limit=${limit}`
  getData(API+page);
  localStorage.setItem('pagination', paginationOffset);
  paginationOffset = paginationOffset + paginationlimit;
}


const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadDataPagination(offset=paginationOffset);
      isLeaving = true;
      console.log('Intersecting '+localStorage.getItem('pagination'));
    }
    else if (isLeaving){
      isLeaving = false;
      console.log('Leaving '+localStorage.getItem('pagination'));
    }
   })
}, {
  threshold: [1.0],
  rootMargin: '0px 0px 100% 0px',
  delay: 100
});

localStorage.clear();
localStorage.setItem('pagination', 5);
//loadDataPagination();

intersectionObserver.observe($observe);

