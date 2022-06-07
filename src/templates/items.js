export const items = (ele,products) => {
  products.forEach(product => {
    const template = `<article class="Card">
    <img src="${product.images[0]}" />
      <h2>
        ${product.title}
        <small>$ ${product.price}</small>
      </h2>
    </article>`;
    ele.innerHTML += template;
  });
  return ele;
};
