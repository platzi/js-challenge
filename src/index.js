const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let flag = false;
let limit = 10;
localStorage["pagination"] = 5;

const getData = async (api) => {
  try {
    let response = await fetch(api);
    let products = await response.json();
      
    if (products.length)
    {
      let output = products.map(
        (product) =>
        `<article class="Card">
            <img src=${product.images[0]}/>
            <h2> ${product.title} <small>$ ${product.price}</small> </h2>
        </article>`
      );
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output.join("");
      $app.appendChild(newItem);

    }
    else
    {
      intersectionObserver.unobserve($observe);
      alert("Todos los productos Obtenidos");
    }

    }catch (error) {
      console.error(error);
    }
}

const loadData = async () => {
  
  if (flag)
    localStorage["pagination"] = parseInt(localStorage.getItem("pagination")) + limit;
  
  flag = true;
  await getData(`${API}?offset=${localStorage.getItem("pagination")}&limit=${limit}`);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

window.addEventListener('beforeunload', () => {
    localStorage.removeItem('pagination');
})

intersectionObserver.observe($observe);
