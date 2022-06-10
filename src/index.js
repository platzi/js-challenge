const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

// page setup
const initialProductIndex = 5;
const resultsPerPage = 10;
let currentPage;


const getData = (api) => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const [initialIndx,finalIndx] = calculateNextPageIndexes(currentPage,resultsPerPage,initialProductIndex);
      let products = response.slice(initialIndx,finalIndx);
      let output = products.map(product => {
      let itemHTML = `<article class="Card">
        <img src="${product.images[0]}" alt="${product.description}"/>
        <h2>
          ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>`;

      let newItem = document.createElement('div');
      newItem.classList.add('Item');
      newItem.innerHTML = itemHTML;
      return newItem;
      });
      let productsContainer = document.createElement('div');
      productsContainer.classList.add('Items');
      output.forEach(elem => productsContainer.appendChild(elem));
      $app.appendChild(productsContainer);
    })
    .catch(error => console.log(error));

}

const loadData = async () => {
  getData(API);
}

const calculateNextPageIndexes = (pageShown,resultsPerPage,initialOffset) => {
  const nextPage = pageShown+1;
  return [pageShown*resultsPerPage+initialOffset,nextPage*resultsPerPage+initialOffset];
}

const calculatePrevPageIndexes = (pageShown,resultsPerPage,initialOffset) => {
  let previusPage = pageShown-1;
  if(previusPage<0) previusPage=0;
  return [previusPage*resultsPerPage+initialOffset,pageShown*resultsPerPage+initialOffset];
}

const isObjectIntersecting = (entryObject) => {
  return entryObject.isIntersecting;
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.filter(isObjectIntersecting).forEach(objectIntersected => {
    if(currentPage!=undefined){
      currentPage=currentPage+1;
    }else{
      currentPage=0;
    }
    loadData();
  });
}, {
  rootMargin: '0px 0px 100% 0px'
});

// RUN
intersectionObserver.observe($observe);