const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const maxProducts = 200;
const limit = 10;

const getData = async (api) => {
  let pagination = getPagination();
  savePagination(pagination);

  try {
    if (pagination >= maxProducts) {
      let theEnd = document.createElement('p');
      theEnd.innerHTML = 'Todos los productos obtenidos';
      $app.appendChild(theEnd);
      return;
    }

    const fetchData = await fetch(`${api}?offset=${pagination}&limit=${limit}`);
    const products = await fetchData.json();

    let output = products.map(product => {
      // template
      return `
        <article class="Card">
          <img src="${product.images[0]}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>
      `;
    });
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output;
    $app.appendChild(newItem);
  } catch (error) {
    console.log(error);
  }
}

const loadData = async () => {
  await getData(API);
}

const getPagination = () => {
  if (!localStorage.getItem('pagination')) {
    return 5;
  }

  return Number(localStorage.getItem('pagination')) + 10;
}

const savePagination = (pagination) => {
  localStorage.setItem('pagination', pagination);
}

document.addEventListener('DOMContentLoaded', () => {
  localStorage.removeItem('pagination');

  const intersectionObserver = new IntersectionObserver((entries) => {
    // logic...
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadData();
      }
    })
  }, {
    rootMargin: '0px 0px 100% 0px',
  });

  intersectionObserver.observe($observe);
})
