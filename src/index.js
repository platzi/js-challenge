const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const INITIAL = 5;
const LIMIT = 10;

const card = (p) => {
  return `<article class='Card' id='${p.id}' >
  <img src='${p.images[0]}' alt='${p.title}' />
  <h2>
    ${p.title}
    <small>$ ${p.price}</small>
  </h2>
</article>`
}

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map((p) => {
        return card(p);
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output.join('');
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  const offset = parseInt(localStorage.getItem('pagination')) + LIMIT || INITIAL;
  
  localStorage.setItem('pagination', offset);

  const queryParams = new URLSearchParams({
    offset,
    LIMIT,
  });

  getData(API + '?' + queryParams);
}

const intersectionObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && loadData()),
  { rootMargin: '0px 0px 100% 0px' }
);

intersectionObserver.observe($observe);
