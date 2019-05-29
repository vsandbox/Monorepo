(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vladnets_monorepo"] = factory();
	else
		root["vladnets_monorepo"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./test/benchmarks/symbols-vs-weakmap.ts":
/*!***********************************************!*\
  !*** ./test/benchmarks/symbols-vs-weakmap.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const workingWithSymbols = () => {
    const object = {};
    const id = Symbol();
    const id2 = Symbol();
    const id3 = Symbol();
    const id4 = Symbol();
    object[id] = 1;
    object[id2] = 2;
    object[id3] = 3;
    object[id4] = 4;
    let value = 0;
    if (typeof object[id] !== "undefined")
        value = object[id];
    let value2 = 0;
    if (typeof object[id] !== "undefined")
        value2 = object[id];
    let value3 = 0;
    if (typeof object[id] !== "undefined")
        value3 = object[id];
    let value4 = 0;
    if (typeof object[id] !== "undefined")
        value4 = object[id];
    return value + value2 + value3 + value4;
};
const workingWithWeakMap = () => {
    const object = new WeakMap();
    const id = () => { };
    const id2 = () => { };
    const id3 = () => { };
    const id4 = () => { };
    object.set(id, 1);
    object.set(id2, 2);
    object.set(id3, 3);
    object.set(id4, 4);
    let value = 0;
    if (object.has(id))
        value = object.get(id);
    let value2 = 0;
    if (object.has(id))
        value2 = object.get(id);
    let value3 = 0;
    if (object.has(id))
        value3 = object.get(id);
    let value4 = 0;
    if (object.has(id))
        value4 = object.get(id);
    return value + value2 + value3 + value4;
};
const test = () => {
    console.time("workingWithSymbols");
    for (let i = 0; i < 1000; i++) {
        const result = workingWithSymbols();
    }
    console.timeEnd("workingWithSymbols");
    console.time("workingWithWeakMap");
    for (let i = 0; i < 1000; i++) {
        const result = workingWithWeakMap();
    }
    console.timeEnd("workingWithWeakMap");
};
test();


/***/ }),

