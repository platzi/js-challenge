const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

let products = [];

const addContent = async () => {
  let position = JSON.parse(localStorage.getItem("pagination"))
  const res = await fetch(`${API}?offset=${position.offset}&limit=${position.limit}`)
  const data = await res.json()
  products?.push(...data)
  products.map(product => {    
    if(product.id >= 5) {
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = `
      <article class="Card">
        <img
          src=${product.images[0]}
          alt=${product.title}
        />
        <h2>
          ${product.title}
          <small>$${product.price}</small>
        </h2>
      </article>
    `;
      $app.appendChild(newItem);
    }
  })
  position.offset += parseInt(position.limit)
  localStorage.setItem("pagination", JSON.stringify(position))
}

const getData = async api => {
  let position = JSON.parse(localStorage.getItem("pagination"))
  try {
    const res = await fetch(`${api}?offset=${position.offset}&limit=${position.limit}`)
    const data = await res.json()
    return products?.push(...data)
  } catch (error) {
    console.log(error)
  }
}


const loadData = async () => {
  await getData(API);
}

// loadData()
//savePosition
const position = {
  offset: 4,
  limit: 10
}

localStorage.setItem("pagination", JSON.stringify(position))

//observers
const observer = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting) {
    if (products.length > 10) {
      $observe.innerHTML =`
        <article class="Card">
          <h2>
            Todos los productos Obtenidos
          </h2>
        </article>
      `
      toggleObserve()
    } else {
      addContent(products)
    }
  }
}, {
  threshold: 1,
  rootMargin: '0px 0px 100% 0px'
})
observer.observe($observe);
const toggleObserve = () => {
  observer.unobserve($observe)
}

//remove localStorage on close tab
window.addEventListener('beforeunload', () => {
  localStorage.removeItem("pagination")
});