const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

const getData = async api => {

  try {
    const response = await fetch(api).then(response => response.json())
    products = response;
    let output = products.map(product => {
      const card = `
        <article class="Card">
          <img src="${product.images[0]}" alt="${product.title}" title="${product.title}">
          <h2>
            ${product.title}
            <small>${product.price}</small>
          </h2>
        </article>
      `
      return card;
      // template
    });
    let newItem = document.createElement('section');
    newItem.classList.add('Item');
    newItem.innerHTML = output.join('');
    $app.appendChild(newItem);
  } catch (error) {
    console.log(error)
  }

}

const loadData = () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  loadData()
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
