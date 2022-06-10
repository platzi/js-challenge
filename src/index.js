const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const MAX_PRODUCTS_LIST = 200;
const MAX_NUM_ITEMS = 10;
const START_ITEM = 5;
let page = 1;
let marginTop = 100;

/**
 * Returns the index of the first product according to the page number
 * @returns A number
 */
const startOfQuantity = () => {
  if (page < 2) {
    return START_ITEM - 1;
  }
  else {
    return MAX_NUM_ITEMS * (page - 1) + (START_ITEM - 1);
  }
} 

/**
 * Returns the index of the last product according to the page number
 * @returns 
 */
const endOfQuantity = () => {
  return MAX_NUM_ITEMS * page + (START_ITEM - 1);
}

const getData = async api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map((product, index) => {
        if (index >= startOfQuantity() && index < endOfQuantity()) {
          return product.title;
        }
      })
      .filter( x => x !== undefined );
      console.log(Object.values(output));
      let elements = Object.values(output).map((value) => {
        let div = '<div>' + value + '</br></div>';
        return div;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = elements;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      $observe.style.marginTop = (marginTop += 100) +"px"
    }
  });
}, {
  rootMargin: '0px 0px 0px 0px',
});


const getStorage = () => {
  let pagination = parseInt(localStorage.getItem('pagination'));
  if (pagination === null) {
    localStorage.setItem('pagination', 1);
  } else {
    if (MAX_PRODUCTS_LIST < MAX_NUM_ITEMS * pagination + (START_ITEM - 1)) {
      pagination = 0;
    }
    let nextPage = ++pagination; 
    localStorage.setItem('pagination', nextPage);
    page = nextPage;
  }
}

(async function() {
  getStorage();
  await loadData()
  .then(
    () => {
      intersectionObserver.observe($observe);
    }
  );

})();