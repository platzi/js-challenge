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

eval("const $app = document.getElementById('app');\r\nconst $observe = document.getElementById('observe');\r\nconst API = 'https://api.escuelajs.co/api/v1/products';\r\nconst storageKey = 'pagination';\r\nconst initialOffset = 5;\r\nconst limit = 10;\r\n\r\nlocalStorage.removeItem(storageKey);\r\nlocalStorage.setItem(storageKey, initialOffset);\r\n\r\nconst getData = api => {\r\n  const offset = parseInt(localStorage.getItem(storageKey));\r\n  fetch(api+`?offset=${offset}&limit=${limit}`)\r\n    .then(response => response.json())\r\n    .then(response => {\r\n      let products = response;\r\n      let cards = products.map(product => {\r\n        // Template card\r\n        return (\r\n          `<article class=\"Card\">\r\n            <img src=\"${product.images[0]}\" alt=\"${product.title}\" />\r\n            <h2>\r\n              ${product.title}\r\n              <small>$${product.price} Precio</small>\r\n            </h2>\r\n          </article>`);\r\n      });\r\n      let newItem = document.createElement('section');\r\n      newItem.classList.add('Items');\r\n      let output = '';\r\n      cards.forEach(card => {\r\n        output = output + card;\r\n      });\r\n      newItem.innerHTML = output;\r\n      $app.appendChild(newItem);\r\n      localStorage.setItem(storageKey, offset+limit);\r\n    })\r\n    .catch(error => console.log(error));\r\n};\r\n\r\nconst loadData = async () => {\r\n  await getData(API);\r\n};\r\n\r\nloadData();\r\n\r\nconst intersectionObserver = new IntersectionObserver(entries => {\r\n  let offset = parseInt(localStorage.getItem(storageKey));\r\n  if(entries[0].isIntersecting){\r\n    loadData();\r\n  }else{\r\n    if(offset>=200){\r\n      const info = `<p class=\"Info\">Todos los productos Obtenidos</p>`;\r\n      $observe.innerHTML = info;\r\n      intersectionObserver.disconnect();\r\n    }\r\n  }\r\n}, {\r\n  rootMargin: '0px 0px 100% 0px',\r\n});\r\n\r\nintersectionObserver.observe($observe);\r\n\n\n//# sourceURL=webpack://js-challenge/./src/index.js?");

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