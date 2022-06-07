const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

let offset = 5,
  limit = 10,
  loading = false,
  maxProducts = 200;

  const getData =async api => {
    const offsetProduct=localStorage.getItem('pagination')!=null
      ?parseInt(localStorage.getItem('pagination'))+offset
      : firstProduct

    localStorage.setItem('pagination', offsetProduct);

    if(offsetProduct<=maxProducts){
      try {
      const response = await fetch(`${api}?offset=${offsetProduct}&limit=${limit}`);
          let products = await response.json();
          let output = products.map(product => {
            return `<article class="Card">
            <img src="${product.images[0]}" alt="${product.title}" />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>`
          });
          let newItem = document.createElement('section');
          newItem.classList.add('Items');
          newItem.innerHTML = output.join('');
          $app.appendChild(newItem);

      } catch (error){
        console.log(error)
      }
    }else{
      let newItem= document.createElement('div');
      newItem.classList.add('msg');
      newItem.style.textAlign= 'center';
      newItem.innerHTML= "Todos los productos Obtenidos";
      $app.appendChild(newItem);
      $observe.remove();
    }
  }

const loadData = async () => {
  getData(API);
}

window.close = () => {
  Storage.clear();
}

const intersectOptions = {
  threshold: 1,
};

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) loadData();
}, {
  threshold: 1,
  rootMargin: '0px 0px 100% 0px',
});

observer.observe($observe);