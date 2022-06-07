const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const $message = document.getElementById("message");
const API = "https://api.escuelajs.co/api/v1/products";

localStorage.removeItem('pagination')
let offset = 5;
localStorage.setItem('pagination', offset)

const getData = (async (api) => {
  const response = await fetch(`${api}?offset=${offset}&limit=10`)
  const data = await response.json()
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
})
const loadData = () => {
  getData(API);
};

loadData()
const intersectionObserver = new IntersectionObserver(
async  (entries) => {
		entries.forEach(async(entry)=> {
			if(entry.isIntersecting) {
				const response = await fetch(`${API}?offset=${offset}&limit=10`)
				const data = await response.json()
				const products = data

				if(products.length >= 10) {
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
	
					offset=offset + 10
					localStorage.setItem('pagination', offset)
				}
				else {
					$message.style.display = 'block'
					intersectionObserver.disconnect()
				}
			}
		})
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);


intersectionObserver.observe($observe);
