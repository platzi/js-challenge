const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
localStorage.clear('pagination');

const limit = 10;

const getData = async (api) => {
  const offsetSt = localStorage.getItem('pagination') == null ? 5 : parseInt(localStorage.getItem('pagination')) + limit 

  localStorage.setItem('pagination', offsetSt);

  console.log(offsetSt)
  if(offsetSt <= 200) {
    try {
      const response = await fetch(`${api}?offset=${offsetSt}&limit=${limit}`); 
      const products = await response.json();
      console.log(products)
      let output = products.map(product => 
        `<article class="Card">
          <img src="${product.images[0]}" alt="${product.title}"/>
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>`
      );
      output = output.join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    }  
    catch(error) {
      console.log(error);
    }
  } else {
    let newItem = document.createElement('div');
    newItem.classList.add('Alert');
    newItem.innerHTML= 'Todos los productos obtenidos';
    $app.appendChild(newItem);
    $observe.remove(); 
  }
};

const loadData = async () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(async entries => {
  if (entries[0].isIntersecting) 
  await loadData();
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
