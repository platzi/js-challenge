const $app = document.getElementById('app')
const $observe = document.getElementById('observe')
const API = 'https://api.escuelajs.co/api/v1/products'
const START_ITEM = 5
const ITEMS_PER_PAGE = 10

function getPagination() {
  return Number(localStorage.getItem('pagination')) || 0
}

function setPagination(page) {
  localStorage.setItem('pagination', page)
}

function makeProduct(product) {
  return `
    <article class="Card">
      <img src="${product.images[0]}" />
      <h2>
        ${product.title}
        <small>$ ${product.price}</small>
      </h2>
    </article>
  `
}

async function getData(api) {
  const params = new URLSearchParams()

  params.set('offset', START_ITEM + ITEMS_PER_PAGE * getPagination())
  params.set('limit', ITEMS_PER_PAGE)

  const res = await fetch(`${api}?${params.toString()}`)
  const productsData = await res.json()

  if (!productsData.length) {
    const end = document.createElement('p')

    end.textContent = 'Todos los productos Obtenidos'
    $app.appendChild(end)

    intersectionObserver.disconnect()
  } else {
    const products = productsData.map(makeProduct)
    const newItem = document.createElement('section')
    const pageProducts = products.join('')

    newItem.classList.add('Items')
    newItem.innerHTML = pageProducts

    $app.appendChild(newItem)
    setPagination(getPagination() + 1)
  }
}

async function loadData() {
  try {
    await getData(API)
  } catch (err) {
    console.log(err)
  }
}

const intersectionObserver = new IntersectionObserver(
  ([data]) => {
    if (data.isIntersecting) {
      loadData()
    }
  },
  {
    rootMargin: '0px 0px 100% 0px',
  },
)

intersectionObserver.observe($observe)
setPagination(0)
