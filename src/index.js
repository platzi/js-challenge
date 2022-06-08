const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return `
        <article class="Card">
          <img src="${product.images[0]}" alt="${product.title}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>
        `;
      });

      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async (offset, first) => {
  console.log(`offset ${offset}`);
  
  localStorage.setItem('pagination', offset);

  if(offset > 200){
    alert("Todos los productos Obtenidos");
    intersectionObserver.disconnect();
  }

  if(first){
    getData(`${API}?offset=5&limit=10`);  
  }else{
    getData(`${API}?offset=${offset}&limit=10`);  
  }  
}

const intersectionObserver = new IntersectionObserver(entries => {
  const pagina = localStorage.getItem('pagination');
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      console.log(`al reinicio`);
      await loadData(parseInt(pagina)+10, false);
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px'
});

intersectionObserver.observe($observe);

window.onload = async function() {
  await loadData(5, true);
}

window.onbeforeunload = function () {
  localStorage.clear();
  localStorage.setItem('pagination', '0');
}