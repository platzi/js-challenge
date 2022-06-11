const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';


const max = 10;
let start = 5;
let intersect = 1;
const mensaje = "Todos los productos Obtenidos."
const limit = 200;
const addElement = (items) => {
  return items.map((item) => {
    return `<article class= "Card"><img src=${item.images[0]}/>
              <h2>${item.id} - ${item.title} <small>$${item.price}</small></h2>
              </article>`;
  });
};

const getData = async (api) => {
const response = await fetch(api);
const data = await response.json();

localStorage.removeItem("pagination");
try{
  let output = addElement(data);
  let newItem = document.createElement("section");
  newItem.classList.add("Items");
  newItem.innerHTML = output.join("");
  $app.append(newItem);

  localStorage.setItem("pagination", parseInt(start));
  start += 10; 
}
catch{
  (error => console.log(error));
}
};

const loadData = async () => {
  let pagination = `?start=${start}&max=${max}`;
  getData(API + pagination);
};

const intersectionObserver = new IntersectionObserver(entries => {
// logic...
if (entries[0].isIntersecting){
loadData();  
}else if (limit){
document.getElementById(mensaje);
$observe.innerHTML = mensaje;    
intersectionObserver.disconnect();
}}, 
{
rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
