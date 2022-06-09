const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = async(api) => {
  try{
    const response = await fetch(API);
    console.log("respouesta: " + response);
  }catch (err)
  {
    console.log("Error: " + err);
  }
}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
getData();