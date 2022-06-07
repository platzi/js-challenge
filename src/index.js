const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const $allProducts = document.getElementById('allProducts');
const API = 'https://api.escuelajs.co/api/v1/products';
localStorage.clear();

const getData = (async(api,offset) => {
  offset==null?offset=5:offset;
  const response = await fetch(`${api}?offset=${offset}&limit=10`);
  const result = await response.json();
  localStorage.setItem('pagination',offset);
      let products = result;
      let output = products.map((product)=> {
        if (product.category.image!=null) {
          return `<article class="Card">
          <img src="${product.category.image}" />
          <h2>
            ${product.title}
            <small>${product.price}</small>
          </h2>
          </article>`
        }        
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);

    if(result[result.length-1].id > 199) {
      $allProducts.style.display = 'block';
      intersectionObserver.disconnect();
    }
});

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(
 async(entries) =>{ 
   entries.forEach(entry => {
      if (entry.isIntersecting) {
        const actualPagination =localStorage.getItem('pagination');
        const offset = (actualPagination!=null)? Number(actualPagination)+10 : 5;
        getData(API,offset);
      }
    });
  },
  {
    rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
