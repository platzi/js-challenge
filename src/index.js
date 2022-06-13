const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const $lastMsg = document.getElementById('lastMsg');

const MAX_PRODUCTS_LIST = 200;
const MAX_NUM_ITEMS = 10;
const START_ITEM = 1;
let page = 1;
let marginTop = 100;
let loadMoreProducts = false;

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

const itemCard = (item) => {
  return '<article class="Card">' +
  '<img src="' + item.images[0] + '" alt="' + item.description + '"/>' +
    '<h2>' + item.title +
      '<small>$ ' + item.price + '</small>' +
    '</h2>' + 
  '</article>';
}

const getData = async api => {
  fetch(api + `?offset=${startOfQuantity()}&limit=${MAX_NUM_ITEMS}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return product;
      })
      .filter( x => x !== undefined );
      let elements = Object.values(output)
      .map((value) => {
        return itemCard(value);
      })
      .join('');

      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = elements;
      $app.appendChild(newItem);

      loadMoreProducts = true;
      page++;
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0 && endOfQuantity() <= MAX_PRODUCTS_LIST) {
      if (loadMoreProducts) {
        loadMoreProducts = false;
        loadData();
      } 
    } else {
      if (endOfQuantity() > MAX_PRODUCTS_LIST) {
        intersectionObserver.unobserve(entry.target);
        finalMsg();
      }
    }
  });
}, {
  rootMargin: '0px 0px 0px 0px',
});


// const getStorage = () => {
//   let pagination = parseInt(localStorage.getItem('pagination'));
//   if (pagination === null) {
//     localStorage.setItem('pagination', 1);
//   } else {
//     if (MAX_PRODUCTS_LIST < MAX_NUM_ITEMS * pagination + (START_ITEM - 1)) {
//       pagination = 0;
//     }
//     let nextPage = ++pagination; 
//     localStorage.setItem('pagination', nextPage);
//     page = nextPage;
//   }
// }

const finalMsg = () => {
  $lastMsg.classList.add('show');
}

(async function() {
  // getStorage();
  await loadData()
  .then(
    () => {
      intersectionObserver.observe($observe);
    }
  );

})();