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

/***/ "./assets/src/js/script.js":
/*!*********************************!*\
  !*** ./assets/src/js/script.js ***!
  \*********************************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', function () {\n  var categoryButtons = document.querySelectorAll('.portfolio__category');\n  var portfolioGallery = document.getElementById('portfolio-gallery');\n  var ajaxUrl = portfolioGallery.getAttribute('data-ajax-url'); // Fetch the ajax URL from the data attribute\n\n  // Handle category button clicks\n  categoryButtons.forEach(function (button) {\n    button.addEventListener('click', function () {\n      // Remove active class from all buttons\n      categoryButtons.forEach(function (btn) {\n        return btn.classList.remove('portfolio__category--active');\n      });\n      // Add active class to the clicked button\n      this.classList.add('portfolio__category--active');\n      var categoryId = this.getAttribute('data-category-id');\n\n      // AJAX request to fetch videos for the selected category\n      fetchVideosByCategory(categoryId);\n    });\n  });\n\n  // Function to fetch videos by category via AJAX\n  function fetchVideosByCategory(categoryId) {\n    fetch(ajaxUrl, {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'\n      },\n      body: \"action=fetch_videos&category_id=\".concat(categoryId)\n    }).then(function (response) {\n      if (!response.ok) {\n        throw new Error('Network response was not OK');\n      }\n      return response.json();\n    }).then(function (data) {\n      if (data.success && data.data.length) {\n        renderPortfolioItems(data.data);\n      } else {\n        console.warn('No videos found for this category');\n        portfolioGallery.innerHTML = ''; // Clear gallery if no videos found\n      }\n    })[\"catch\"](function (error) {\n      return console.error('Error fetching videos:', error);\n    });\n  }\n\n  // Function to render portfolio items in the gallery\n  function renderPortfolioItems(portfolioItems) {\n    // Clear the current gallery\n    portfolioGallery.innerHTML = '';\n\n    // Loop through each portfolio item\n    portfolioItems.forEach(function (item) {\n      var layoutType = item[0].layout_type;\n      var itemDiv = document.createElement('div');\n      itemDiv.className = \"portfolio__item portfolio__item--\".concat(layoutType);\n\n      // Loop through each video in the item\n      item.forEach(function (video) {\n        var videoDiv = document.createElement('div');\n\n        // Add classes based on 'is_rounded' and if the video is empty\n        videoDiv.className = \"portfolio__video \".concat(video.is_rounded ? 'portfolio__video--rounded' : '', \" \").concat(!video.video_url ? 'portfolio__video--empty' : '');\n\n        // Add video content if URL exists\n        if (video.video_url) {\n          var videoElement = document.createElement('video');\n          videoElement.setAttribute('src', video.video_url);\n          videoElement.muted = true;\n          videoElement.loop = true;\n          videoElement.classList.add('video-preview');\n\n          // Set the poster attribute if available\n          if (video.thumbnail) {\n            videoElement.setAttribute('poster', video.thumbnail);\n          }\n          // Set the high-quality video as a data attribute\n          if (video.high_quality) {\n            videoElement.setAttribute('data-high-quality', video.high_quality);\n          }\n          videoDiv.appendChild(videoElement);\n        }\n\n        // Append the videoDiv to the itemDiv\n        itemDiv.appendChild(videoDiv);\n      });\n\n      // Append the itemDiv to the portfolioGallery\n      portfolioGallery.appendChild(itemDiv);\n    });\n  }\n});\n\n//# sourceURL=webpack://16x9/./assets/src/js/script.js?");

/***/ }),

