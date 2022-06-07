const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const $finalMessage = document.getElementById('finalMessage');
const API = 'https://api.escuelajs.co/api/v1/products';
const LIMIT = 10;
const LIMIT_API = 200;

localStorage.clear();
localStorage.setItem("pagination",5-LIMIT);

const getData =   (api) => {

   fetch(api) 
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map((product) => 
          '<article class="Card">'+
              '<img src="'+product.category.image+'" />'+
              '<h2>'+
              product.title+
                '<small>$'+product.price+'</small>'+
              '</h2>'+
          '</article>'    
      
      );
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      
      let offsetTmp = parseInt(localStorage.getItem("pagination"));
      if (offsetTmp > LIMIT_API){
        let newMessageItem = document.createElement('message');
        newMessageItem.innerHTML = "<h1>Todos los productos fueron mostrados</h1>"
        $finalMessage.append(newMessageItem);
        intersectionObserver.disconnect();
      }

    })
    .catch(error => console.log(error));
}

const loadData = async  () => {
  let offset  = parseInt(localStorage.getItem("pagination"))+LIMIT;
  await getData(API+"?offset="+offset+"&limit="+LIMIT);
}

const intersectionObserver = new IntersectionObserver( (entries) => {
  if (!entries[0].isIntersecting) return;
  loadData();
  let offset  = parseInt(localStorage.getItem("pagination"));
  localStorage.setItem("pagination",offset+LIMIT); 
  
}, {
  rootMargin: '0px 640px 100% 0px',
});


intersectionObserver.observe($observe);