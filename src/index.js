const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=10';

const getData = async () => {
  try {
    const response = await fetch(API)
    console.log(response);

    if (response.ok) {
      const data = await response.json();
      

      data.forEach(product => {
        console.log(product.title);
      })
        
    } else {
      console.log('Error');
    }
  } catch (error) {
    console.log(error);    
  }

}
getData();