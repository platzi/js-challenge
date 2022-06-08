const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

var solutionObject = {
  clearStorage: (() => localStorage.clear())(),
  paginationAPI: () => {    
    const limit = 10;
    const initOffset = 5;
    const pagination =  localStorage.getItem('pagination');
    const offset = pagination ? parseInt(pagination) + limit : initOffset;
    localStorage.setItem('pagination', offset);
    return `${API}?offset=${offset}&limit=${limit}`;  
  },
  templateCardHTML: ({images, title, price}) => {
    return  `<article class="Card">
               <img src="${images[0]}" />
               <h2>${title}<small>$ ${price}</small></h2>
             </article>`
   },
   validatePagination : (callBack) => {    
     const pagination = localStorage.getItem('pagination');
    if(pagination && parseInt(pagination) > 200) {
      intersectionObserver.unobserve( $observe);
      alert('Todos los productos Obtenidos');      
    } else {
      callBack();
    }
   }
}

const getData = api => {  
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return solutionObject.templateCardHTML(product);
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output.join("");
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {  
  await getData(solutionObject.paginationAPI());
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    solutionObject.validatePagination(loadData);
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
