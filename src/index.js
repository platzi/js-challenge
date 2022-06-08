const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

//Initial Values for the pagination/API petition
const limit = 10
const initialOffset = 5

//init the local storage, althought the local storage is deleted by reload or close the browser, the pagination will be reseted with this line
localStorage.setItem('offset', initialOffset);

//Get the data from the API
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

//Function that will be called when the user scrolls the page, and set the new pagination on localStorage 
const loadData = async () => {
  await getData(`${API}/?limit=${limit}&offset=${localStorage.getItem('offset')}`);

  const newPagination = parseInt(localStorage.getItem('offset')) + limit;
  localStorage.setItem('offset', newPagination); 
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


//to delete the localStorage when the user reload the page or close the browser
window.addEventListener("beforeunload", function (e) {
  const confirmationMessage = "\o/";

  (e || window.event).returnValue = confirmationMessage; 
  localStorage.clear();
  return confirmationMessage;                            
});
