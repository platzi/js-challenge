const $app = document.getElementById('app');
const $items = document.getElementById('Items');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let $offset = 5;
const $limit = 10;
const RESULT_COUNT = 200;

localStorage.removeItem("pagination");

const updateLocalStorage = () => {
  if (localStorage.getItem('pagination')) {
    $offset = parseInt(localStorage.getItem('pagination'));
    if ($offset >= RESULT_COUNT) {
      $offset = 190;
      intersectionObserver.unobserve($observe);
    } else {
      $offset += $limit;
      if ($offset >= RESULT_COUNT) {
        intersectionObserver.unobserve($observe);
      }
    }
  }
  localStorage.setItem('pagination', $offset);
  return `?offset=${$offset}&limit=${$limit}`;  
}

const validateAllShowedItems = () => {
  if (localStorage.getItem('pagination')) {
    $offset = parseInt(localStorage.getItem('pagination'));
    if ($offset >= RESULT_COUNT) {
      return true;
    }
    return false;
  }
}

const getData = api => {
  let $pagination = updateLocalStorage();
  fetch(api + $pagination)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return `
          <article class="Card">
            <img src="${product.images[0]}" />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
        `;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      if (validateAllShowedItems()) {
        let message = document.createElement('section');
        message.innerHTML = '<p>Todos los productos Obtenidos</p>';
        $observe.appendChild(message);
      }
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  let promise = await getData(API);
  return promise;
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
