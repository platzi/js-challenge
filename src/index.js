const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

let isMore = true;
let isFirst = true;
let isLoading = false;
localStorage.setItem('pagination', 0)

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
    newItem.classList.add('Items');
    newItem.innerHTML = output.join('');
    $app.appendChild(newItem);
  } catch (error) {
    console.log(error)
  }

  if (!isMore){
    intersectionObserver.disconnect()
    let newItem = document.createElement('p');
    newItem.style = "text-align:center";
    newItem.innerHTML = 'Todos los productos Obtenidos'
    $app.appendChild(newItem)
  }
}

const loadData = async (start) => {
  await getData(`${API}?offset=${start}&limit=10`);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  if (entries[0].isIntersecting){
    let page = parseInt(localStorage.getItem('pagination'))
    let newPage = page != 0 ? page + 10 : 5
    localStorage.setItem('pagination', newPage)
    loadData(newPage).finally(() => { isLoading = false; })
  }

}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
