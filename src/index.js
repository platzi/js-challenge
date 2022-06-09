const $app = document.getElementById('app')
const $observe = document.getElementById('observe')
const API = 'https://api.escuelajs.co/api/v1/products'
const limit = 10
let offset = 5 // posicion inicial segun el enunciado
localStorage.setItem('pagination', offset)

/** FETCH y CONSTRUCCION de los datos */

const loadData = () => {
    getData(API)
}

const getData = async (api) => {
    try {
        // Fetch
        let pag = parseInt(localStorage.getItem('pagination'))

        const response = await fetch(`${api}?offset=${pag}&limit=${limit}`)
        const products = await response.json()

        // Si no hay mas, muestro el mensaje y elimino el observer
        if (!products.length) {
            alert('Todos los productos obtenidos')
            intersectionObserver.unobserve($observe)
        }

        // Construccion de las cartas para mostrar los nuevos datos
        let output = products
            .map((product) => {
                return createProduct(product)
            })
            .join('')
        let newItem = document.createElement('section')
        newItem.classList.add('Item')
        newItem.innerHTML = output
        $app.appendChild(newItem)

        // Actualización del Local Storage
        pag += limit
        localStorage.setItem('pagination', pag)
    } catch (error) {
        console.log('Error fetching data', error)
    }
}

const createProduct = (productInfo) => {
    return `
    <article class="Card">
      <img src='${productInfo.images[0]}' alt='${productInfo.title}: ${productInfo.description}'/>
      <h2>
        ${productInfo.title}
        <small>$${productInfo.price}</small>
      </h2>
    </article>
    `
}

/** OBSERVER para el scrolling */
const onIntersect = ([entry]) => {
    if (entry.isIntersecting) {
        loadData()
    }
}

const intersectionObserver = new IntersectionObserver(onIntersect, {
    rootMargin: '0px 0px 100% 0px',
})

intersectionObserver.observe($observe)
