(()=>{const e="https://chatbot.viasocket.com/i";let t=null,n=!1;const o="interfaceData";let i={};function c(e){return`https://imagedelivery.net/Vv7GgOGQbSyClWJqhyP0VQ/${e}/public`}const a=c("b1357e23-2fc6-4dc3-855a-7a213b1fa100"),d=c("91ee0bff-cfe3-4e2d-64e5-fadbd9a3a200");let s=document.getElementById("chatbot-main-script");const r=document.createElement("div");r.id="interfaceEmbed";const l=document.createElement("img");l.id="popup-interfaceEmbed",l.className="chatbot-icon-interfaceEmbed",l.alt="Ask Ai",l.src=d,l.style.visibility="hidden",r.appendChild(l);const m=document.createElement("span");m.id="popup-interfaceEmbed-text",r.appendChild(m),document.body.appendChild(r);var p=document.createElement("link");p.id="chatbotEmbed-style",p.rel="stylesheet",p.type="text/css",p.href="https://chatbot-embed.viasocket.com/style-prod.css",document.head.appendChild(p);const f=(e={})=>{i={...i,...e},u(e)},u=e=>{e.iconColor&&(document.getElementById("popup-interfaceEmbed").src="dark"===e.iconColor?a:d),!0!==e.fullScreen&&"true"!==e.fullScreen||document.getElementById("iframe-parent-container")?.classList.add("full-screen-interfaceEmbed"),!1!==e.fullScreen&&"false"!==e.fullScreen||document.getElementById("iframe-parent-container")?.classList.remove("full-screen-interfaceEmbed"),"hideIcon"in e&&document.getElementById("interfaceEmbed")&&(document.getElementById("interfaceEmbed").style.display=!0===e.hideIcon||"true"===e.hideIcon?"none":"unset"),"hideCloseButton"in e&&document.getElementById("close-button-interfaceEmbed")&&(document.getElementById("close-button-interfaceEmbed").style.display=!0===e.hideCloseButton||"true"===e.hideCloseButton?"none":"unset")};function y(){s?["interfaceId","embedToken","threadId","bridgeName","variables","onOpen","onClose","iconColor","className","style","environment","fullScreen","hideCloseButton","hideIcon","parentId","config"].forEach((e=>{if(s.hasAttribute(e)){let t=s.getAttribute(e);if("config"===e&&t)try{t=JSON.parse(t)}catch(e){console.log(e)}i[e]=t}})):console.log("Script tag not found")}y(),new MutationObserver((function(e,t){for(const n of e)if("childList"===n.type){for(const e of n.addedNodes)"chatbot-main-script"===e.id&&(s=document.getElementById("chatbot-main-script"),y());for(const e of n.removedNodes)if("chatbot-main-script"===e.id){console.log("Script tag removed, performing cleanup...");const e=document.getElementById("iframe-parent-container"),n=document.getElementById("interfaceEmbed"),o=document.getElementById("chatbotEmbed-style");n&&n.remove(),e&&e.remove(),o&&o.remove(),t.disconnect()}}})).observe(document.head,{childList:!0}),closeChatbot=function(){const e=document.getElementById("iframe-parent-container");if("block"===e?.style?.display)return e.style.transition="opacity 0.2s ease-in-out",e.style.opacity=0,void setTimeout((()=>{e.style.display="none",document.body.style.overflow="auto",document.getElementById("interfaceEmbed")&&(document.getElementById("interfaceEmbed").style.display=i?.hideIcon?"none":"unset"),window.parent?.postMessage({type:"close",data:{}},"*"),S.contentWindow?.postMessage({type:"close",data:{}},"*")}),200)};const h=setTimeout((()=>{window.removeEventListener("message",g),console.log("Event listener removed after 60 seconds")}),6e4);function g(e){const{type:n}=e.data;if("interfaceLoaded"===n){if(t){const e=JSON.parse(JSON.stringify(t));document.getElementById("iframe-component-interfaceEmbed").contentWindow.postMessage({type:o,data:e},"*"),t=null}window.removeEventListener("message",g),clearTimeout(h)}}let b=null,E={type:"popup",height:"100",heightUnit:"%",width:"50",widthUnit:"%",buttonName:""},w="Via socket",I="Chatbot",C="popup";function v(e){const t=document.getElementById("interfaceEmbed"),n=document.getElementById("iframe-parent-container");n&&(e&&(e.title&&(w=e.title),e.buttonName?(I=e.buttonName,m.innerText=I,t.classList.add("show-bg-color"),l&&(l.style.visibility="hidden")):(m.innerText="",t?.classList.remove("show-bg-color"),l&&(l.style.visibility="visible")),e.iconUrl&&(l&&(l.src=e.iconUrl),t?.classList.remove("show-bg-color"),m.innerText="",l&&(l.style.visibility="visible")),e.type&&n&&(n?.classList.forEach((e=>{e.endsWith("-parent-container")&&n.classList.remove(e)})),t?.classList.forEach((e=>{e.endsWith("-interfaceEmbed")&&t.classList.remove(e)})),n?.classList.add(`${e.type}-parent-container`),t?.classList.add(`${e.type}-interfaceEmbed`),C=e.type)),"all_available_space"===C?(n.style.height="100%",n.style.width="100%",n.style.display="block"):(n.style.height=`${e?.height}${e?.heightUnit||""}`||"70vh",n.style.width=`${e?.width}${e?.widthUnit||""}`||"40vw"))}loadChatbotEmbed=async function(){const t=document.getElementById("chatbot-main-script")?.getAttribute("embedToken");let n=`${e}?`,o={};if(t)o={method:"POST",headers:{"Content-Type":"application/json",Authorization:t}};else{const e=document.getElementById("chatbot-main-script")?.getAttribute("interface_id");e&&(o={method:"POST",body:JSON.stringify({isAnonymousUser:!0,interface_id:e}),headers:{"Content-Type":"application/json"}})}fetch("https://routes.msg91.com/api/proxy/1258584/32nghul25/chatbot/loginuser",o).then((async e=>await e.json())).then((t=>{if(!document.getElementById("iframe-parent-container"))return;E=t?.data?.config;const o=encodeURIComponent(`${JSON.stringify(t.data)}`);n=n.concat(`interfaceDetails=${o}`);const c=document.getElementById("iframe-component-interfaceEmbed")?.src?.split("?"),a=c?.[0];a!==e&&document.getElementById("iframe-component-interfaceEmbed")&&(document.getElementById("iframe-component-interfaceEmbed").src=n),E&&v({...E,...i?.config})})).catch((e=>{console.log("Fetch error:",e)}))};const B=function(e=i.parentId||"",t=n){t||(window.addEventListener("message",g),b||(b=document.createElement("div"),b.id="iframe-parent-container",b.className="popup-parent-container",b.style.display="none",b.innerHTML='\n        <button id=\'close-button-interfaceEmbed\' onclick="closeChatbot()">\n          <svg width="35px" height="35px" viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000">\n            <g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(4.640000000000001,4.640000000000001), scale(0.71)">\n              <rect x="-3.2" y="-3.2" width="38.40" height="38.40" rx="0" fill="#ffffff" strokewidth="0"></rect>\n            </g>\n            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>\n            <g id="SVGRepo_iconCarrier">\n              <title>cross-square</title>\n              <desc>Created with Sketch Beta.</desc>\n              <defs></defs>\n              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n                <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-206.000000, -1037.000000)" fill="#000000">\n                  <path d="M226.95,1056.54 C227.34,1056.93 227.34,1057.56 226.95,1057.95 C226.559,1058.34 225.926,1058.34 225.536,1057.95 L222,1054.41 L218.464,1057.95 C218.074,1058.34 217.441,1058.34 217.05,1057.95 C216.66,1057.56 216.66,1056.93 217.05,1056.54 L220.586,1053 L217.05,1049.46 C216.66,1049.07 216.66,1048.44 217.05,1048.05 C217.441,1047.66 218.074,1047.66 218.464,1048.05 L222,1051.59 L225.536,1048.05 C225.926,1047.66 226.559,1047.66 226.95,1048.05 C227.34,1048.44 227.34,1049.07 226.95,1049.46 L223.414,1053 L226.95,1056.54 L226.95,1056.54 Z M234,1037 L210,1037 C207.791,1037 206,1038.79 206,1041 L206,1065 C206,1067.21 207.791,1069 210,1069 L234,1069 C236.209,1069 238,1067.21 238,1065 L238,1041 C238,1038.79 236.209,1037 234,1037 L234,1037 Z" id="cross-square" sketch:type="MSShapeGroup"></path>\n                </g>\n              </g>\n            </g>\n          </svg>\n        </button>\n        <iframe id="iframe-component-interfaceEmbed" title="iframe" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>\n      '),L(e),n=!0,f({...i}),loadChatbotEmbed())},L=function(e){if(e&&document.getElementById(e)){const t=document.getElementById(e);t&&(t.style.position="relative",t.appendChild(b))}else document.getElementById("interface-chatbot")?document.getElementById("interface-chatbot").appendChild(b):document.body.appendChild(b)};document.addEventListener("DOMContentLoaded",B),document?.body&&B();const S=document.getElementById("iframe-component-interfaceEmbed");S?.contentWindow&&(S.onload=function(){try{const e=JSON.parse(JSON.stringify(t));S.contentWindow?.postMessage({type:o,data:e},"*")}catch(e){console.error("Error serializing data:",e)}}),SendDataToChatbot=function(e){if("hideCloseButton"in e&&f({hideCloseButton:e.hideCloseButton||!1}),"hideIcon"in e&&f({hideIcon:e.hideIcon||!1}),e.iconColor&&f({iconColor:e.iconColor||"dark"}),!0!==e.fullScreen&&"true"!==e.fullScreen||f({fullScreen:e.fullScreen}),!1!==e.fullScreen&&"false"!==e.fullScreen||f({fullScreen:e.fullScreen}),e&&S?.contentWindow&&(t=e,S.contentWindow?.postMessage({type:o,data:e},"*")),e.askAi&&S?.contentWindow&&S.contentWindow?.postMessage({type:"askAi",data:e||{}},"*"),"config"in e){const t={...E,...e?.config};v(t),f({config:t})}if("parentId"in e){const t=i.parentId;if(t!==e.parentId){if(t){const e=document.getElementById(t);e&&b&&e.contains(b)&&e.removeChild(b)}else b&&document.body.contains(b)&&document.body.removeChild(b);f({parentId:e.parentId}),L(e?.parentId||"")}}},openChatbot=function(){if(window.parent?.postMessage({type:"open",data:{}},"*"),S.contentWindow?.postMessage({type:"open",data:{}},"*"),document.getElementById("interfaceEmbed")&&document.getElementById("iframe-parent-container")){document.getElementById("interfaceEmbed").style.display="none";const e=document.getElementById("iframe-parent-container");e.style.display="block",e.style.opacity=0,e.style.transition="opacity 0.3s ease-in-out",requestAnimationFrame((()=>{e.style.opacity=1})),document.body.style.overflow="hidden"}},reloadChats=function(){S.contentWindow?.postMessage({type:"refresh",reload:!0},"*")},askAi=function(e){S.contentWindow?.postMessage({type:"askAi",data:e||""},"*")},document.getElementById("interfaceEmbed")?.addEventListener("click",(()=>{window.openChatbot()}))})();