/***/ "./assets/src/ts/modules/typewriter.ts":
/*!*********************************************!*\
  !*** ./assets/src/ts/modules/typewriter.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {\n    if (kind === \"m\") throw new TypeError(\"Private method is not writable\");\n    if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a setter\");\n    if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot write private member to an object whose class did not declare it\");\n    return (kind === \"a\" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;\n};\nvar __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {\n    if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a getter\");\n    if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot read private member from an object whose class did not declare it\");\n    return kind === \"m\" ? f : kind === \"a\" ? f.call(receiver) : f ? f.value : state.get(receiver);\n};\nvar _Typewriter_instances, _Typewriter_queue, _Typewriter_element, _Typewriter_loop, _Typewriter_typingSpeed, _Typewriter_deletingSpeed, _Typewriter_addToQueue;\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Typewriter {\n    constructor(parent, { loop = false, typingSpeed = 50, deletingSpeed = 50 } = {}) {\n        _Typewriter_instances.add(this);\n        _Typewriter_queue.set(this, []);\n        _Typewriter_element.set(this, void 0);\n        _Typewriter_loop.set(this, void 0);\n        _Typewriter_typingSpeed.set(this, void 0);\n        _Typewriter_deletingSpeed.set(this, void 0);\n        __classPrivateFieldSet(this, _Typewriter_element, document.createElement(\"div\"), \"f\");\n        parent.append(__classPrivateFieldGet(this, _Typewriter_element, \"f\"));\n        __classPrivateFieldSet(this, _Typewriter_loop, loop, \"f\");\n        __classPrivateFieldSet(this, _Typewriter_typingSpeed, typingSpeed, \"f\");\n        __classPrivateFieldSet(this, _Typewriter_deletingSpeed, deletingSpeed, \"f\");\n    }\n    typeString(string) {\n        __classPrivateFieldGet(this, _Typewriter_instances, \"m\", _Typewriter_addToQueue).call(this, resolve => {\n            let i = 0;\n            const interval = setInterval(() => {\n                __classPrivateFieldGet(this, _Typewriter_element, \"f\").append(string[i]);\n                i++;\n                if (i >= string.length) {\n                    clearInterval(interval);\n                    resolve();\n                }\n            }, __classPrivateFieldGet(this, _Typewriter_typingSpeed, \"f\"));\n        });\n        return this;\n    }\n    deleteChars(number) {\n        __classPrivateFieldGet(this, _Typewriter_instances, \"m\", _Typewriter_addToQueue).call(this, resolve => {\n            let i = 0;\n            const interval = setInterval(() => {\n                __classPrivateFieldGet(this, _Typewriter_element, \"f\").innerText = __classPrivateFieldGet(this, _Typewriter_element, \"f\").innerText.substring(0, __classPrivateFieldGet(this, _Typewriter_element, \"f\").innerText.length - 1);\n                i++;\n                if (i >= number) {\n                    clearInterval(interval);\n                    resolve();\n                }\n            }, __classPrivateFieldGet(this, _Typewriter_deletingSpeed, \"f\"));\n        });\n        return this;\n    }\n    deleteAll(deleteSpeed = __classPrivateFieldGet(this, _Typewriter_deletingSpeed, \"f\")) {\n        __classPrivateFieldGet(this, _Typewriter_instances, \"m\", _Typewriter_addToQueue).call(this, resolve => {\n            const interval = setInterval(() => {\n                __classPrivateFieldGet(this, _Typewriter_element, \"f\").innerText = __classPrivateFieldGet(this, _Typewriter_element, \"f\").innerText.substring(0, __classPrivateFieldGet(this, _Typewriter_element, \"f\").innerText.length - 1);\n                if (__classPrivateFieldGet(this, _Typewriter_element, \"f\").innerText.length === 0) {\n                    clearInterval(interval);\n                    resolve();\n                }\n            }, deleteSpeed);\n        });\n        return this;\n    }\n    pauseFor(duration) {\n        __classPrivateFieldGet(this, _Typewriter_instances, \"m\", _Typewriter_addToQueue).call(this, resolve => {\n            setTimeout(resolve, duration);\n        });\n        return this;\n    }\n    start() {\n        return __awaiter(this, void 0, void 0, function* () {\n            let cb = __classPrivateFieldGet(this, _Typewriter_queue, \"f\").shift();\n            while (cb != null) {\n                yield cb();\n                if (__classPrivateFieldGet(this, _Typewriter_loop, \"f\"))\n                    __classPrivateFieldGet(this, _Typewriter_queue, \"f\").push(cb);\n                cb = __classPrivateFieldGet(this, _Typewriter_queue, \"f\").shift();\n            }\n            return this;\n        });\n    }\n}\n_Typewriter_queue = new WeakMap(), _Typewriter_element = new WeakMap(), _Typewriter_loop = new WeakMap(), _Typewriter_typingSpeed = new WeakMap(), _Typewriter_deletingSpeed = new WeakMap(), _Typewriter_instances = new WeakSet(), _Typewriter_addToQueue = function _Typewriter_addToQueue(cb) {\n    __classPrivateFieldGet(this, _Typewriter_queue, \"f\").push(() => new Promise(cb));\n};\nexports[\"default\"] = Typewriter;\n\n\n//# sourceURL=webpack://16x9/./assets/src/ts/modules/typewriter.ts?");

/***/ }),

