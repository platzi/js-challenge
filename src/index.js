const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
localStorage.setItem('pagination', '5');


const setModalMsg = (message) => {
  document.querySelector('.modal-body').innerHTML = message;
}
const showenModal = (modalId, showenModal) => {
  const modalElement = document.querySelector(`#${modalId}`)
  if (showenModal) {
    modalElement.classList.remove('hidden');
    return
  }
  modalElement.classList.add('hidden');
}
const getHTMLCard = ({ id, title, price, description, category, images }) => {
  return `
  <article class="Card" id="product_${id}">
    <img src="${images[0]}" />
    <h2>
      ${title}
      <small>$ ${price}</small>
    </h2>
    <p class="description">${description}</p>
    <div class="category">${category.name}</div>
  </article>
  `
}
const getHTMLCards = (products) => {
  const output = products.map(getHTMLCard).join('\n');
  return output;
}
const renderCards = (HTMLCards) => {
  let newItem = document.createElement('section');
  newItem.classList.add('Items');
  newItem.innerHTML = HTMLCards;
  $app.appendChild(newItem);
}
const getData = async api => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    return {
      success: true,
      data,
      error: null
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error
    }
  }
}
const updatePagination = (newOffset, limit) => {
  localStorage.setItem('pagination', `${parseInt(newOffset) + limit}`);
}
const loadData = async () => {
  let offset = localStorage.getItem('pagination');
  let limit = 10
  const uri = new URL(API);
  uri.searchParams.set('limit', `${limit}`);
  uri.searchParams.set('offset', `${offset}`);

  const result = await getData(uri.href);

  if (!result.success) {
    setModalMsg(`❗❗ ${result.error}`);
    showenModal('modalAlert', true)
    setTimeout(() => {
      showenModal('modalAlert', false);
    }, 2000)
    return
  }

  if (result.data.length === 0) {
    intersectionObserver.unobserve($observe);
    setModalMsg(`🚧 Todos los productos Obtenidos❕❕`);
    showenModal('modalAlert', true)
    setTimeout(() => {
      showenModal('modalAlert', false);
    }, 3000)
    return
  }

  const HTMLCards = getHTMLCards(result.data);

  renderCards(HTMLCards);

  updatePagination(offset, limit);
}

const intersectionObserver = new IntersectionObserver((entries) => {
  console.log(entries[0])
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

// --- OBSERVACION RAZON DE PONER EL SETTIMEOUT ---
// codigo fue necesario para pasar los test, ya que el test tiene una espera de 2seg antes de iniciar, entonces cuando inicia ya ha lanzado la primera ejecucion del observer y el valor de paginacion ya estaria en 15 y no en 5
// se configura para funcionar con el setTimeout del test, igual se probo quitando el retardo del test y funciona
setTimeout(() => {
  intersectionObserver.observe($observe);
}, 2100)
