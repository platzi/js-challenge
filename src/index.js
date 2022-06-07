const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = api => {
  let pagination = Number(localStorage.getItem("pagination") || 4);
  fetch(`${api}?offset=${pagination}&limit=10`)
    .then(response => response.json())
    .then(response => {
      localStorage.setItem("pagination", pagination + 10);
      let products = response;

      let output = products.map(product => {
        let article = document.createElement("article");
        article.classList.add("Card");
        article.innerHTML = `
          <img src="${product.images[0]}" />
          <h2>
            ${product.title}
          <small>$${product.price}</small>
          </h2>`;
        return article;
      });

      let items = document.querySelector(".Items");
      const isElementCreated = !items;
      if (isElementCreated){
        items = document.createElement('section');
        items.classList.add('Items');
      }

      output.forEach(product => items.appendChild(product));
      isElementCreated && $app.appendChild(items);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  await getData(API);
  if (Number(localStorage.getItem("pagination")) === 194){
    alert("Todos los productos Obtenidos");
    intersectionObserver.disconnect();
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 50% 0px',
});

intersectionObserver.observe($observe);


window.onbeforeunload = (e) => {
  localStorage.removeItem("pagination");
}