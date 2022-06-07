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

/***/ "./src/api/api.js":
/*!************************!*\
  !*** ./src/api/api.js ***!
  \************************/
/***/ ((module) => {

eval("const DEFAULT = 'https://api.escuelajs.co/api/';\r\n\r\nconst getProducts = async (page) => {\r\n  const offset = (page * 10) - 5\r\n  const pagination = parseInt(localStorage.getItem(\"pagination\"))\r\n  const data = await fetch(DEFAULT.concat(`v1/products?offset=${offset}&limit=10`))\r\n  const res = await data.json();\r\n  return res;\r\n};\r\n\r\nmodule.exports = { getProducts };\r\n\n\n//# sourceURL=webpack://js-challenge/./src/api/api.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const $app = document.getElementById('app');\r\nconst $observe = document.getElementById('observe');\r\nconst API = 'https://api.escuelajs.co/api/v1/products';\r\nconst template = __webpack_require__(/*! ./templates */ \"./src/templates/index.js\");\r\nconst api = __webpack_require__(/*! ./api/api */ \"./src/api/api.js\");\r\n\r\nlocalStorage.removeItem('pagination');\r\nlocalStorage.setItem('pagination', '0');\r\n\r\nlet newItem = document.createElement('section');\r\nnewItem.classList.add('Item');\r\nnewItem.appendChild(document.createElement('ul'));\r\n$app.appendChild(newItem);\r\n\r\nconst renderData = async page => {\r\n  const list = document.getElementsByClassName('Item')[0].children[0];\r\n  const products = await api.getProducts(page);\r\n  template.items(list, products);\r\n};\r\n\r\nconst intersectionObserver = new IntersectionObserver(\r\n  entries => {\r\n    if (entries[0].isIntersecting === true) {\r\n      let page = parseInt(localStorage.getItem('pagination')) + 1;\r\n      localStorage.setItem('pagination', page);\r\n      renderData(page);\r\n      console.log(entries);\r\n    }\r\n  },\r\n  {\r\n    threshold: 1.0,\r\n    rootMargin: '0px 0px 100% 0px',\r\n  }\r\n);\r\n\r\nintersectionObserver.observe($observe);\r\n\r\nconst mutation = new MutationObserver(() => {\r\n  let page = localStorage.getItem('pagination');\r\n  if (page === '20') {\r\n    intersectionObserver.disconnect();\r\n    $app.innerHTML += 'Todos los productos Obtenidos';\r\n  }\r\n});\r\n\r\nconst list = document.getElementsByClassName('Item')[0];\r\n\r\nmutation.observe(list, { childList: true, subtree: true });\r\n\n\n//# sourceURL=webpack://js-challenge/./src/index.js?");

/***/ }),

/***/ "./src/templates/index.js":
/*!********************************!*\
  !*** ./src/templates/index.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { items } = __webpack_require__(/*! ./items */ \"./src/templates/items.js\");\r\n\r\nmodule.exports = { items };\r\n\n\n//# sourceURL=webpack://js-challenge/./src/templates/index.js?");

/***/ }),

/***/ "./src/templates/items.js":
/*!********************************!*\
  !*** ./src/templates/items.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"items\": () => (/* binding */ items)\n/* harmony export */ });\nconst items = (ele,products) => {\r\n  products.forEach(product => {\r\n    const template = `<article class=\"Card\">\r\n    <img src=\"${product.images[0]}\" />\r\n      <h2>\r\n        ${product.title}\r\n        <small>$ ${product.price}</small>\r\n      </h2>\r\n    </article>`;\r\n    ele.innerHTML += template;\r\n  });\r\n  return ele;\r\n};\r\n\n\n//# sourceURL=webpack://js-challenge/./src/templates/items.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;