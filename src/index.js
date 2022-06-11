const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';


localStorage.removeItem('pagination');  
const limit = 10;

const getData = async api => {
  const pagination = localStorage.getItem('pagination') || 1;
  const offset = pagination * limit - 6;
  let output;
  try {
    const getData = await fetch(`${api}?offset=${offset}&limit=${limit}`);
    const response = await getData.json();
    
    if (response.length) {
      output = response.map(product => {
        return `
            <article class="Card">
              <img src="${product.images[0]}" />
              <h2>
                ${product.title}
                <small>$ ${product.price}</small>
              </h2>
            </article>
          `;
      })
    } else {
      intersectionObserver.unobserve($observe);
      output = `
        <h2>Todos los productos Obtenidos</h2>
      `
    };

    let newItem = document.createElement('section');
    newItem.classList.add('Item');
    newItem.innerHTML = output;
    $app.appendChild(newItem);
  } catch (error) {
    consol.log(error);
  }    
  localStorage.setItem('pagination', (parseInt(pagination) + 1));
}

const loadData = () => {
  getData(API);
}


const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

