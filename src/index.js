const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = api => {
  let idx = parseInt(localStorage.getItem('pagination'));
  if (!idx) {
    idx = 5
  }
  let query = `?offset=${idx-1}&limit=10`
  fetch(api+query)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        let div = document.createElement('div')
        let article = document.createElement('article');
        article.classList.add('Card')
        let img = document.createElement('img')
        img.src = product.images[0]
        img.alt = product.title
        article.appendChild(img)
        let h2 = document.createElement('h2')
        let title = document.createTextNode(product.title)
        h2.appendChild(title)
        let price = document.createTextNode('$ ' + product.price)
        let small = document.createElement('small')
        small.appendChild(price)
        h2.appendChild(small)
        article.appendChild(h2)
        div.appendChild(article)
        return div.innerHTML
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
    localStorage.setItem('pagination', idx+10);
    
    if (idx >= 200) {
      let h3 = document.createElement('h3')
      let msg = document.createTextNode("Todos los productos Obtenidos") 
      h3.appendChild(msg)
      $app.appendChild(h3)
      $observe.remove();
    }
}

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }
    loadData();
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

window.onbeforeunload = function() {
  localStorage.clear();
  return '';
};

intersectionObserver.observe($observe);
loadData();

