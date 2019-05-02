(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vladnets__monorepo-tools"] = factory();
	else
		root["vladnets__monorepo-tools"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(__webpack_require__(/*! path */ "path"));
const childProcess = __importStar(__webpack_require__(/*! child_process */ "child_process"));
const packTarball = (artifactData) => {
    const packProcess = childProcess.exec("npm pack", {
        cwd: artifactData.sourceDir,
    });
    // packProcess.stdout.on("data", data => {
    //     console.log("\n-----------------Progress------------------------\n");
    //     console.log(data.toString());
    // });
    packProcess.stderr.on("data", data => {
        // console.log("\n-----------------Error Data------------------------\n");
        console.log(data.toString());
    });
    packProcess.on("close", (code) => {
        console.log("\n-----------------Close------------------------\n");
        console.log(code);
    });
    packProcess.on("error", (err) => {
        console.log("\n-----------------Error------------------------\n");
        console.log(err);
    });
};
const buildArtifact = (sourceDir, targetDir) => {
    // # Read a package.json
    const packageConfigPath = path.join(sourceDir, "package.json");
    let packageConfig;
    try {
        packageConfig = require(packageConfigPath);
    }
    catch (err) {
        console.error(`Error occurred while reading package.json from ${packageConfigPath}`);
        console.error(err);
        return;
    }
    const artifactData = {
        name: packageConfig.name,
        version: packageConfig.version,
        sourceDir,
        targetDir,
    };
    console.log(artifactData);
    // # run `npm pack` from package dir
    packTarball(artifactData);
    // # copy result tarball to artifacts/name/version
};
buildArtifact(path.resolve("../artifact-test"), path.resolve("../../../../artifacts"));


/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92bGFkbmV0c19fbW9ub3JlcG8tdG9vbHMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3ZsYWRuZXRzX19tb25vcmVwby10b29scy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92bGFkbmV0c19fbW9ub3JlcG8tdG9vbHMvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdmxhZG5ldHNfX21vbm9yZXBvLXRvb2xzL2V4dGVybmFsIFwiY2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovL3ZsYWRuZXRzX19tb25vcmVwby10b29scy9leHRlcm5hbCBcInBhdGhcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pGQSxtRUFBNkI7QUFDN0IsNkZBQThDO0FBYzlDLE1BQU0sV0FBVyxHQUFHLENBQUMsWUFBMkIsRUFBRSxFQUFFO0lBQ2hELE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQzlDLEdBQUcsRUFBRSxZQUFZLENBQUMsU0FBUztLQUM5QixDQUFDLENBQUM7SUFFSCwwQ0FBMEM7SUFDMUMsNEVBQTRFO0lBQzVFLG9DQUFvQztJQUNwQyxNQUFNO0lBRU4sV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQ2pDLDBFQUEwRTtRQUMxRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7UUFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1FBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBRyxDQUFDLFNBQWlCLEVBQUUsU0FBaUIsRUFBRSxFQUFFO0lBRTNELHdCQUF3QjtJQUV4QixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBRS9ELElBQUksYUFBNkIsQ0FBQztJQUNsQyxJQUFJO1FBQ0EsYUFBYSxHQUFHLE9BQXVCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztLQUM5RDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxrREFBa0QsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQ3JGLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsT0FBTztLQUNWO0lBRUQsTUFBTSxZQUFZLEdBQWtCO1FBQ2hDLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSTtRQUN4QixPQUFPLEVBQUUsYUFBYSxDQUFDLE9BQU87UUFDOUIsU0FBUztRQUNULFNBQVM7S0FDWixDQUFDO0lBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUUxQixvQ0FBb0M7SUFFcEMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRTFCLGtEQUFrRDtBQUd0RCxDQUFDLENBQUM7QUFFRixhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUMzRXZGLDBDOzs7Ozs7Ozs7OztBQ0FBLGlDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widmxhZG5ldHNfX21vbm9yZXBvLXRvb2xzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInZsYWRuZXRzX19tb25vcmVwby10b29sc1wiXSA9IGZhY3RvcnkoKTtcbn0pKGdsb2JhbCwgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgKiBhcyBjaGlsZFByb2Nlc3MgZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcclxuXHJcbmludGVyZmFjZSBJUGFja2FnZUNvbmZpZyB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJQXJ0aWZhY3REYXRhIHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHZlcnNpb246IHN0cmluZztcclxuICAgIHNvdXJjZURpcjogc3RyaW5nO1xyXG4gICAgdGFyZ2V0RGlyOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IHBhY2tUYXJiYWxsID0gKGFydGlmYWN0RGF0YTogSUFydGlmYWN0RGF0YSkgPT4ge1xyXG4gICAgY29uc3QgcGFja1Byb2Nlc3MgPSBjaGlsZFByb2Nlc3MuZXhlYyhcIm5wbSBwYWNrXCIsIHtcclxuICAgICAgICBjd2Q6IGFydGlmYWN0RGF0YS5zb3VyY2VEaXIsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBwYWNrUHJvY2Vzcy5zdGRvdXQub24oXCJkYXRhXCIsIGRhdGEgPT4ge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwiXFxuLS0tLS0tLS0tLS0tLS0tLS1Qcm9ncmVzcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblwiKTtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgcGFja1Byb2Nlc3Muc3RkZXJyLm9uKFwiZGF0YVwiLCBkYXRhID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlxcbi0tLS0tLS0tLS0tLS0tLS0tRXJyb3IgRGF0YS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnRvU3RyaW5nKCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGFja1Byb2Nlc3Mub24oXCJjbG9zZVwiLCAoY29kZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiXFxuLS0tLS0tLS0tLS0tLS0tLS1DbG9zZS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb2RlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBhY2tQcm9jZXNzLm9uKFwiZXJyb3JcIiwgKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiXFxuLS0tLS0tLS0tLS0tLS0tLS1FcnJvci0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcblwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEFydGlmYWN0ID0gKHNvdXJjZURpcjogc3RyaW5nLCB0YXJnZXREaXI6IHN0cmluZykgPT4ge1xyXG5cclxuICAgIC8vICMgUmVhZCBhIHBhY2thZ2UuanNvblxyXG5cclxuICAgIGNvbnN0IHBhY2thZ2VDb25maWdQYXRoID0gcGF0aC5qb2luKHNvdXJjZURpciwgXCJwYWNrYWdlLmpzb25cIik7XHJcblxyXG4gICAgbGV0IHBhY2thZ2VDb25maWc6IElQYWNrYWdlQ29uZmlnO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBwYWNrYWdlQ29uZmlnID0gX19ub25fd2VicGFja19yZXF1aXJlX18ocGFja2FnZUNvbmZpZ1BhdGgpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3Igb2NjdXJyZWQgd2hpbGUgcmVhZGluZyBwYWNrYWdlLmpzb24gZnJvbSAke3BhY2thZ2VDb25maWdQYXRofWApO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXJ0aWZhY3REYXRhOiBJQXJ0aWZhY3REYXRhID0ge1xyXG4gICAgICAgIG5hbWU6IHBhY2thZ2VDb25maWcubmFtZSxcclxuICAgICAgICB2ZXJzaW9uOiBwYWNrYWdlQ29uZmlnLnZlcnNpb24sXHJcbiAgICAgICAgc291cmNlRGlyLFxyXG4gICAgICAgIHRhcmdldERpcixcclxuICAgIH07XHJcblxyXG4gICAgY29uc29sZS5sb2coYXJ0aWZhY3REYXRhKTtcclxuXHJcbiAgICAvLyAjIHJ1biBgbnBtIHBhY2tgIGZyb20gcGFja2FnZSBkaXJcclxuXHJcbiAgICBwYWNrVGFyYmFsbChhcnRpZmFjdERhdGEpO1xyXG5cclxuICAgIC8vICMgY29weSByZXN1bHQgdGFyYmFsbCB0byBhcnRpZmFjdHMvbmFtZS92ZXJzaW9uXHJcblxyXG5cclxufTtcclxuXHJcbmJ1aWxkQXJ0aWZhY3QocGF0aC5yZXNvbHZlKFwiLi4vYXJ0aWZhY3QtdGVzdFwiKSwgcGF0aC5yZXNvbHZlKFwiLi4vLi4vLi4vLi4vYXJ0aWZhY3RzXCIpKTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=