/***/ "./assets/src/ts/modules/videos.ts":
/*!*****************************************!*\
  !*** ./assets/src/ts/modules/videos.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass VideoPopupHandler {\n    constructor() {\n        this.popupOverlay = document.getElementById('popup__overlay');\n        this.popupVideo = this.popupOverlay.querySelector('.popup__video');\n        this.closeButton = this.popupOverlay.querySelector('.popup__close-btn');\n        this.galleryContainers = document.querySelectorAll('.popup-videos-parent');\n    }\n    init() {\n        this.attachEventsToContainers();\n        this.attachPopupEvents();\n    }\n    // Attach event listeners to each .popup-videos-parent container\n    attachEventsToContainers() {\n        this.galleryContainers.forEach(container => {\n            container.addEventListener('mouseenter', (event) => this.handleMouseEnter(event), true);\n            container.addEventListener('mouseleave', (event) => this.handleMouseLeave(event), true);\n            container.addEventListener('click', (event) => this.handleClick(event), true);\n        });\n    }\n    // Handle mouseenter event for videos\n    handleMouseEnter(event) {\n        const target = event.target;\n        if (target && target.tagName === 'VIDEO' && target.classList.contains('video-preview')) {\n            this.playVideo(target);\n        }\n    }\n    // Handle mouseleave event for videos\n    handleMouseLeave(event) {\n        const target = event.target;\n        if (target && target.tagName === 'VIDEO' && target.classList.contains('video-preview')) {\n            this.resetVideo(target);\n        }\n    }\n    // Handle click event for videos\n    handleClick(event) {\n        const target = event.target;\n        if (target && target.tagName === 'VIDEO' && target.classList.contains('video-preview')) {\n            this.openPopup(target);\n        }\n    }\n    // Play video on hover\n    playVideo(video) {\n        video.play().catch(err => console.error('Error playing preview video:', err));\n    }\n    // Pause, reset, and reload video to show the poster\n    resetVideo(video) {\n        video.pause();\n        video.currentTime = 0;\n        video.load();\n    }\n    // Open popup and load high-quality video\n    openPopup(video) {\n        const highQualitySrc = video.getAttribute('data-high-quality');\n        if (highQualitySrc) {\n            const sourceElement = this.popupVideo.querySelector('source');\n            sourceElement.src = highQualitySrc;\n            this.popupVideo.load();\n            this.popupOverlay.style.display = 'flex';\n            this.popupVideo.play().catch(err => console.error('Error playing high-quality video:', err));\n        }\n        else {\n            console.warn('High-quality video URL not found');\n        }\n    }\n    // Attach event listeners for closing the popup\n    attachPopupEvents() {\n        this.closeButton.addEventListener('click', () => this.closePopup());\n        this.popupOverlay.addEventListener('click', (event) => {\n            if (event.target === this.popupOverlay)\n                this.closePopup();\n        });\n    }\n    // Close the popup and reset the video\n    closePopup() {\n        this.popupOverlay.style.display = 'none';\n        this.popupVideo.pause();\n        this.popupVideo.currentTime = 0;\n        const sourceElement = this.popupVideo.querySelector('source');\n        sourceElement.src = '';\n    }\n}\nexports[\"default\"] = VideoPopupHandler;\n\n\n//# sourceURL=webpack://16x9/./assets/src/ts/modules/videos.ts?");

/***/ }),

/***/ "./assets/src/ts/script.ts":
/*!*********************************!*\
  !*** ./assets/src/ts/script.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst videos_1 = __importDefault(__webpack_require__(/*! ./modules/videos */ \"./assets/src/ts/modules/videos.ts\"));\nconst typewriter_1 = __importDefault(__webpack_require__(/*! ./modules/typewriter */ \"./assets/src/ts/modules/typewriter.ts\"));\ndocument.addEventListener('DOMContentLoaded', () => {\n    new videos_1.default().init();\n    const portfolioBtn = document.querySelector('.portfolio__btn');\n    portfolioBtn === null || portfolioBtn === void 0 ? void 0 : portfolioBtn.addEventListener('click', () => {\n        var _a;\n        (_a = document.querySelector('.portfolio__viewport')) === null || _a === void 0 ? void 0 : _a.classList.toggle('portfolio__viewport--full');\n    });\n    const typewriter = new typewriter_1.default(document.querySelector(\".typing__text\"), {\n        loop: true,\n        typingSpeed: 100,\n        deletingSpeed: 0,\n    });\n    typewriter\n        .typeString(\"Творим истории,\")\n        .pauseFor(1000)\n        .typeString(\"\\nсоздаем шедевры\")\n        .pauseFor(2000)\n        .deleteAll()\n        .start();\n});\n\n\n//# sourceURL=webpack://16x9/./assets/src/ts/script.ts?");

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
/******/ 	__webpack_require__("./assets/src/ts/script.ts");
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/src/js/script.js");
/******/ 	
/******/ })()
;