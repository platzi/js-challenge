const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const correct = 5;
const capi = 10;
const total = 200;


const getData = async api => {

  try {
    const res = await fetch(api)
    const items = await res.json()
    createItems(items)
  } 
  catch(err) {
    console.log(err)
  }
}

const loadData = async (pagina) => {

  const apiPagina = setConfiguration(pagina);
  const setAPIpagination = `${API}?${apiPagina}`
  await getData(setAPIpagination);
}

const setConfiguration = (pagina) => {

  const paramConfig = new URLSearchParams()

  paramConfig.append('offset', pagina)
  paramConfig.append('limit', capi)
  localStorage.setItem('pagination', JSON.stringify(pagina))
  return paramConfig.toString();
}

const createItems = (items) => {

  let output = items.map(templateProducts);
  let newItem = document.createElement('section');

  newItem.classList.add('Items');
  newItem.innerHTML = output;
  $app.appendChild(newItem);
  const productsEnd = items.find(item => 
    item.id === total
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
        : correct
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