const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const limit = 10
let intersect = 1;
let offset = 5

const addElement = (items) => {
  return items.map(item => {
    return `<article class="Card">
              <img src=${item.images[0]} />
                <h2>
                 ${item.id} - ${item.title}
                  <small>$ ${item.price}</small>
                </h2>
            </article>`});
}

const getData = async api => {

  const response = await fetch(api)
  const products = await response.json()
  
  localStorage.removeItem("pagination");

  try {
    let output = addElement(products);

    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output.join('');
    $app.appendChild(newItem)

    localStorage.setItem("pagination", parseInt(offset));
    offset +=10;

  } catch (err) {
    console.error(err)
  }
}



const loadData = async () => {
  let pageable = '?offset='+offset+'&limit='+limit;
  getData(API+pageable);

};/**/

const intersectionObserver = new IntersectionObserver(entries => {
 
  if(entries[0].isIntersecting){
    loadData();
  }else{
    if(offset>=200){
      const info = `<p class="Info">Todos los productos Obtenidos</p>`;
      $observe.innerHTML = info;
      intersectionObserver.disconnect();
    }
  }/**/
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
