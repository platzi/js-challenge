const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const limit = 10
let offset = 4
const storage = localStorage.getItem('offset');



const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      let products = response;

      let output = products.map(product => {
        
        //cardItemElement
        const cardItem = document.createElement('article');
        cardItem.classList.add('Card');
        
        //Child Elements
        const img = document.createElement('img');
        const title = document.createElement('h2');
        const small = document.createElement('small');

        //Child Properties
        img.src = product.images[0];
        title.innerText = product.title;
        small.innerText = `$${product.price}`;

        //Append Childs
        cardItem.appendChild(img);
        cardItem.appendChild(title);
        cardItem.appendChild(small);
        
        return cardItem;
      });

      console.log(output);

      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.append(...output);
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  getData(`${API}/?limit=${limit}&offset=${offset}`);
  localStorage.setItem('offset', offset);
  console.log({storage});
  offset += limit;
  localStorage.setItem('offset', offset);
  console.log({storage});
}

loadData();

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
