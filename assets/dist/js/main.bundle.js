(()=>{var e={716:()=>{document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".portfolio__category"),t=document.getElementById("portfolio-gallery"),o=t.getAttribute("data-ajax-url");e.forEach((function(i){i.addEventListener("click",(function(){var i;e.forEach((function(e){return e.classList.remove("portfolio__category--active")})),this.classList.add("portfolio__category--active"),i=this.getAttribute("data-category-id"),fetch(o,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},body:"action=fetch_videos&category_id=".concat(i)}).then((function(e){if(!e.ok)throw new Error("Network response was not OK");return e.json()})).then((function(e){var o;e.success&&e.data.length?(o=e.data,t.innerHTML="",o.forEach((function(e){var o=e[0].layout_type,i=document.createElement("div");i.className="portfolio__item portfolio__item--".concat(o),e.forEach((function(e){var t=document.createElement("div");if(t.className="portfolio__video ".concat(e.is_rounded?"portfolio__video--rounded":""," ").concat(e.video_url?"":"portfolio__video--empty"),e.video_url){var o=document.createElement("video");o.setAttribute("src",e.video_url),o.muted=!0,o.loop=!0,o.classList.add("video-preview"),e.thumbnail&&o.setAttribute("poster",e.thumbnail),e.high_quality&&o.setAttribute("data-high-quality",e.high_quality),t.appendChild(o)}i.appendChild(t)})),t.appendChild(i)}))):(console.warn("No videos found for this category"),t.innerHTML="")})).catch((function(e){return console.error("Error fetching videos:",e)}))}))}))}))},989:function(e,t){"use strict";var o,i,r,n,s,a,l,c=this&&this.__awaiter||function(e,t,o,i){return new(o||(o=Promise))((function(r,n){function s(e){try{l(i.next(e))}catch(e){n(e)}}function a(e){try{l(i.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,a)}l((i=i.apply(e,t||[])).next())}))},u=this&&this.__classPrivateFieldSet||function(e,t,o,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,o):r?r.value=o:t.set(e,o),o},p=this&&this.__classPrivateFieldGet||function(e,t,o,i){if("a"===o&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===o?i:"a"===o?i.call(e):i?i.value:t.get(e)};Object.defineProperty(t,"__esModule",{value:!0}),i=new WeakMap,r=new WeakMap,n=new WeakMap,s=new WeakMap,a=new WeakMap,o=new WeakSet,l=function(e){p(this,i,"f").push((()=>new Promise(e)))},t.default=class{constructor(e,{loop:t=!1,typingSpeed:l=50,deletingSpeed:c=50}={}){o.add(this),i.set(this,[]),r.set(this,void 0),n.set(this,void 0),s.set(this,void 0),a.set(this,void 0),u(this,r,document.createElement("div"),"f"),e.append(p(this,r,"f")),u(this,n,t,"f"),u(this,s,l,"f"),u(this,a,c,"f")}typeString(e){return p(this,o,"m",l).call(this,(t=>{let o=0;const i=setInterval((()=>{p(this,r,"f").append(e[o]),o++,o>=e.length&&(clearInterval(i),t())}),p(this,s,"f"))})),this}deleteChars(e){return p(this,o,"m",l).call(this,(t=>{let o=0;const i=setInterval((()=>{p(this,r,"f").innerText=p(this,r,"f").innerText.substring(0,p(this,r,"f").innerText.length-1),o++,o>=e&&(clearInterval(i),t())}),p(this,a,"f"))})),this}deleteAll(e=p(this,a,"f")){return p(this,o,"m",l).call(this,(t=>{const o=setInterval((()=>{p(this,r,"f").innerText=p(this,r,"f").innerText.substring(0,p(this,r,"f").innerText.length-1),0===p(this,r,"f").innerText.length&&(clearInterval(o),t())}),e)})),this}pauseFor(e){return p(this,o,"m",l).call(this,(t=>{setTimeout(t,e)})),this}start(){return c(this,void 0,void 0,(function*(){let e=p(this,i,"f").shift();for(;null!=e;)yield e(),p(this,n,"f")&&p(this,i,"f").push(e),e=p(this,i,"f").shift();return this}))}}},398:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this.popupOverlay=document.getElementById("popup__overlay"),this.popupVideo=this.popupOverlay.querySelector(".popup__video"),this.closeButton=this.popupOverlay.querySelector(".popup__close-btn"),this.galleryContainers=document.querySelectorAll(".popup-videos-parent")}init(){this.attachEventsToContainers(),this.attachPopupEvents()}attachEventsToContainers(){this.galleryContainers.forEach((e=>{e.addEventListener("mouseenter",(e=>this.handleMouseEnter(e)),!0),e.addEventListener("mouseleave",(e=>this.handleMouseLeave(e)),!0),e.addEventListener("click",(e=>this.handleClick(e)),!0)}))}handleMouseEnter(e){const t=e.target;t&&"VIDEO"===t.tagName&&t.classList.contains("video-preview")&&this.playVideo(t)}handleMouseLeave(e){const t=e.target;t&&"VIDEO"===t.tagName&&t.classList.contains("video-preview")&&this.resetVideo(t)}handleClick(e){const t=e.target;t&&"VIDEO"===t.tagName&&t.classList.contains("video-preview")&&this.openPopup(t)}playVideo(e){e.play().catch((e=>console.error("Error playing preview video:",e)))}resetVideo(e){e.pause(),e.currentTime=0,e.load()}openPopup(e){const t=e.getAttribute("data-high-quality");t?(this.popupVideo.querySelector("source").src=t,this.popupVideo.load(),this.popupOverlay.style.display="flex",this.popupVideo.play().catch((e=>console.error("Error playing high-quality video:",e)))):console.warn("High-quality video URL not found")}attachPopupEvents(){this.closeButton.addEventListener("click",(()=>this.closePopup())),this.popupOverlay.addEventListener("click",(e=>{e.target===this.popupOverlay&&this.closePopup()}))}closePopup(){this.popupOverlay.style.display="none",this.popupVideo.pause(),this.popupVideo.currentTime=0,this.popupVideo.querySelector("source").src=""}}},519:function(e,t,o){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=i(o(398)),n=i(o(989));document.addEventListener("DOMContentLoaded",(()=>{var e;(new r.default).init();const t=document.querySelector(".portfolio__btn");null==t||t.addEventListener("click",(()=>{var e;null===(e=document.querySelector(".portfolio__viewport"))||void 0===e||e.classList.toggle("portfolio__viewport--full")}));const o=document.querySelector(".typing__bg-text");if(!o)return;const i=null!==(e=o.textContent)&&void 0!==e?e:"",[s,a]=i.split(",").map((e=>e.trim()));new n.default(document.querySelector(".typing__front-text"),{loop:!0,typingSpeed:100,deletingSpeed:30}).typeString(`${s},`).pauseFor(1e3).typeString(`\n${a}`).pauseFor(2e3).deleteAll().start()}))}},t={};function o(i){var r=t[i];if(void 0!==r)return r.exports;var n=t[i]={exports:{}};return e[i].call(n.exports,n,n.exports,o),n.exports}o(519),o(716)})();