const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = async api => {
  try {
    const response = await fetch(api)
    const products = await response.json()
  
    renderProducts(products)
  } catch(error) { 
    console.log(error)
  }
}

const loadData = async (pagination) => {
  const params = getUrlParams(pagination);
  const url = `${API}?${params}`
  await getData(url);
}

const getUrlParams = (pagination) => {
  const searchParams = new URLSearchParams()
  searchParams.append('offset', pagination)
  searchParams.append('limit', 10)

  localStorage.setItem('pagination', JSON.stringify(pagination))

  return searchParams.toString();
}

const renderProducts = (products) => {
  let output = products.map(getProductTemplate);
  let newItem = document.createElement('section');
  newItem.classList.add('Item');
  newItem.innerHTML = output;
  
  $app.appendChild(newItem);

  const isLastProduct = products.find(product => product.id === 200)

  if(isLastProduct) {
    renderFinalMessage();

    intersectionObserver.disconnect()
  }
}

const renderFinalMessage = () => {
  const wrapperMain = document.querySelector('.Main')
  const footer = document.createElement('footer')
  const p = document.createElement('p')
  p.innerText = 'Todos los productos Obtenidos'

  footer.appendChild(p)
  wrapperMain.appendChild(footer)
}

const getProductTemplate = ({title, price, images}) => {
  const firstImage = images[0]

  return `<article class="Card">
    <img src="${firstImage}" loading="lazy" />
    <h2>
      ${title}
      <small>$ ${price}</small>
    </h2>
    </article>`
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
        const paginationStorage = JSON.parse(localStorage.getItem('pagination'))
        const pagination = paginationStorage ? parseInt(paginationStorage) + 10 : 5

        loadData(pagination)
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.onbeforeunload = function(){
  localStorage.clear()
}

