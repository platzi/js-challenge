/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const $app = document.getElementById('app');\r\nconst $observe = document.getElementById('observe');\r\nconst API = 'https://api.escuelajs.co/api/v1/products';\r\n\r\nconst INIT_PAGE = 5;\r\nconst MAX_PAGE_SIZE = 10;\r\n\r\nlocalStorage.clear();\r\n\r\nlocalStorage.setItem('pagination', INIT_PAGE);\r\n\r\nconst getData = async (url_api) => {\r\n  try {\r\n    const response = await fetch(`${url_api}?offset=${localStorage.getItem('pagination')}&limit=${MAX_PAGE_SIZE}`);\r\n    const products = await response.json();\r\n    let productRender = products.map((product) => `\r\n      <article class=\"Card\">\r\n        <img src=\"${product.images[0]}\"/>\r\n        <h2>\r\n          ${product.title}\r\n          <small>$ ${product.price}</small>\r\n        </h2>\r\n      </article>\r\n    `);\r\n    let newItem = document.createElement('section');\r\n    newItem.classList.add('Items');\r\n    newItem.innerHTML = productRender.join('');\r\n    $app.appendChild(newItem);\r\n  } catch (err) { console.log(err); }\r\n}\r\n\r\nconst loadData = async () => {\r\n  await getData(API);\r\n}\r\n\r\nconst intersectionObserver = new IntersectionObserver((entries, self) => {\r\n  const currentPage = +localStorage.getItem('pagination');\r\n\r\n  if (entries[0].isIntersecting && window.scrollY!==0) {\r\n    const nextPage = currentPage + MAX_PAGE_SIZE;\r\n    localStorage.setItem('pagination', nextPage);\r\n    loadData();\r\n  } \r\n  if (currentPage>200) {\r\n    self.unobserve($observe);\r\n    let newItem = document.createElement('section');\r\n    newItem.classList.add('Empty');\r\n    newItem.innerHTML = `<h1>Todos los productos Obtenidos</h1>`;\r\n    $app.appendChild(newItem);\r\n  }\r\n}, {\r\n  rootMargin: '0px 0px 100% 0px',\r\n});\r\n\r\nloadData();\r\n\r\nintersectionObserver.observe($observe);\r\n\n\n//# sourceURL=webpack://js-challenge/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;