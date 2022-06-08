const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const limit = 10;

function setPagination(){
  let pagination;
  if(localStorage.getItem('pagination') === null){
    pagination = 5;
  }else{
    pagination = Math.trunc(localStorage.getItem('pagination')) + limit;
  }
  localStorage.setItem('pagination', pagination);
  return pagination;
}

const getData = api => {
  const pagination = setPagination();
  fetch(`${api}?offset=${pagination}&limit=${limit}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      console.log(products);
      let output = products.map(product => {
        // template
      });
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

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
