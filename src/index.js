const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const TOTAL_PAGES=20;
var initProd=10
var initPage= localStorage.getItem('actualPage')

const getData = async api => {
  await fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let resultHtml="";
      let output = products.map(product => {
        //condition for creating products after id number 5
        if(product.id>=initProd*(initPage-1)+5&&product.id<initPage*initProd+5)
        {
          if(200>product.id)
          {
            //Template for creating a product
            resultHtml+=(`<article class="Card"><img src="${product.images}"><h2 value="${product.id}">${product.title}<small>$ ${product.price}</small></h2></article>`);
          }
        }
    });
      //$app.innerHTML="";
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = resultHtml;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

//Message to display when all products has been showed
function endMessage()
{
  let resultHtml="";
  resultHtml+=`<h2>Todos los productos obtenidos</h2>`
  //$app.innerHTML="";
  let newItem = document.createElement('section');
  newItem.classList.add('Item');
  newItem.innerHTML = resultHtml;
  $app.appendChild(newItem);
}

const loadData = async () => {
  await getData(API);
}

//Increment page or show end message
function nextPage()
{
  if(initPage<20)
  {
    initPage++
    loadData();
  }else
  {
    intersectionObserver.unobserve($observe);//when the limit is reached, unobserve the $observe element
    endMessage();
  }
}

//This was for testing
function prevPage()
{
  if(initPage>1)
    initPage--
    loadData();
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  const initial = entries[0];//starting point
  //execute observer
  if(initial.isIntersecting){
    nextPage();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