/***/ "./test/index.ts":
/*!***********************!*\
  !*** ./test/index.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./benchmarks/symbols-vs-weakmap */ "./test/benchmarks/symbols-vs-weakmap.ts");


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92bGFkbmV0c19tb25vcmVwby93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdmxhZG5ldHNfbW9ub3JlcG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmxhZG5ldHNfbW9ub3JlcG8vLi90ZXN0L2JlbmNobWFya3Mvc3ltYm9scy12cy13ZWFrbWFwLnRzIiwid2VicGFjazovL3ZsYWRuZXRzX21vbm9yZXBvLy4vdGVzdC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFO0lBRTVCLE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztJQUV2QixNQUFN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R0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBRTVDLENBQUMsQ0FBQztBQUVGLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtJQUVkLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBRTNCLE1BQU0sTUFBTSxHQUFHLGtCQUFrQixFQUFFLENBQUM7S0FFdkM7SUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFFdEMsT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ25DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFFM0IsTUFBTSxNQUFNLEdBQUcsa0JBQWtCLEVBQUUsQ0FBQztLQUV2QztJQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUUxQyxDQUFDLENBQUM7QUFFRixJQUFJLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDaEZQLHNHQUF5QyIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widmxhZG5ldHNfbW9ub3JlcG9cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widmxhZG5ldHNfbW9ub3JlcG9cIl0gPSBmYWN0b3J5KCk7XG59KShnbG9iYWwsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vdGVzdC9pbmRleC50c1wiKTtcbiIsImNvbnN0IHdvcmtpbmdXaXRoU3ltYm9scyA9ICgpID0+IHtcclxuXHJcbiAgICBjb25zdCBvYmplY3Q6IGFueSA9IHt9O1xyXG5cclxuICAgIGNvbnN0IGlkID0gU3ltYm9sKCk7XHJcbiAgICBjb25zdCBpZDIgPSBTeW1ib2woKTtcclxuICAgIGNvbnN0IGlkMyA9IFN5bWJvbCgpO1xyXG4gICAgY29uc3QgaWQ0ID0gU3ltYm9sKCk7XHJcblxyXG4gICAgb2JqZWN0W2lkXSA9IDE7XHJcbiAgICBvYmplY3RbaWQyXSA9IDI7XHJcbiAgICBvYmplY3RbaWQzXSA9IDM7XHJcbiAgICBvYmplY3RbaWQ0XSA9IDQ7XHJcblxyXG4gICAgbGV0IHZhbHVlID0gMDtcclxuICAgIGlmICh0eXBlb2Ygb2JqZWN0W2lkXSAhPT0gXCJ1bmRlZmluZWRcIikgdmFsdWUgPSBvYmplY3RbaWRdO1xyXG5cclxuICAgIGxldCB2YWx1ZTIgPSAwO1xyXG4gICAgaWYgKHR5cGVvZiBvYmplY3RbaWRdICE9PSBcInVuZGVmaW5lZFwiKSB2YWx1ZTIgPSBvYmplY3RbaWRdO1xyXG5cclxuICAgIGxldCB2YWx1ZTMgPSAwO1xyXG4gICAgaWYgKHR5cGVvZiBvYmplY3RbaWRdICE9PSBcInVuZGVmaW5lZFwiKSB2YWx1ZTMgPSBvYmplY3RbaWRdO1xyXG5cclxuICAgIGxldCB2YWx1ZTQgPSAwO1xyXG4gICAgaWYgKHR5cGVvZiBvYmplY3RbaWRdICE9PSBcInVuZGVmaW5lZFwiKSB2YWx1ZTQgPSBvYmplY3RbaWRdO1xyXG5cclxuICAgIHJldHVybiB2YWx1ZSArIHZhbHVlMiArIHZhbHVlMyArIHZhbHVlNDtcclxuXHJcbn07XHJcblxyXG5jb25zdCB3b3JraW5nV2l0aFdlYWtNYXAgPSAoKSA9PiB7XHJcblxyXG4gICAgY29uc3Qgb2JqZWN0ID0gbmV3IFdlYWtNYXA8RnVuY3Rpb24sIG51bWJlcj4oKTtcclxuXHJcbiAgICBjb25zdCBpZCA9ICgpID0+IHt9O1xyXG4gICAgY29uc3QgaWQyID0gKCkgPT4ge307XHJcbiAgICBjb25zdCBpZDMgPSAoKSA9PiB7fTtcclxuICAgIGNvbnN0IGlkNCA9ICgpID0+IHt9O1xyXG5cclxuICAgIG9iamVjdC5zZXQoaWQsIDEpO1xyXG4gICAgb2JqZWN0LnNldChpZDIsIDIpO1xyXG4gICAgb2JqZWN0LnNldChpZDMsIDMpO1xyXG4gICAgb2JqZWN0LnNldChpZDQsIDQpO1xyXG5cclxuICAgIGxldCB2YWx1ZSA9IDA7XHJcbiAgICBpZiAob2JqZWN0LmhhcyhpZCkpIHZhbHVlID0gb2JqZWN0LmdldChpZCk7XHJcblxyXG4gICAgbGV0IHZhbHVlMiA9IDA7XHJcbiAgICBpZiAob2JqZWN0LmhhcyhpZCkpIHZhbHVlMiA9IG9iamVjdC5nZXQoaWQpO1xyXG5cclxuICAgIGxldCB2YWx1ZTMgPSAwO1xyXG4gICAgaWYgKG9iamVjdC5oYXMoaWQpKSB2YWx1ZTMgPSBvYmplY3QuZ2V0KGlkKTtcclxuXHJcbiAgICBsZXQgdmFsdWU0ID0gMDtcclxuICAgIGlmIChvYmplY3QuaGFzKGlkKSkgdmFsdWU0ID0gb2JqZWN0LmdldChpZCk7XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlICsgdmFsdWUyICsgdmFsdWUzICsgdmFsdWU0O1xyXG5cclxufTtcclxuXHJcbmNvbnN0IHRlc3QgPSAoKSA9PiB7XHJcblxyXG4gICAgY29uc29sZS50aW1lKFwid29ya2luZ1dpdGhTeW1ib2xzXCIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwOyBpKyspIHtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gd29ya2luZ1dpdGhTeW1ib2xzKCk7XHJcblxyXG4gICAgfVxyXG4gICAgY29uc29sZS50aW1lRW5kKFwid29ya2luZ1dpdGhTeW1ib2xzXCIpO1xyXG5cclxuICAgIGNvbnNvbGUudGltZShcIndvcmtpbmdXaXRoV2Vha01hcFwiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwMDsgaSsrKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHdvcmtpbmdXaXRoV2Vha01hcCgpO1xyXG5cclxuICAgIH1cclxuICAgIGNvbnNvbGUudGltZUVuZChcIndvcmtpbmdXaXRoV2Vha01hcFwiKTtcclxuXHJcbn07XHJcblxyXG50ZXN0KCk7XHJcbiIsImltcG9ydCBcIi4vYmVuY2htYXJrcy9zeW1ib2xzLXZzLXdlYWttYXBcIjtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==