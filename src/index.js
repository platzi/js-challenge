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

const valueStorage = async () => {
  await loadData()
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

const detectRefreshPage = () => {
  if (window.performance.navigation.type == 1) {
    globalState.removeItem('initialState')
  }
}

const detectClosePage = () => {
  window.addEventListener('beforeunload', (e) => {
    globalState.removeItem('initialState')
  })
}

const getData = async (api) => {
  // initial states
  let INITIAL_STATE = Number(globalState.getItem('initialState'))
  let pagination = INITIAL_STATE + STEPS

  await fetch(api)
    .then((response) => response.json())
    .then((response) => {
      let products = response
      let output = products.slice(INITIAL_STATE, pagination)
      // alert when all products returned
      if (output.length === 0) {
        intersectionObserver.unobserve($observe)
        alert('Todos los productos Obtenidos')
      }

      let newItem = document.createElement('section')
      newItem.classList.add('Items')
      newItem.innerHTML = addCards(output)
      $app.appendChild(newItem)
    })
    .catch((error) => console.log(error))
}

const loadData = async () => {
  await getData(API)
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

detectRefreshPage()
detectClosePage()
initGlobalState()

intersectionObserver.observe($observe)
