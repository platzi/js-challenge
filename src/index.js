const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage.clear()

const getData =async (api, offset) => {
  const response = await fetch(`${api}?offset=${offset}&limit=10`)
  const data = await response.json()
  const products = data
  
  localStorage.setItem('pagination', offset)

  try {
    let output = products.map(product => {
      return `
        <article class="Card">
          <img src=${product.images[0]} />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>
      `
    })
    let newItem = document.createElement('section')
    newItem.classList.add('Items')
    newItem.innerHTML = output
    $app.appendChild(newItem)
  } catch (err) {
    console.error(err)
  }

  if(products.length < 10) {
    let mssg = document.createElement('h2')
    mssg.classList.add('mssg')
    mssg.innerText = 'Todos los productos Obtenidos'
    $app.appendChild(mssg)

    intersectionObserver.disconnect()
  }
}

const loadData = async (offset) => {
  await getData(API, offset);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      let storage = localStorage.getItem('pagination')
      let offset = storage ? parseInt(storage) + 10 : 5

      loadData(offset)
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
