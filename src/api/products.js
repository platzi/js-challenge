import {PRODUCTS_ENDPOINT} from './config.js'

const getProducts = async ( offset = 5, limit = 10) => {

    try {
        const url = `${PRODUCTS_ENDPOINT}?offset=${offset}&limit=${limit}`
        const res = await fetch(url)
        return await res.json()
    }
    catch (error){
        error => console.log(error)
    }

    return false
    /*fetch(api)
        .then(response => response.json())
        .then(response => {
            return response
            let products = response;
            let output = products.map(product => {
                // template
            });
            let newItem = document.createElement('section');
            newItem.classList.add('Item');
            newItem.innerHTML = output;
            $app.appendChild(newItem);
        })
        .catch();*/

}

export {getProducts}