const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const API_5TO10 = (init,limit) =>`https://api.escuelajs.co/api/v1/products?offset=${init}&limit=${limit}`;

console.log('test');

const isIntersecting = (entry) => {
  return entry.isIntersecting
}
const accion = () => {
  console.log('hola.');
}
const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries
    .filter(isIntersecting)
    .forEach(accion)
}, {
  rootMargin: '0px 0px 100% 0px'
});
const registerItem = (item) => {
  intersectionObserver.observe(item)
};

const getData = (api) => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      
      //console.log(response);

      let products = response;
      let output = products.map(product => {
        
        return '<div style ="border:solid">'+ product.title +'</div>';
        
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      registerItem(newItem);
    })
    .catch(error => console.log(error));
}

const getDataInit5To10 = (api) => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      
      //console.log(response);

      let products = response;
      let output = products.map(product => {
        
        return '<div style ="border:solid">'+ 
        '<span>'+ product.id + '</span><br>'+
        '<span>'+ product.title + '</span><br>'+
        '<span>'+ product.price + '</span><br>'+
        '<span>'+ product.description + '</span><br>'+
        '<span>'+ product.category + '</span>'+
        '</div>';
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  //getData(API);
  getDataInit5To10(API_5TO10(5,100));
  localStorage.pagination = 5;
}



//intersectionObserver.observe($app);

loadData();
