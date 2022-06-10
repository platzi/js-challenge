const productCard = (image, title, price) => {
  return `
    <article class="Card">
      <img loading="lazy" src="${image}" alt="${title}">
      <h2>
        ${title}
        <small>$ ${price}</small>
      </h2>
    </article>
  `
}