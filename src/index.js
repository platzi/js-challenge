const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
var output;

const getData = async api => {
  
    await fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      
      output = products.map(product => {
        
        return `<article class="Card">
                 <img src="${product.images[0]}" />
                 <h2>
                  ${product.id} - ${product.title}
                  <small>$ ${product.price}</small>
                 </h2>
                 </article>`;
      });

      let lastIndex = parseInt(localStorage.getItem("lastIndex"));
      console.log(lastIndex);
      if(isNaN(lastIndex))
      {
        lastIndex=1;
      }

      let elementsShowed = 1;

      let newItem = document.createElement('section');
      newItem.id = "section";
      newItem.classList.add('Items');
      
      output.forEach(element => {
        if(elementsShowed<=10)
        {
          if(lastIndex<=5)
          {
            lastIndex++;
            return;
          }
          else
          {
            lastIndex++;
            elementsShowed++;
            newItem.innerHTML += element;
          }
          
        }else return false;      
      });
      
      localStorage.setItem("lastIndex",""+lastIndex);
      
      $app.appendChild(newItem);
      let cards = document.querySelectorAll(".Card");
      intersectionObserver.observe(cards[cards.length-1]);
    })
    .catch(error => console.log(error)); 
}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  
  entries.forEach(element => {
    console.log(entries);

    if(element.isIntersecting)
    {
      let count=1;
      let lastIndex = parseInt(localStorage.getItem("lastIndex"));
      let secction = document.querySelector("#section");
      while(count<=10 && lastIndex<output.length)
      {
        secction.innerHTML += output[lastIndex-1];
        lastIndex++;
        count++;
      }
      
      let cards = document.querySelectorAll(".Card");
      intersectionObserver.observe(cards[cards.length-1]);
      localStorage.setItem("lastIndex",""+lastIndex);
      
      if(lastIndex==output.length)
      {
        document.querySelector("#observe").innerHTML="<article><h2>Todos los productos Obtenidos</h2></article>";
        intersectionObserver = null;
      }
    }
  });
  
}, {
  rootMargin: '0px 0px 0px 0px',
  threshold: 1.0
});

//intersectionObserver.observe($observe);

window.addEventListener('load', function() {
  loadData(); 
});

window.addEventListener("beforeunload",function (){
  localStorage.clear();
});

