(()=>{const e="https://chatbot.viasocket.com/i";let t=null,n=!1;const o="interfaceData";let d={};const i=f("b1357e23-2fc6-4dc3-855a-7a213b1fa100"),a=f("91ee0bff-cfe3-4e2d-64e5-fadbd9a3a200");let c=document.getElementById("chatbot-main-script");const r=document.createElement("div");r.id="interfaceEmbed";const l=document.createElement("img");l.id="popup-interfaceEmbed",l.className="chatbot-icon-interfaceEmbed",l.alt="Ask Ai",l.src=a,r.appendChild(l),document.body.appendChild(r);var s=document.createElement("link");s.id="chatbotEmbed-style",s.rel="stylesheet",s.type="text/css",s.href="https://chatbot-embed.viasocket.com/style-prod.css",document.head.appendChild(s);const m=(e={})=>{d={...d,...e},p(e)},p=e=>{e.iconColor&&(document.getElementById("popup-interfaceEmbed").src="dark"===e.iconColor?i:a),!0!==e.fullScreen&&"true"!==e.fullScreen||document.getElementById("iframe-parent-container")?.classList.add("full-screen-interfaceEmbed"),!1!==e.fullScreen&&"false"!==e.fullScreen||document.getElementById("iframe-parent-container")?.classList.remove("full-screen-interfaceEmbed"),"hideIcon"in e&&document.getElementById("interfaceEmbed")&&(document.getElementById("interfaceEmbed").style.display=!0===e.hideIcon||"true"===e.hideIcon?"none":"unset"),"hideCloseButton"in e&&document.getElementById("close-button-interfaceEmbed")&&(document.getElementById("close-button-interfaceEmbed").style.display=!0===e.hideCloseButton||"true"===e.hideCloseButton?"none":"unset")};function u(){c?(["interfaceId","embedToken","threadId","bridgeName","variables","onOpen","onClose","iconColor","className","style","environment","fullScreen","hideCloseButton","hideIcon","parentId"].forEach((e=>{c.hasAttribute(e)&&(d[e]=c.getAttribute(e))})),console.log("loop pura chal gya hai")):console.log("Script tag not found")}function f(e){return`https://imagedelivery.net/Vv7GgOGQbSyClWJqhyP0VQ/${e}/public`}u(),new MutationObserver((function(e,t){for(const n of e)if("childList"===n.type){for(const e of n.addedNodes)"chatbot-main-script"===e.id&&(console.log("Script tag added"),c=document.getElementById("chatbot-main-script"),u());for(const e of n.removedNodes)if("chatbot-main-script"===e.id){console.log("Script tag removed, performing cleanup...");const e=document.getElementById("iframe-parent-container"),n=document.getElementById("interfaceEmbed"),o=document.getElementById("chatbotEmbed-style");n&&(console.log("removing iframe"),n.remove()),e&&(console.log("removing button"),e.remove()),o&&(console.log("removing style tag"),o.remove()),t.disconnect()}}})).observe(document.head,{childList:!0}),closeChatbot=function(){if("block"===document.getElementById("iframe-parent-container")?.style?.display)return document.getElementById("iframe-parent-container").style.display="none",document.body.style.overflow="auto",document.getElementById("interfaceEmbed").style.display=d?.hideCloseButton?"none":"unset",void window.parent?.postMessage({type:"close",data:{}},"*")};const h=setTimeout((()=>{window.removeEventListener("message",g),console.log("Event listener removed after 60 seconds")}),6e4);function g(e){const{type:n}=e.data;"interfaceLoaded"===n&&(t&&(console.log("data sent"),document.getElementById("iframe-component-interfaceEmbed").contentWindow.postMessage({type:o,data:t},"*"),t=null),window.removeEventListener("message",g),clearTimeout(h),console.log("interfaceLoaded and event listener removed"))}let y=null;loadChatbotEmbed=async function(){const t=document.getElementById("chatbot-main-script")?.getAttribute("embedToken");let n=`${e}?`,o={};if(t)o={method:"POST",headers:{"Content-Type":"application/json",Authorization:t}};else{const e=document.getElementById("chatbot-main-script")?.getAttribute("interface_id");e&&(o={method:"POST",body:JSON.stringify({isAnonymousUser:!0,interface_id:e}),headers:{"Content-Type":"application/json"}})}fetch("https://routes.msg91.com/api/proxy/1258584/29ipuks30/chatbot/loginuser",o).then((async e=>await e.json())).then((t=>{if(!document.getElementById("iframe-parent-container"))return;I=t?.data?.config;const o=encodeURIComponent(`${JSON.stringify(t.data)}`);n=n.concat(`interfaceDetails=${o}`);const d=document.getElementById("iframe-component-interfaceEmbed")?.src?.split("?"),i=d?.[0];i!==e&&document.getElementById("iframe-component-interfaceEmbed")&&(document.getElementById("iframe-component-interfaceEmbed").src=n),I&&(I.title&&(C=I.title),I.buttonName&&(v=I.buttonName,document.getElementById("interfaceEmbed").innerText=v),I.type&&(document.getElementById("iframe-parent-container")?.classList.remove(`${B}-parent-container`),document.getElementById("interfaceEmbed")?.classList.remove(`${B}-interfaceEmbed`),B=I.type)),document.getElementById("iframe-parent-container")?.classList.add(`${B}-parent-container`),document.getElementById("interfaceEmbed")?.classList.add(`${B}-interfaceEmbed`),"all_space"===B?(document.getElementById("iframe-parent-container").style.height="100%",document.getElementById("iframe-parent-container").style.width="100%"):(document.getElementById("iframe-parent-container").style.height=`${I?.height}${I?.heightUnit||""}`||"70vh",document.getElementById("iframe-parent-container").style.width=`${I?.width}${I?.widthUnit||""}`||"40vw")})).catch((e=>{console.log("Fetch error:",e)}))};const b=function(e=d.parentId||"",t=n){if(console.log(t,"=-=-=-=",e,"new value"),!t){if(y||(y=document.createElement("div"),y.id="iframe-parent-container",y.className="popup-parent-container",y.style.display="none",y.innerHTML='\n        <button id=\'close-button-interfaceEmbed\' onclick="closeChatbot()">\n          <svg width="35px" height="35px" viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000">\n            <g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(4.640000000000001,4.640000000000001), scale(0.71)">\n              <rect x="-3.2" y="-3.2" width="38.40" height="38.40" rx="0" fill="#ffffff" strokewidth="0"></rect>\n            </g>\n            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>\n            <g id="SVGRepo_iconCarrier">\n              <title>cross-square</title>\n              <desc>Created with Sketch Beta.</desc>\n              <defs></defs>\n              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n                <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-206.000000, -1037.000000)" fill="#000000">\n                  <path d="M226.95,1056.54 C227.34,1056.93 227.34,1057.56 226.95,1057.95 C226.559,1058.34 225.926,1058.34 225.536,1057.95 L222,1054.41 L218.464,1057.95 C218.074,1058.34 217.441,1058.34 217.05,1057.95 C216.66,1057.56 216.66,1056.93 217.05,1056.54 L220.586,1053 L217.05,1049.46 C216.66,1049.07 216.66,1048.44 217.05,1048.05 C217.441,1047.66 218.074,1047.66 218.464,1048.05 L222,1051.59 L225.536,1048.05 C225.926,1047.66 226.559,1047.66 226.95,1048.05 C227.34,1048.44 227.34,1049.07 226.95,1049.46 L223.414,1053 L226.95,1056.54 L226.95,1056.54 Z M234,1037 L210,1037 C207.791,1037 206,1038.79 206,1041 L206,1065 C206,1067.21 207.791,1069 210,1069 L234,1069 C236.209,1069 238,1067.21 238,1065 L238,1041 C238,1038.79 236.209,1037 234,1037 L234,1037 Z" id="cross-square" sketch:type="MSShapeGroup"></path>\n                </g>\n              </g>\n            </g>\n          </svg>\n        </button>\n        <iframe id="iframe-component-interfaceEmbed" title="iframe"></iframe>\n      '),e){console.log(1);const t=document.getElementById(e);t&&(t.style.position="relative",t.appendChild(y))}else document.getElementById("interface-chatbot")?(console.log(2),document.getElementById("interface-chatbot").appendChild(y)):(console.log(3),document.body.appendChild(y));n=!0,m({...d}),loadChatbotEmbed()}};document.addEventListener("DOMContentLoaded",b),document?.body&&b();const E=document.getElementById("iframe-component-interfaceEmbed");E&&(E.onload=function(){console.log("ifram onload and remove event listener",t,"tempDataToSend"),E.contentWindow?.postMessage({type:o,data:t},"*")});let I={type:"popup",height:"100",heightUnit:"%",width:"50",widthUnit:"%",buttonName:""},C="Via socket",v="Chatbot",B="popup";SendDataToChatbot=function(e){if("parentId"in e&&(console.log(d.parentId,"previous value"),d.parentId!==e.parentId)){if(!d.parentId&&y&&document.body.contains(y))document.body.removeChild(y);else if(d.parentId){const e=document.getElementById(d.parentId);e&&y&&e.removeChild(y)}m({parentId:e.parentId}),b(e.parentId,!1)}"hideCloseButton"in e&&m({hideCloseButton:e.hideCloseButton||!1}),"hideIcon"in e&&m({hideIcon:e.hideIcon||!1}),e.iconColor&&m({iconColor:e.iconColor||"dark"}),!0===e.fullScreen||"true"===e.fullScreen?m({fullScreen:e.fullScreen}):!1!==e.fullScreen&&"false"!==e.fullScreen||m({fullScreen:e.fullScreen}),e&&E&&(t=e,E.contentWindow?.postMessage({type:o,data:e},"*"))},openChatbot=function(){window.parent?.postMessage({type:"open",data:{}},"*"),document.getElementById("interfaceEmbed")&&document.getElementById("iframe-parent-container")&&(document.getElementById("interfaceEmbed").style.display="none",document.getElementById("iframe-parent-container").style.display="block",document.body.style.overflow="hidden")},reloadChats=function(){E.contentWindow?.postMessage({type:"refresh",reload:!0},"*")},document.getElementById("interfaceEmbed")?.addEventListener("click",(()=>{window.openChatbot()}))})();