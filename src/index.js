const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const PRODUCTS_BY_PAGE=10;
const LIMIT_PRODUCTS=200;
const PAGINATION_ITEM='pagination';
const DIV_MESSAGE_NAME="message";
let initial_product=5;
let pagination=0;


const getData = async (api) => {
  try{
  const res = await fetch(api);
  const response = await res.json();
  console.log('response', response);
  return response;
    }catch(error){
      console.log(error)
      return [];
    };
   
}

const loadData = async () => {
  const url = `${API}/?offset=${initial_product}&limit=${PRODUCTS_BY_PAGE}`;
  const products = await getData(url);
  if(products.length==0 || isOverLimit()){
    deleteIntersectionObserver();
    showMessage();
  }else{
      let output = products.map(product => {
        return product;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      output.forEach((product)=>{
        const newArticle =createArticleStructureHTML(product);
        newItem.appendChild(newArticle);
      });
      $app.appendChild(newItem);
      initial_product +=PRODUCTS_BY_PAGE;
      (!this.getPagination())?this.setPagination(pagination+1):this.setPagination(parseInt(this.getPagination())+1);
  } 
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.forEach(entry=>{
      if(entry.isIntersecting){
        if(isOverLimit()){
          showMessage();
        }else{
          loadData();
        }
      }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});





function setPagination(pagination){
  localStorage.setItem(PAGINATION_ITEM,pagination);
}
function getPagination(){
  return localStorage.getItem(PAGINATION_ITEM);
}
function createArticleStructureHTML(product){
  const article = document.createElement('article');
  article.classList.add('Card');
  const img = document.createElement("img");
  img.src=product.images[0];
  img.alt=product.title;
  const h2 = document.createElement('h2');
  h2.innerText = product.title;
  const small = document.createElement('small');
  small.innerHTML = product.price;
  h2.appendChild(small);
  article.appendChild(img);
  article.appendChild(h2);
  return article;
}
function isOverLimit(){
  return (initial_product>=LIMIT_PRODUCTS);
}
function showMessage(){
  const divMessage = document.getElementById(DIV_MESSAGE_NAME);
  divMessage.style.display="";
}
function deleteIntersectionObserver(){
  intersectionObserver.unobserve($observe);
}
//Refresh Pagination
window.onbeforeunload = ()=> { localStorage.removeItem(PAGINATION_ITEM); };
  
loadData();

intersectionObserver.observe($observe);