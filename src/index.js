const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const correction = 5;
const cap = 10;
const total = 200;

const getData = async api => {

  try {
    const res = await fetch(api)
    const products = await res.json()
    createProduct(products)
  } 
  catch(err) {
    console.log(err)
  }
}

const loadData = async (pagination) => {

  const apiPagination = setConfiguration(pagination);
  const setAPIpagination = `${API}?${apiPagination}`
  await getData(setAPIpagination);
}

const setConfiguration = (pagination) => {

  const paramConfig = new URLSearchParams()

  paramConfig.append('offset', pagination)
  paramConfig.append('limit', cap)
  localStorage.setItem('pagination', JSON.stringify(pagination))
  return paramConfig.toString();
}

const createProduct = (products) => {

  let output = products.map(templateProducts);
  let newItem = document.createElement('section');

  newItem.classList.add('Items');
  newItem.innerHTML = output;
  $app.appendChild(newItem);
  const productsEnd = products.find(product => 
    product.id === total
  )

  if(productsEnd) {
    const mainContainer = document.querySelector('.Main')
    const lastContainer = document.createElement('footer')
    const textContainter = document.createElement('p')

    textContainter.innerText = 'Todos los productos obtenidos.'
    lastContainer.appendChild(textContainter)
    mainContainer.appendChild(lastContainer)
    intersectionObserver.disconnect()
  }
}


const templateProducts = ({title, price, images}) => {
  return `
    <article class="Card">
      <img src="${images}[0]" alt="${title}" loading="lazy" />
      <h2>
        ${title}
        <small>$ ${price}</small>
      </h2>
    </article>
  `
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
        const savePagination = JSON.parse(localStorage.getItem('pagination'))
        const pagination = savePagination 
        ? parseInt(savePagination) + cap 
        : correction
        loadData(pagination)
    }
  });
}, 
{
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.onbeforeunload = function(){
  localStorage.clear()
}