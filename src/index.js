const $app = document.getElementById('app')
const $observe = document.getElementById('observe')
const API = 'https://api.escuelajs.co/api/v1/products'
let page = 0
const productsArray = []

const nextPage = () => {
  page += 1
  loadData(page)
}

const createElements = () => {
  let newItem = document.createElement('section')
  newItem.classList.add('Item')
  newItem.id = 'section'
  $app.appendChild(newItem)
}

createElements()

const getData = async (page, limit, prev_offset) => {
  try {
    const pagination = localStorage.getItem('pagination') | 0
    const offset = !prev_offset ? 5 : prev_offset + limit
    const res = await fetch(
      `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
    )
    const data = await res.json()
    if (data.length > 0) {
      const products = data
      getProducts(products)
      localStorage.setItem('pagination', page)
    } else {
      intersectionObserver.disconnect()
      let newItem = document.createElement('footer')
      newItem.classList.add('Footer')
      newItem.innerHTML = 'Todos los productos Obtenidos'
      $app.appendChild(newItem)
    }
  } catch (error) {
    console.log(error)
  }
}

const getProducts = (products) => {
  products.map((product) => {
    if (!productsArray.find((item) => item.id === product.id)) {
      productsArray.push(product)
      setProducts(product)
    }
  })
}

const setProducts = (product) => {
  const section = document.getElementById('section')

  const newCard = document.createElement('article')
  newCard.classList.add('Card')
  section.appendChild(newCard)

  const newImg = document.createElement('img')
  newImg.setAttribute('src', product.images[0])
  newImg.setAttribute('alt', 'product image')
  newCard.appendChild(newImg)

  const newTitle = document.createElement('h2')
  newTitle.innerHTML = product.title
  newCard.appendChild(newTitle)

  const newPrice = document.createElement('small')
  newPrice.innerHTML = `$ ${product.price}`
  newTitle.appendChild(newPrice)
}

const loadData = (page = 1, limit = 10) => {
  getData(page, limit, productsArray.length)
}

const beforeUnloadListener = () => {
  localStorage.removeItem('pagination')
}

window.addEventListener('beforeunload', beforeUnloadListener)

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        nextPage()
      }
    })
  },
  {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  }
)

intersectionObserver.observe($observe)
