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

eval("const $app = document.getElementById('app');\r\nconst $observe = document.getElementById('observe');\r\nconst API = 'https://api.escuelajs.co/api/v1/products';\r\n\r\nconst getData = api => {\r\n  let idx = parseInt(localStorage.getItem('pagination'));\r\n  if (!idx) {\r\n    idx = 5\r\n  }\r\n  let query = `?offset=${idx-1}&limit=10`\r\n  fetch(api+query)\r\n    .then(response => response.json())\r\n    .then(response => {\r\n      let products = response;\r\n      let output = products.map(product => {\r\n        let div = document.createElement('div')\r\n        let article = document.createElement('article');\r\n        article.classList.add('Card')\r\n        let img = document.createElement('img')\r\n        img.src = product.images[0]\r\n        img.alt = product.title\r\n        article.appendChild(img)\r\n        let h2 = document.createElement('h2')\r\n        let title = document.createTextNode(product.title)\r\n        h2.appendChild(title)\r\n        let price = document.createTextNode('$ ' + product.price)\r\n        let small = document.createElement('small')\r\n        small.appendChild(price)\r\n        h2.appendChild(small)\r\n        article.appendChild(h2)\r\n        div.appendChild(article)\r\n        return div.innerHTML\r\n      });\r\n      let newItem = document.createElement('section');\r\n      newItem.classList.add('Item');\r\n      newItem.innerHTML = output;\r\n      $app.appendChild(newItem);\r\n    })\r\n    .catch(error => console.log(error));\r\n    localStorage.setItem('pagination', idx+10);\r\n    \r\n    if (idx >= 200) {\r\n      let h3 = document.createElement('h3')\r\n      let msg = document.createTextNode(\"Todos los productos Obtenidos\") \r\n      h3.appendChild(msg)\r\n      $app.appendChild(h3)\r\n      $observe.remove();\r\n    }\r\n}\r\n\r\nconst loadData = async () => {\r\n  await getData(API);\r\n}\r\n\r\nconst intersectionObserver = new IntersectionObserver(entries => {\r\n  // logic...\r\n  entries.forEach(entry => {\r\n    if (!entry.isIntersecting) {\r\n      return;\r\n    }\r\n    loadData();\r\n  })\r\n}, {\r\n  rootMargin: '0px 0px 100% 0px',\r\n});\r\n\r\nwindow.onbeforeunload = function() {\r\n  localStorage.clear();\r\n  return '';\r\n};\r\n\r\nintersectionObserver.observe($observe);\r\nloadData();\r\n\r\n\n\n//# sourceURL=webpack://js-challenge/./src/index.js?");

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