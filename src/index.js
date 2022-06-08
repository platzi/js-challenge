const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

//Initial Values for the pagination/API petition
const limit = 10
const initialOffset = 8

//init the local storage 
console.log(sessionStorage.getItem('offset'));
sessionStorage.setItem('offset', initialOffset);

//get the data from the API
const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      console.log(products);
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
        
        //Append Child Elements
        title.append(small);
        cardItem.appendChild(img);
        cardItem.appendChild(title);
        
        return cardItem;
      }
      );

      // Append the fetch petition elements to DOM 
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.append(...output);
      $app.appendChild(newItem);

      // If the petition contains 9 or less elements means that there are no more elements to load so we said it to user and disconnect the scroll event
      if (products.length <= 9) {
        const container = document.createElement('section');
        container.innerText = 'Todos los productos Obtenidos';
        container.classList.add('last-products');
        $app.appendChild(container);
        intersectionObserver.disconnect($observe);

      } 
    })
    .catch(error => console.log(error));
}

//Function that will be called when the user scrolls the page, and set the new pagination on sessionStorage 
const loadData = async () => {
  await getData(`${API}/?limit=${limit}&offset=${sessionStorage.getItem('offset')}`);

  const newPagination = parseInt(sessionStorage.getItem('offset')) + limit;
  sessionStorage.setItem('offset', newPagination); 
}


//intersectionObserver
const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

// Start to observe the element
intersectionObserver.observe($observe);


window.addEventListener("beforeunload", function (e) {
  const confirmationMessage = "\o/";

  (e || window.event).returnValue = confirmationMessage; 
  sessionStorage.clear();
  return confirmationMessage;                            
});

//to erase local storage when the user reload the page
// window.addEventListener('load', () => {
//   sessionStorage.clear();
// })

//to erase local storage when the user close the page
// window.addEventListener('beforeunload', () => {
//   sessionStorage.clear();
// })