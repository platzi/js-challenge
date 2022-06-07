const $app = document.getElementById('app')
const $observe = document.getElementById('observe')
const API = 'https://api.escuelajs.co/api/v1/products'

const STEPS = 10
const globalState = window.localStorage

const initGlobalState = () => {
  if (globalState.getItem('initialState') == null) {
    globalState.setItem('initialState', '4')
  }
}

const valueStorage = () => {
  loadData()
  let paginationSteps = Number(globalState.getItem('initialState')) + STEPS

  globalState.setItem('initialState', paginationSteps.toString())
}

const addCards = (filtred) => {
  let cardsFiltered = filtred.map((product) => {
    return `<article class="Card">
    <img src="${product.category.image}" alt="${product.category.name}" />
    <h2>
    ${product.title}
      <small>$ ${product.price}</small>
    </h2>
  </article>`
  })
  return cardsFiltered.join('')
}

const getData = (api) => {
  // initial states
  let INITIAL_STATE = Number(globalState.getItem('initialState'))
  let pagination = INITIAL_STATE + STEPS

  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response
      let output = products.slice(INITIAL_STATE, pagination)

      let newItem = document.createElement('section')
      newItem.classList.add('Items')
      newItem.innerHTML = addCards(output)
      $app.appendChild(newItem)
    })
    .catch((error) => console.log(error))
}

const loadData = () => {
  getData(API)
}

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    const entry = entries[0]
    // implementation infinity scroll
    if (entry.isIntersecting) {
      valueStorage()
    }
  },
  {
    rootMargin: '0px 0px 100% 0px',
  },
)

initGlobalState()

intersectionObserver.observe($observe)
