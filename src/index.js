const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage = window.localStorage;


const getData = async api => {
  let stored = localStorage.getItem('pagination');

  let suma = parseInt(stored) + 10;
  localStorage.getItem('pagination') ?
  localStorage.setItem('pagination', suma) :
  localStorage.setItem('pagination', 5);

  await fetch(api + `?offset=${localStorage.getItem('pagination')}&limit=10`)
    .then(response => response.json())
    .then(response => {
      let products = response;

      let output = products.map(product => {
        return {
          id: product.id,
          images: product.images,
          title: product.title,
          price: product.price
        };
      });

      let items = document.createElement('section');
      items.classList.add('Items');

      for (let index = 0; index < output.length; index++) {
        const product = output[index];

        let newArticle = document.createElement('article');
        newArticle.classList.add('Card');
        
        const img = document.createElement("img");
        img.src = product.images[0];

        const h2 = document.createElement("h2");
        h2.innerHTML = product.title;

        const small = document.createElement("small");
        small.innerHTML =`$ ${product.price}`;

        h2.appendChild(small);
        
        newArticle.appendChild(img);
        newArticle.appendChild(h2);
        items.appendChild(newArticle);
        
      }
      $app.appendChild(items);
    })

    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API);
}

function infiniteScroll(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (localStorage.getItem('pagination') < 200){
       
        loadData();}
      else {
        console.log(2)
        localStorage.clear()
        loadData()
      }  
    }
    else {
      console.log(3)
      loadData();
    }
  });
}

let firstRender;
function handleIntersect(entries, observer) {
  console.log(localStorage.getItem('pagination'))
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (!localStorage.getItem('pagination')) {
        firstRender = true;
        loadData();
      }
      else if (localStorage.getItem('pagination') < 175)
        loadData();
      else { 
        // Entra si hay 175 elementos renderizados (pongo este límite ya que a partir de este número hay productos inválidos en la api)
        alert('Todos los productos Obtenidos');
        intersectionObserver.disconnect();
      }  
    }
    else if (!firstRender)
      loadData();
  });
}


window.onload = () => {
  localStorage.clear()
};


const intersectionObserver = new IntersectionObserver(handleIntersect, {
  rootMargin: '0px 0px 100% 0px',
  threshold: 1.0
});

intersectionObserver.observe($observe);