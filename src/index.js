const $app = document.getElementById('app')
const $observe = document.getElementById('observe')
const API = 'https://api.escuelajs.co/api/v1/products'
const limit = 10
let offset = 5 // posicion inicial segun el enunciado
localStorage.setItem('pagination', offset)

const loadData = () => {
    getData(API)
}

const getData = (api) => {
    const pag = localStorage.getItem('pagination')
    fetch(`${api}?offset=${pag}&limit=${limit}`)
        .then((response) => response.json())
        .then((response) => {
            let products = response
            let output = products
                .map((product) => {
                    return createProduct(product)
                })
                .join('')
            let newItem = document.createElement('section')
            newItem.classList.add('Item')
            newItem.innerHTML = output
            $app.appendChild(newItem)
        })
        .catch((error) => console.log(error))
    localStorage.setItem('pagination', offset + limit)
    console.log('asd')
}

const createProduct = (productInfo) => {
    return `
    <article class="Card">
      <img src='${productInfo.images[0]}' alt='${productInfo.title} img'/>
      <h2>
        ${productInfo.title}
        <small>$${productInfo.price}</small>
      </h2>
    </article>
    `
}

const onIntersect = ([entry]) => {
    if (entry.isIntersecting) {
        console.log('Loading data')
        offset += limit
        loadData()
    }
}

const intersectionObserver = new IntersectionObserver(onIntersect, {
    rootMargin: '0px 0px 100% 0px',
})

intersectionObserver.observe($observe)
