/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/ts/modules/videos.ts":
/*!*****************************************!*\
  !*** ./assets/src/ts/modules/videos.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass VideoPopupHandler {\n    constructor() {\n        this.observer = null;\n        this.previewVideos = document.querySelectorAll('.video-preview');\n        this.popupOverlay = document.getElementById('popup__overlay');\n        this.popupVideo = this.popupOverlay.querySelector('.popup__video');\n        this.closeButton = this.popupOverlay.querySelector('.popup__close-btn');\n    }\n    init() {\n        this.initializeObserver();\n        this.attachEventListeners();\n    }\n    // Initialize the Intersection Observer\n    initializeObserver() {\n        this.observer = new IntersectionObserver(this.handleIntersection.bind(this));\n        this.previewVideos.forEach((video) => {\n            var _a, _b, _c;\n            const lowQualitySrc = (_a = video.querySelector('source')) === null || _a === void 0 ? void 0 : _a.getAttribute('src');\n            video.setAttribute('data-src', lowQualitySrc || '');\n            (_b = video.querySelector('source')) === null || _b === void 0 ? void 0 : _b.removeAttribute('src');\n            (_c = this.observer) === null || _c === void 0 ? void 0 : _c.observe(video);\n        });\n    }\n    // Handle Intersection Observer entries\n    handleIntersection(entries) {\n        entries.forEach((entry) => {\n            var _a;\n            const video = entry.target;\n            if (entry.isIntersecting) {\n                this.loadVideo(video);\n                this.observeHover(video);\n                (_a = this.observer) === null || _a === void 0 ? void 0 : _a.unobserve(video);\n            }\n        });\n    }\n    // Load the video when it becomes visible\n    loadVideo(video) {\n        const source = video.querySelector('source');\n        const dataSrc = video.getAttribute('data-src');\n        if (source && dataSrc) {\n            source.src = dataSrc;\n            video.load();\n        }\n    }\n    // Attach hover and click event listeners\n    observeHover(video) {\n        video.addEventListener('mouseenter', () => this.playVideo(video));\n        video.addEventListener('mouseleave', () => this.resetVideo(video));\n        video.addEventListener('click', () => this.openPopup(video));\n    }\n    // Play video on hover\n    playVideo(video) {\n        video.play().catch(err => console.error('Error playing preview video:', err));\n    }\n    // Pause, reset, and reload video to show the poster\n    resetVideo(video) {\n        video.pause();\n        video.currentTime = 0;\n        video.load();\n    }\n    // Open popup and load high-quality video\n    openPopup(video) {\n        const highQualitySrc = video.getAttribute('data-high-quality');\n        if (highQualitySrc) {\n            const sourceElement = this.popupVideo.querySelector('source');\n            sourceElement.src = highQualitySrc;\n            this.popupVideo.load();\n            this.popupOverlay.style.display = 'flex';\n            this.popupVideo.play().catch(err => console.error('Error playing high-quality video:', err));\n        }\n        else {\n            console.warn('High-quality video URL not found');\n        }\n    }\n    // Attach popup and overlay event listeners\n    attachEventListeners() {\n        this.closeButton.addEventListener('click', () => this.closePopup());\n        this.popupOverlay.addEventListener('click', (event) => {\n            if (event.target === this.popupOverlay)\n                this.closePopup();\n        });\n    }\n    // Close the popup and reset the video\n    closePopup() {\n        this.popupOverlay.style.display = 'none';\n        this.popupVideo.pause();\n        this.popupVideo.currentTime = 0;\n        const sourceElement = this.popupVideo.querySelector('source');\n        sourceElement.src = '';\n    }\n}\nexports[\"default\"] = VideoPopupHandler;\n\n\n//# sourceURL=webpack://uniqueartistry/./assets/src/ts/modules/videos.ts?");

/***/ }),

/***/ "./assets/src/ts/script.ts":
/*!*********************************!*\
  !*** ./assets/src/ts/script.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst videos_1 = __importDefault(__webpack_require__(/*! ./modules/videos */ \"./assets/src/ts/modules/videos.ts\"));\ndocument.addEventListener('DOMContentLoaded', () => {\n    new videos_1.default().init();\n});\n\n\n//# sourceURL=webpack://uniqueartistry/./assets/src/ts/script.ts?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/src/ts/script.ts");
/******/ 	
/******/ })()
;