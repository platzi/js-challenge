const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const PAGINATION = "pagination";

//clear localstorage before close tab
window.onbeforeunload = function() {
  localStorage.removeItem(PAGINATION);
  return;
}

const getProductCardElement = product =>{
    let productTemplate = document.querySelector("#productId");
    let h2 = productTemplate.content.querySelector("h2");
    h2.firstChild.nodeValue = product.title;

    let priceElement = productTemplate.content.querySelector("small");
    priceElement.innerText = `$ ${product.price}`

    let imgElement = productTemplate.content.querySelector("img")
    imgElement.src = product.images[0]

    return document.importNode(productTemplate.content, true);
}

const checkIfThereAreNoMoreProducts = products => {
    if (Array.isArray(products) && products.length) {
        let cards = document.querySelectorAll(".Card");
        var last = cards[cards.length- 1];

        console.log("lastItem")
        console.log(last)
        lastItemObserver.observe(last);
    }else{
        lastItemObserver.disconnect()  // destroy observer
        alert("Todos los productos Obtenidos");
        localStorage.removeItem(PAGINATION);
    }
}

const getData = async api => {

  let paginationStr = localStorage.getItem(PAGINATION);
  let pagination;
  if(paginationStr == undefined || paginationStr == 0){
    pagination = 5;
  }else{
    pagination = parseInt( paginationStr );
    pagination += 10
  }

  const limit = 10
  await fetch(api +  `?offset=${pagination}&limit=${limit}`)
    .then(response => response.json())
    .then(response => {
      localStorage.setItem(PAGINATION, pagination);
      let products = response;
      let newSection = document.createElement('section');
      let output = products.map(product => {
          productElement = getProductCardElement(product)
          newSection.appendChild(productElement);
      });
      newSection.classList.add('Items');
      $app.appendChild(newSection);
      checkIfThereAreNoMoreProducts(products)
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API);
}

const lastItemObserver = new IntersectionObserver(
    async entries => {
        const lastItem = entries[0]
        if(!lastItem.isIntersecting) return
        lastItemObserver.unobserve(lastItem.target);
        loadData();
   },
   {
  rootMargin: "0px 0px 0px 0px",
  threshold: 0.9,
});

loadData()
