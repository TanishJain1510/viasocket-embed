(()=>{function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t,n){for(var o=0;o<n.length;o++){var r=n[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,i=function(t,n){if("object"!==e(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var r=o.call(t,"string");if("object"!==e(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===e(i)?i:String(i)),r)}var i}function n(e){var t="function"==typeof Map?new Map:void 0;return n=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return o(e,arguments,c(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),i(r,e)},n(e)}function o(e,t,n){return o=r()?Reflect.construct.bind():function(e,t,n){var o=[null];o.push.apply(o,t);var r=new(Function.bind.apply(e,o));return n&&i(r,n.prototype),r},o.apply(null,arguments)}function r(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function i(e,t){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},i(e,t)}function c(e){return c=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},c(e)}var u="viasocket-embed",a="iframe-template-type",l=function(n){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&i(e,t)}(d,n);var o,l,f,s,p=(f=d,s=r(),function(){var t,n=c(f);if(s){var o=c(this).constructor;t=Reflect.construct(n,arguments,o)}else t=n.apply(this,arguments);return function(t,n){if(n&&("object"===e(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)}(this,t)});function d(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,d),p.apply(this,arguments)}return o=d,(l=[{key:"connectedCallback",value:function(){this.addEventListener("click",this.handleClick.bind(this))}},{key:"handleClick",value:function(){var e=this.getAttribute("flowId")||"",t={viasocketEmbedToken:this.dataset.accessToken,embedFlowId:e},n=document.createElement("div"),o=document.createElement("div"),r=document.createElement("img");o.setAttribute(a,u),n.setAttribute("iframe-parent-template-type",u);var i=JSON.stringify(t),c="https://flow.viasocket.com/embed?viasocketEmbedDetails=".concat(i);r.src="https://embed.viasocket.com/close-icon.svg",r.alt="Close",r.style.width="24px",r.classList.add("wc-slider-close-btn");var l=document.createElement("iframe");l.setAttribute(a,u),l.src=c,l.style.width="100%",l.style.height="100%",o.appendChild(l),o.appendChild(r),n.appendChild(o),document.body.appendChild(n),document.body.style.overflow="hidden",l.addEventListener("error",(function(e){console.log("iframe error",e)})),r.addEventListener("click",(function(){document.body.removeChild(n),document.body.style.overflow="auto"}))}}])&&t(o.prototype,l),Object.defineProperty(o,"prototype",{writable:!1}),d}(n(HTMLElement));customElements.define("viasocket-embed",l),initViaSocketEmbed=function(e){var t=document.querySelectorAll("viasocket-embed");if(!t)throw new Error("viasocket-embed element not found");t.forEach((function(t){t.dataset.accessToken=e.accessToken}))}})();