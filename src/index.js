const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const PRODUCT_OFFSET = 5;
const PRODUCT_LIMIT = 10;

const getData = async(api) => {
  try{
    const response = await fetch(API);
    if(response.status != 200){ 
      throw new error(response.message);
      console.log("respouesta: " + response);
    }
    const data= response.json();
    return data;
  }catch (err)
  {
    throw new error(err);
    console.log("Error: " + err);
  }
}

const loadData = async() => {
  // getData(API);
  try{
    let products = await getData(`${API}?offset=${PRODUCT_OFFSET}&limit=${PRODUCT_LIMIT}`)
    console.table(products);
  }
  catch(err){
    throw new error(err);
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
//getData();
loadData();