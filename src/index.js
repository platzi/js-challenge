const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

let isMore = true;
let isFirst = true;

const getData = async api => {

  try {
    const response = await fetch(api).then(response => response.json())
    products = response;

    isMore = products.length === 10
  
    let output = products.map(product => {
      const card = `
        <article class="Card">
          <img src="${product.images[0]}" alt="${product.title}" title="${product.title}">
          <h2>
            ${product.title}
            <small>${product.price}</small>
          </h2>
        </article>
      `
      return card;
      // template
    });
    let newItem = document.createElement('section');
    newItem.classList.add('Item');
    newItem.innerHTML = output.join('');
    $app.appendChild(newItem);
  } catch (error) {
    console.log(error)
  }

  if (!isMore) intersectionObserver.disconnect()
}

const loadData = async (page) => {
  let start = page * 10 + 5
  getData(`${API}?offset=${start}&limit=10`);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  let page = 0;
  if(localStorage.getItem('page') !== null && !isFirst){
    page = parseInt(localStorage.getItem('page'))
  }
  loadData(page)
  localStorage.setItem('page', `${page + 1}`)
  isFirst = false;
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
