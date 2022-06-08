const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const limit = 10;

let offset = 5
localStorage.setItem("pagination", offset);

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
    newItem.classList.add('Item');
    newItem.innerHTML = output
    $app.appendChild(newItem)

    localStorage.setItem("pagination", parseInt(offset)+parseInt(limit));
      offset = parseInt(localStorage.getItem("pagination"));
      console.log("loadData pagination=" + (offset));
  } catch (err) {
    console.error(err)
  }
}



const loadData = async () => {

  offset = localStorage.getItem("pagination");
  console.log("loadData Init="+offset)

  let pageable = '?offset='+offset+'&limit='+limit;
  getData(API+pageable);

};

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...

  offset = parseInt(localStorage.getItem("pagination"));

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