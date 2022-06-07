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
      newItem.classList.add('Item')
      newItem.innerHTML = output
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
