const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const INITIAL = 5;
const ELEMENTS_PER_PAGE = 10;
const LIMIT = 200;
const PAGINATION = "pagination"

localStorage.removeItem(PAGINATION);

const card = (p) => {
  return `<article class='Card'>
  <img src='${p.images[0]}' alt='${p.title}' />
  <h2>
    ${p.title}
    <small>$ ${p.price}</small>
  </h2>
</article>`
}

const getData = api => {
  let isLimitAlready = false;
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;

      let output = products.map((p) => {
        if (p.id === LIMIT) isLimitAlready = true;
        return card(p);
      });

      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output
      $app.appendChild(newItem);

      if (isLimitAlready) {
        let endedMessage = document.createElement('h3');
        endedMessage.innerText = 'Todos los productos Obtenidos';
        endedMessage.style.color = '#3c484e';
        endedMessage.style.textAlign = "center";
        $app.appendChild(endedMessage);
        let madeByMe = document.createElement('h4');
        madeByMe.innerText = '<> Hecho por Ivy Saskia ♥';
        madeByMe.style.textAlign = "right";
        $app.appendChild(madeByMe);
        intersectionObserver.unobserve($observe);
      }
    })
    .catch(error => console.log(error));
}

const loadData = async() => {
  const offset = parseInt(localStorage.getItem(PAGINATION)) + ELEMENTS_PER_PAGE || INITIAL;
  localStorage.setItem(PAGINATION, offset);

  const queryParams = new URLSearchParams({
    offset,
    limit: ELEMENTS_PER_PAGE,
  });

  await getData(API + '?' + queryParams);
}

const intersectionObserver = new IntersectionObserver(
  (entries) => entries.forEach(async (entry) => {
    const { isIntersecting } = entry;
    if (isIntersecting) await loadData();
}),
  { rootMargin: '0px 0px 100% 0px' }
);

intersectionObserver.observe($observe);
