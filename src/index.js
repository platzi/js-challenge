const $app = document.getElementById('app')
const $Items = document.getElementsByClassName('Items')[0]
const $End = document.getElementsByClassName('End')[0]
const $observe = document.getElementById('observe')
const API = 'https://api.escuelajs.co/api/v1/products'

const getData = (api) => {
    fetch(
        `${api}?offset=${parseInt(
            localStorage.getItem('pagination')
        )}&limit=${10}`
    )
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            let products = response
            products.forEach((product) => {
                console.log({ product })
                let newItem = document.createElement('section')
                newItem.classList.add('Item')
                newItem.innerHTML = `
                
                <article class="Card">
                <img src="${product.images[0]}" alt="${product.description}" />
                <h2>
                  ${product.title}
                  <small>$ ${product.price}</small>
                </h2>
              </article>
              `

                $Items.appendChild(newItem)
            })
        })
        .catch((error) => console.log(error))
}

const loadData = async () => {
    await getData(API)
}

const intersectionObserver = new IntersectionObserver(
    async (entries, observer) => {
        if (entries[0].isIntersecting) {
            let offset = localStorage.getItem('pagination')
            if (offset) {
                offset = parseInt(offset)
                if (offset < 20) {
                    localStorage.setItem('pagination', offset + 10)
                    await loadData()
                } else {
                    let endDiv = document.createElement('section')

                    console.log({ endDiv })
                    endDiv.classList.add('End')
                    endDiv.innerHTML = `<h2>Todos los productos obtenidos</h2>`

                    $End.appendChild(endDiv)
                    observer.unobserve(entries[0].target)
                }
            } else {
                offset = 5
                localStorage.setItem('pagination', offset)
                await loadData()
            }
        }
    },
    {
        root: null,
        rootMargin: '0px 0px 100% 0px',
        threshold: 0
    }
)
localStorage.clear()
intersectionObserver.observe($observe)
