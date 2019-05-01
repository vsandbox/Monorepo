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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const child_process_1 = __importDefault(__webpack_require__(/*! child_process */ "child_process"));
const moveArtifact = (artifactName, artifactTargetPath, artifactDestPath) => {
    fs_1.default.copyFile(artifactTargetPath, artifactDestPath, (err) => {
        if (err) {
            console.error(`AAA Error occured while artifact was moved to "${artifactTargetPath}"`);
            console.error(err);
            return;
        }
        fs_1.default.unlink(artifactTargetPath, err => {
            if (err) {
                console.error(`Error occured while artifact was moved to "${artifactTargetPath}"`);
                console.error(err);
                return;
            }
            console.log(`Artifact "${artifactName}" was successfully built.`);
            console.log(`Artifact "${artifactName}" moved to ${artifactDestPath}`);
        });
    });
};
const publishArtifact = (packageDir, artifactRegistryDir) => {
    // const packageDir = path.join(process.cwd(), packageDir);
    const packageJsonPath = path_1.default.join(packageDir, "package.json");
    fs_1.default.exists(packageJsonPath, (exists) => {
        if (!exists) {
            console.error(`Can't load package config by ${packageJsonPath}`);
            return;
        }
        const packageConfig = require(packageJsonPath);
        child_process_1.default.exec("npm pack", {
            cwd: packageDir
        }, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error occured while packing package by path "${packageDir}"`);
                console.error(err);
                return;
            }
            let artifactPackageName = packageConfig.name;
            artifactPackageName = artifactPackageName.replace("@", "");
            artifactPackageName = artifactPackageName.replace("/", "-");
            const artifactTargetName = `${artifactPackageName}-${packageConfig.version}.tgz`;
            const artifactDestName = `${packageConfig.version}.tgz`;
            const artifactTargetPath = path_1.default.join(packageDir, artifactTargetName);
            const artifactDir = path_1.default.join(artifactRegistryDir, artifactPackageName);
            fs_1.default.exists(artifactDir, (exists) => {
                const artifactDestPath = path_1.default.join(artifactDir, artifactDestName);
                if (!exists) {
                    fs_1.default.mkdir(artifactDir, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        moveArtifact(artifactTargetName, artifactTargetPath, artifactDestPath);
                    });
                }
                else {
                    moveArtifact(artifactTargetName, artifactTargetPath, artifactDestPath);
                }
            });
        });
    });
};
publishArtifact(path_1.default.join(process.cwd(), "packages/test"), path_1.default.join(process.cwd(), "artifacts"));


/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92bGFkbmV0c19fbW9ub3JlcG8tdG9vbHMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3ZsYWRuZXRzX19tb25vcmVwby10b29scy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92bGFkbmV0c19fbW9ub3JlcG8tdG9vbHMvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdmxhZG5ldHNfX21vbm9yZXBvLXRvb2xzL2V4dGVybmFsIFwiY2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovL3ZsYWRuZXRzX19tb25vcmVwby10b29scy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vdmxhZG5ldHNfX21vbm9yZXBvLXRvb2xzL2V4dGVybmFsIFwicGF0aFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4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QUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUVsRSxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNULFlBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7d0JBQzFCLElBQUksR0FBRyxFQUFFOzRCQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ25CLE9BQU87eUJBQ1Y7d0JBQ0QsWUFBWSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixDQUFDLENBQUM7b0JBQzNFLENBQUMsQ0FBQyxDQUFDO2lCQUNOO3FCQUNJO29CQUNELFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2lCQUMxRTtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBR1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQUVGLGVBQWUsQ0FDWCxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxlQUFlLENBQUMsRUFDekMsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQ3hDLENBQUM7Ozs7Ozs7Ozs7OztBQ2hGRiwwQzs7Ozs7Ozs7Ozs7QUNBQSwrQjs7Ozs7Ozs7Ozs7QUNBQSxpQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInZsYWRuZXRzX19tb25vcmVwby10b29sc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ2bGFkbmV0c19fbW9ub3JlcG8tdG9vbHNcIl0gPSBmYWN0b3J5KCk7XG59KShnbG9iYWwsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgY2hpbGRQcm9jZXNzIGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XHJcblxyXG5jb25zdCBtb3ZlQXJ0aWZhY3QgPSAoYXJ0aWZhY3ROYW1lOiBzdHJpbmcsIGFydGlmYWN0VGFyZ2V0UGF0aDogc3RyaW5nLCBhcnRpZmFjdERlc3RQYXRoOiBzdHJpbmcpID0+IHtcclxuICAgIGZzLmNvcHlGaWxlKGFydGlmYWN0VGFyZ2V0UGF0aCwgYXJ0aWZhY3REZXN0UGF0aCwgKGVycikgPT4ge1xyXG4gICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgQUFBIEVycm9yIG9jY3VyZWQgd2hpbGUgYXJ0aWZhY3Qgd2FzIG1vdmVkIHRvIFwiJHthcnRpZmFjdFRhcmdldFBhdGh9XCJgKTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmcy51bmxpbmsoYXJ0aWZhY3RUYXJnZXRQYXRoLCBlcnIgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBvY2N1cmVkIHdoaWxlIGFydGlmYWN0IHdhcyBtb3ZlZCB0byBcIiR7YXJ0aWZhY3RUYXJnZXRQYXRofVwiYCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBcnRpZmFjdCBcIiR7YXJ0aWZhY3ROYW1lfVwiIHdhcyBzdWNjZXNzZnVsbHkgYnVpbHQuYCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBcnRpZmFjdCBcIiR7YXJ0aWZhY3ROYW1lfVwiIG1vdmVkIHRvICR7YXJ0aWZhY3REZXN0UGF0aH1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuY29uc3QgcHVibGlzaEFydGlmYWN0ID0gKHBhY2thZ2VEaXI6IHN0cmluZywgYXJ0aWZhY3RSZWdpc3RyeURpcjogc3RyaW5nKSA9PiB7XHJcbiAgICAvLyBjb25zdCBwYWNrYWdlRGlyID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIHBhY2thZ2VEaXIpO1xyXG4gICAgY29uc3QgcGFja2FnZUpzb25QYXRoID0gcGF0aC5qb2luKHBhY2thZ2VEaXIsIFwicGFja2FnZS5qc29uXCIpO1xyXG4gICAgXHJcbiAgICBmcy5leGlzdHMocGFja2FnZUpzb25QYXRoLCAoZXhpc3RzOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgaWYgKCFleGlzdHMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgQ2FuJ3QgbG9hZCBwYWNrYWdlIGNvbmZpZyBieSAke3BhY2thZ2VKc29uUGF0aH1gKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcGFja2FnZUNvbmZpZyA9IF9fbm9uX3dlYnBhY2tfcmVxdWlyZV9fKHBhY2thZ2VKc29uUGF0aCk7XHJcblxyXG4gICAgICAgIGNoaWxkUHJvY2Vzcy5leGVjKFwibnBtIHBhY2tcIiwge1xyXG4gICAgICAgICAgICBjd2Q6IHBhY2thZ2VEaXJcclxuICAgICAgICB9LCAoZXJyLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBvY2N1cmVkIHdoaWxlIHBhY2tpbmcgcGFja2FnZSBieSBwYXRoIFwiJHtwYWNrYWdlRGlyfVwiYCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGFydGlmYWN0UGFja2FnZU5hbWU6IHN0cmluZyA9IHBhY2thZ2VDb25maWcubmFtZTtcclxuICAgICAgICAgICAgYXJ0aWZhY3RQYWNrYWdlTmFtZSA9IGFydGlmYWN0UGFja2FnZU5hbWUucmVwbGFjZShcIkBcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGFydGlmYWN0UGFja2FnZU5hbWUgPSBhcnRpZmFjdFBhY2thZ2VOYW1lLnJlcGxhY2UoXCIvXCIsIFwiLVwiKTtcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBhcnRpZmFjdFRhcmdldE5hbWUgPSBgJHthcnRpZmFjdFBhY2thZ2VOYW1lfS0ke3BhY2thZ2VDb25maWcudmVyc2lvbn0udGd6YDtcclxuICAgICAgICAgICAgY29uc3QgYXJ0aWZhY3REZXN0TmFtZSA9IGAke3BhY2thZ2VDb25maWcudmVyc2lvbn0udGd6YDtcclxuICAgICAgICAgICAgY29uc3QgYXJ0aWZhY3RUYXJnZXRQYXRoID0gcGF0aC5qb2luKHBhY2thZ2VEaXIsIGFydGlmYWN0VGFyZ2V0TmFtZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBhcnRpZmFjdERpciA9IHBhdGguam9pbihhcnRpZmFjdFJlZ2lzdHJ5RGlyLCBhcnRpZmFjdFBhY2thZ2VOYW1lKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZzLmV4aXN0cyhhcnRpZmFjdERpciwgKGV4aXN0cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXJ0aWZhY3REZXN0UGF0aCA9IHBhdGguam9pbihhcnRpZmFjdERpciwgYXJ0aWZhY3REZXN0TmFtZSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICghZXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnMubWtkaXIoYXJ0aWZhY3REaXIsIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVBcnRpZmFjdChhcnRpZmFjdFRhcmdldE5hbWUsIGFydGlmYWN0VGFyZ2V0UGF0aCwgYXJ0aWZhY3REZXN0UGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlQXJ0aWZhY3QoYXJ0aWZhY3RUYXJnZXROYW1lLCBhcnRpZmFjdFRhcmdldFBhdGgsIGFydGlmYWN0RGVzdFBhdGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5wdWJsaXNoQXJ0aWZhY3QoXHJcbiAgICBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJwYWNrYWdlcy90ZXN0XCIpLFxyXG4gICAgcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwiYXJ0aWZhY3RzXCIpLFxyXG4pO1xyXG5cclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=