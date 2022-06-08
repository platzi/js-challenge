const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products/5';

const getData = async () => {
  const response = await fetch(API);
  const data = await response.json();
  return data;
}
const loadData = data => {
  $app.innerHTML = 
  `<div class="Card">
    <div class="Item">
      <h2>${data.title}</h2>
      <img src="${data.category.image}" alt="${data.name}">
      <p>${data.description}</p>
      <span>Price:  ${data.price} USD</span>
    </div>
  </div>
  `;
}

getData().then(loadData);
console.log(getData()); 


// $observe.addEventListener('click', () => {
//     axios.get(API)
//         .then(response => {
//             console.log(response.data);
//    

// const intersectionObserver = new IntersectionObserver(entries => {
//   // logic...
// }, {
//   rootMargin: '0px 0px 100% 0px',
//   threshold: 0.5
// });

// intersectionObserver.observe($observe);
