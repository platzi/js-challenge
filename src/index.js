const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products?offset=_OFFSET_&limit=10';

let getData = url => {
  return new Promise((resolve, reject) => {
    fetch(url).then(response => response.json()).then(response => {
      resolve(response);
    }).catch(error => reject(error));
  })
}


let loadNextData = async () => {
  localStorage.setItem('pagination', parseInt(localStorage.getItem('pagination')) + 10);
  let url = API.replace('_OFFSET_', localStorage.getItem('pagination'));
  await getData(url).then(response => {
    addChilds(response);
   })
    .catch(error => console.log(error));
 }

addChilds = (products) => {
  let newItem = document.getElementById('Products');
  products.map(product => {
    let newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'Card');
    newDiv.innerHTML =
      `
        <img src="${product.images[0]}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>Precio: $${product.price}</p>
    `;
    newItem.appendChild(newDiv);
  });
}

let loadData = async () => {
  localStorage.setItem('pagination', 4);
  let url = API.replace('_OFFSET_', localStorage.getItem('pagination'));
  let newItem = document.createElement('div');
  newItem.setAttribute('id', 'Products');
  newItem.setAttribute('class', 'Items');
  $app.appendChild(newItem);
  await getData(url).then(response => {
    addChilds(response);
  })
    .catch(error => console.log(error));
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadNextData();
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

loadData();