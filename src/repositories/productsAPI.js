import CustomPaginator from "../events/pagination/pagination.js";
import AppConfig from "../config/app.config.js";

const getData = (api) => new Promise((resolve, reject) => {
    fetch(api)
      .then((response) => response.json())
      .then((response) => {
        const [initialIndx, finalIndx] =
          CustomPaginator.calculateNextPageIndexes(
            CustomPaginator.getCurrentPage(),
            AppConfig.resultsPerPage,
            AppConfig.initialProductIndex
          );
        let products = response.slice(initialIndx, finalIndx);
        let output = products.map((product) => _buildItemElement(product));

        const productsContainer = _buildItemsContainer();
        output.forEach((elem) => productsContainer.appendChild(elem));

        resolve(productsContainer);

      }).catch((error) => reject(error));
  });

const _buildItemsContainer = () => {
  const productsContainer = document.createElement("div");
  productsContainer.classList.add("Items");
  return productsContainer;
};

const _buildItemElement = (product) => {
  let itemHTML = `<article class="Card">
        <img src="${product.images[0]}" alt="${product.description}"/>
        <h2>
          ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>`;

  let newItem = document.createElement("div");
  newItem.classList.add("Item");
  newItem.innerHTML = itemHTML;
  return newItem;
};

export default {
  getData,
};
