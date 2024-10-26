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

/***/ "./assets/src/ts/script.ts":
/*!*********************************!*\
  !*** ./assets/src/ts/script.ts ***!
  \*********************************/
/***/ (() => {

eval("\ndocument.addEventListener('DOMContentLoaded', () => {\n    // Select all preview videos\n    const previewVideos = document.querySelectorAll('.video-preview');\n    const popup = document.getElementById('video-popup');\n    const popupVideo = popup.querySelector('.video-main');\n    const closeButton = popup.querySelector('.video-popup__close');\n    const overlay = popup.querySelector('.video-popup__overlay');\n    if (!popupVideo || !closeButton || !overlay) {\n        console.error('Popup elements not found');\n        return;\n    }\n    // Hover functionality for preview videos\n    previewVideos.forEach((video) => {\n        // Play video on hover\n        video.addEventListener('mouseenter', () => {\n            video.play().catch((err) => console.error('Error playing preview video:', err));\n        });\n        // Pause and reset video on mouse leave\n        video.addEventListener('mouseleave', () => {\n            video.pause();\n            video.load();\n        });\n        // Click event to show the popup with the main video\n        video.addEventListener('click', () => {\n            const highQualitySrc = video.getAttribute('data-high-quality');\n            if (highQualitySrc) {\n                // Set the high-quality video source in the popup\n                const sourceElement = popupVideo.querySelector('source');\n                sourceElement.src = highQualitySrc;\n                popupVideo.load(); // Load the high-quality video\n                popup.style.display = 'flex'; // Show the popup\n                popupVideo.play().catch((err) => console.error('Error playing high-quality video:', err));\n            }\n            else {\n                console.warn('High-quality video URL not found');\n            }\n        });\n    });\n    // Close popup and pause video\n    const closePopup = () => {\n        popup.style.display = 'none'; // Hide the popup\n        popupVideo.pause(); // Pause the video\n        popupVideo.currentTime = 0; // Reset the video\n        const sourceElement = popupVideo.querySelector('source');\n        sourceElement.src = ''; // Clear the source to prevent loading\n    };\n    // Attach close button and overlay click events\n    closeButton.addEventListener('click', closePopup);\n    overlay.addEventListener('click', closePopup);\n});\n\n\n//# sourceURL=webpack://uniqueartistry/./assets/src/ts/script.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/src/ts/script.ts"]();
/******/ 	
/******/ })()
;