const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products?offset=_OFFSET_&limit=10';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let newItem = document.createElement('div');
      newItem.setAttribute('id', 'Products');
      products.map(product => {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = 
         `
          <div>
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p>${product.price}</p>
          </div>
        `
        newItem.appendChild(newDiv);
      });
      newItem.classList.add('Item');
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

function getNextData(url) { 
  fetch(url)
  .then(response => response.json())
  .then(response => {
    return response;
  })
  .catch(error => console.log(error));
}

const loadNextData = () => { 
  console.log("preuba")
  localStorage.setItem('pagination', parseInt(localStorage.getItem('pagination') )+ 10);
  let url = API.replace('_OFFSET_', localStorage.getItem('pagination'));
  fetch(url)
  .then(response => response.json())
    .then(response => {
      let products = response;
      let newItem = document.getElementById('Products');
      console.log("hola",newItem)
      products.map(product => {
        let newDiv = document.createElement('div');
        newDiv.innerHTML =
          `
          <div>
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p>${product.price}</p>
          </div>
        `;
        console.log(1);
        newItem.appendChild(newDiv);
      });
      console.log("chao",newItem)
  })
  .catch(error => console.log(error));
}

const loadData = () => {
  localStorage.setItem('pagination', 4);
  let url = API.replace('_OFFSET_', localStorage.getItem('pagination'));
  getData(url);
}


const range = (start, stop, step) =>{
  var a = [start], b = start;
  while (b < stop) {
      a.push(b += step || 1);
  }
  return a;
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      loadNextData();
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

loadData();