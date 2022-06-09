const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const FETCH_LIMIT = 10;
const INITIAL_OFFET = 5;
const PAGINATION_VARIABLE = 'pagination';

const getData = async api => {
  await fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
        let article = document.createElement('article');
        let img = document.createElement('img');
        let title = document.createElement('h2');
        let small = document.createElement('small');

        small.textContent = `$ ${product.price}`;
        title.innerText = product.title
        title.appendChild(small);

        img.src = product.images[0];
        
        article.classList.add("Card");
        article.appendChild(img);
        article.appendChild(title);
        
        return article;
      });
      
      if(output.length !== 0) {
        /*let newItem = document.createElement('section');
        newItem.classList.add('Items');*/
        let item = $app.getElementsByClassName("Items")[0];
        output.forEach(card => {
          item.appendChild(card);
        });
        //newItem.innerHTML = output;
        //$app.appendChild(newItem);
      } else {
        stopObserver();
      }
    })
    .catch(error => console.log(error));
}

const loadData = async (offset, limit) => {
  await getData(`${API}?offset=${offset}&limit=${limit}`);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      let offset = localStorage.getItem(PAGINATION_VARIABLE);
      if(offset == null) {
        offset = INITIAL_OFFET;
      } else {
        offset = parseInt(offset) + FETCH_LIMIT;
      }

      loadData(offset, FETCH_LIMIT);

      localStorage.setItem(PAGINATION_VARIABLE, offset);
      }
  });
}, {
  rootMargin: '0px 0px 100% 0px', threshold: 1.0
});

window.onbeforeunload = () => {
  localStorage.removeItem(PAGINATION_VARIABLE);
};

const stopObserver = () => {
  intersectionObserver.unobserve($observe);
  intersectionObserver.disconnect();
  let text = document.createElement('p');
  text.textContent = 'Todos los productos Obtenidos';
  $app.appendChild(text);
  
}

intersectionObserver.observe($observe);
