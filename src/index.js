const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const limit = 10;
const offset_initial = 5;
const pagination = 'pagination';

const getData = api => {
  return fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        let article = `
          <article class="Card">
            <img src="${product.images[0]}" />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
        `;
        
        return article;
      }) .join('');
      
      if(output.length !== 0) {
        let newItem = document.createElement('section');
        newItem.classList.add('Items');
        newItem.innerHTML = output;
        $app.appendChild(newItem);
      } else {
        stopObserver();
      }

    })
    .catch(error => console.log(error));
}

const loadData = async (offset, limit) => {
  await getData(`${API}?offset=${offset}&limit=${limit}`);
  console.log('Loading...' + limit);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      let offset = localStorage.getItem(pagination);
      if(offset == null) {
        offset = offset_initial;
      } else {
        offset = parseInt(offset) + limit;
      }

      loadData(offset, limit);

      localStorage.setItem(pagination, offset);
      }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

window.onbeforeunload = () => {
  localStorage.removeItem(pagination);
};

const stopObserver = () => {
  intersectionObserver.unobserve($observe);
  intersectionObserver.disconnect();
  let text = document.createElement('p');
  text.textContent = 'Todos los productos Obtenidos';
  $app.appendChild(text);
  
}

intersectionObserver.observe($observe);