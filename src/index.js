const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const $message = document.getElementById("message");
const API = "https://api.escuelajs.co/api/v1/products";

localStorage.clear();


const getData = (async (api,offset,limit=10) => {
  const response = await fetch(`${api}?offset=${offset}&limit=${limit}`)
  const data = await response.json()
  localStorage.setItem('pagination', offset)
      let products = data;
      let output = products.map((product) => {
        return `
        <article class="Card">
        <img src="${product.category.image}" />
        <h2>
          ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>
        `;
	  })
	  
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output;
      $app.appendChild(newItem);

	  if(products.length < 10) {
		$message.style.display = 'block'
		intersectionObserver.disconnect()
	}
})
const loadData = () => {
  getData(API);
};


const intersectionObserver = new IntersectionObserver(
async  (entries) => {

		entries.forEach(async(entry)=> {
			if(entry.isIntersecting) {
				const offsetFromLS = localStorage.getItem('pagination') 
				const offset=offsetFromLS ? Number(offsetFromLS) + 10 : 5
				await getData(API, offset)
				
				
			}
		})
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);


intersectionObserver.observe($observe);
