const DEFAULT = 'https://api.escuelajs.co/api/';

const getProducts = async (page) => {
  const offset = (page * 10) - 5
  const pagination = parseInt(localStorage.getItem("pagination"))
  const data = await fetch(DEFAULT.concat(`v1/products?offset=${offset}&limit=10`))
  const res = await data.json();
  return res;
};

module.exports = { getProducts };
