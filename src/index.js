const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
document.title = 'PlatziStore';
document.head.innerHTML += '<meta name="description" content="...">'

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return `
          <article class="Card">
            <img src="${product.images[0]}" />
            <h2>
              ${product.title}
              <small>$${product.price}</small>
            </h2>
          </article>
        `;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async() => {
  const pagination = getPagination();
  await getData(`${API}/?offset=${pagination - 1}&limit=10`);
}

const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  });
}, {
  threshold: 1
});

const getPagination = () => {
  let pagination;
  if (!localStorage.getItem('pagination')) {
    pagination = 5;
    localStorage.setItem('pagination', pagination);
  } else {
    pagination = parseInt(localStorage.getItem('pagination'));
    pagination = pagination + 10;
    localStorage.setItem('pagination', pagination);
  }
  return pagination;
}

intersectionObserver.observe($observe);

onload = () => {
  localStorage.clear();
}