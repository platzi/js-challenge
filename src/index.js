const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";


const changePagination = () => {
    let initialPagination = parseInt(localStorage.getItem("pagination"))
    let newInititalPagination = initialPagination + 10
    const sizeOfArrayOfData = 201
    if (newInititalPagination + 10 < sizeOfArrayOfData){
        localStorage.setItem("pagination", newInititalPagination);
        loadData()
    } 
    else if(initialPagination == 201){
        console.log("Finished")
    }
    else{
        localStorage.setItem("pagination", 201);
        loadData();
    }
	
}

const getOutput = (arrayOfInitialData) => {
        const initialPagination = localStorage.getItem("pagination");
        const lastPagination = parseInt(initialPagination) + 10;
        console.log(initialPagination, lastPagination);
        return arrayOfInitialData.slice(5, lastPagination);
    }

const getInitialPagination = () => {
    localStorage.setItem("pagination", -5);
}    


const getData = (api) => {
	fetch(api)
		.then((response) => response.json())
		.then((response) => {
			let products = response;
            console.log(products)
			let output = products.map((product) => {
				// template
                
                return {image: product.images[0], title: product.title, price: product.price}
			});

			let newItem = document.createElement("section");
			newItem.classList.add("Items");  
			newItem.innerHTML = getOutput(output).map((datum) =>
				`<article class="Card">
                    <img src="${datum.image}" />
                    <h2>${datum.title}<small>$ ${datum.price}</small></h2>
                </article>`).join("");
			$app.appendChild(newItem);
		}).catch((error) => console.log(error));
};

const loadData = () => {
	getData(API);
};

const intersectionObserver = new IntersectionObserver((entries) => {
	// logic...
	entries.forEach(
		(entry) => {
			if (entry.isIntersecting) {
				changePagination()
			}
		},
		{
			rootMargin: "0px 0px 100% 0px",
		},
	);
});

intersectionObserver.observe($observe);



window.addEventListener("load", function () {
        getInitialPagination();
		
});


