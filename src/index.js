const $app = document.getElementById('app')
const $observe = document.getElementById('observe')
const API = 'https://api.escuelajs.co/api/v1/products'

const getData = async (api) => {
  try {
    const response = await fetch(api)
    const products = await response.json()
    renderProducts(products)
  } catch (error) {
    console.log(error)
  }
}

const dataPage = async (pagination) => {
  const params = getUrlParams(pagination)
  const url = `${API}?${params}`
  await getData(url)
}

const getUrlParams = (pagination) => {
  const searchParams = new URLSearchParams()
  searchParams.append('offset', pagination)
  searchParams.append('limit', 10)

  localStorage.setItem('pagination', JSON.stringify(pagination))

  return searchParams.toString()
}

const renderProducts = (products) => {
  products.map(cardTemplate)
  const lastProductExist = products.find((product) => product.id === 200)

  if (lastProductExist) {
    renderFinalMessage()

    intersectionObserver.disconnect()
  }
}

const renderFinalMessage = () => {
  const main = document.querySelector('.Main')
  const footer = document.createElement('footer')
  const p = document.createElement('p')
  p.innerText = 'Todos los productos'
  footer.appendChild(p)
  main.appendChild(footer)
}

const cardTemplate = ({ title, price, images }) => {
  let chooseImage = Math.round(Math.random() * 2)
  const selectedImage = images[chooseImage]

  let card = `<article class="Card">
    <img src="${selectedImage}" loading="lazy" />
    <h2>
      ${title}
      <small>$ ${price}</small>
    </h2>
    </article>`

  let newItem = document.createElement('section')
  newItem.classList.add('Item')
  newItem.innerHTML = card

  $app.appendChild(newItem)
}

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const paginationStorage = JSON.parse(localStorage.getItem('pagination'))
        const pagination = paginationStorage
          ? parseInt(paginationStorage) + 10
          : 5

        dataPage(pagination)
      }
    })
  },
  {
    rootMargin: '0px 0px 100% 0px',
  },
)

intersectionObserver.observe($observe)

window.onbeforeunload = function () {
  localStorage.clear()
}
