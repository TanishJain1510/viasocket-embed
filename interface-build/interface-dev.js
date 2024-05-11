(()=>{const e="https://dev-interface.viasocket.com/i";let t=null,n=!1;const o="interfaceData";let a={};const i=d("b1357e23-2fc6-4dc3-855a-7a213b1fa100"),c=d("91ee0bff-cfe3-4e2d-64e5-fadbd9a3a200"),r=document.getElementById("interface-main-script");function d(e){return`https://imagedelivery.net/Vv7GgOGQbSyClWJqhyP0VQ/${e}/public`}r?["interfaceId","embedToken","threadId","bridgeName","variables","onOpen","onClose","theme","className","style","environment","fullScreen"].forEach((e=>{r.hasAttribute(e)&&(a[e]=r.getAttribute(e))})):console.log("Script tag not found"),closeIframe=function(){if("block"===document.getElementById("iframe-parent-container")?.style?.display)return document.getElementById("iframe-parent-container").style.display="none",document.body.style.overflow="auto",document.getElementById("interfaceEmbed").style.display="unset",void window.parent?.postMessage({type:"close",data:{}},"*")};const l=e=>{a={...a,...e},m(e)},m=e=>{e.theme?document.getElementById("popup-interfaceEmbed").src="dark"===e.theme?i:c:!0===e.fullScreen||"true"===e.fullScreen?document.getElementById("iframe-parent-container")?.classList.add("full-screen"):!1!==e.fullScreen&&"false"!==e.fullScreen||document.getElementById("iframe-parent-container")?.classList.remove("full-screen")},s=setTimeout((()=>{window.removeEventListener("message",f),console.log("Event listener removed after 60 seconds")}),6e4);function f(e){const{type:n}=e.data;"interfaceLoaded"===n&&(t&&(console.log("data sent"),document.getElementById("iframe-component").contentWindow.postMessage({type:o,data:t},"*"),t=null),window.removeEventListener("message",f),clearTimeout(s),console.log("interfaceLoaded and event listener removed"))}loadContent=function(){if(!n){window.addEventListener("message",f);var e=document.createElement("link");if(e.rel="stylesheet",e.type="text/css",e.href="https://interface-embed.viasocket.com/style-dev.css",document.head.appendChild(e),document.getElementById("iframe-parent-container"))closeIframe(),document.getElementById("iframe-component")&&(document.getElementById("iframe-component").src="");else{const e=document.createElement("div");e.id="iframe-parent-container",e.className="popup-parent-container",e.style.display="none",e.innerHTML='\n            <button id=\'close-button\' onclick="closeIframe()">\n            <svg width="35px" height="35px" viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(4.640000000000001,4.640000000000001), scale(0.71)"><rect x="-3.2" y="-3.2" width="38.40" height="38.40" rx="0" fill="#ffffff" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross-square</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-206.000000, -1037.000000)" fill="#000000"> <path d="M226.95,1056.54 C227.34,1056.93 227.34,1057.56 226.95,1057.95 C226.559,1058.34 225.926,1058.34 225.536,1057.95 L222,1054.41 L218.464,1057.95 C218.074,1058.34 217.441,1058.34 217.05,1057.95 C216.66,1057.56 216.66,1056.93 217.05,1056.54 L220.586,1053 L217.05,1049.46 C216.66,1049.07 216.66,1048.44 217.05,1048.05 C217.441,1047.66 218.074,1047.66 218.464,1048.05 L222,1051.59 L225.536,1048.05 C225.926,1047.66 226.559,1047.66 226.95,1048.05 C227.34,1048.44 227.34,1049.07 226.95,1049.46 L223.414,1053 L226.95,1056.54 L226.95,1056.54 Z M234,1037 L210,1037 C207.791,1037 206,1038.79 206,1041 L206,1065 C206,1067.21 207.791,1069 210,1069 L234,1069 C236.209,1069 238,1067.21 238,1065 L238,1041 C238,1038.79 236.209,1037 234,1037 L234,1037 Z" id="cross-square" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>\n            </button>\n        <iframe id="iframe-component" title="iframe"></iframe>\n  ';const t=document.createElement("div");t.id="interfaceEmbed";const n=document.createElement("img");n.id="popup-interfaceEmbed",n.className="chatbot-icon",n.alt="Ask Ai",n.src=c,t.appendChild(n),document.body.appendChild(t),document.getElementById("interface-chatbot")?document.getElementById("interface-chatbot").appendChild(e):document.body.appendChild(e)}n=!0,l({...a})}},document.addEventListener("DOMContentLoaded",loadContent),document?.body&&loadContent();const p=document.getElementById("iframe-component");p&&(p.onload=function(){console.log("ifram onload and remove event listener",t,"tempDataToSend"),p.contentWindow?.postMessage({type:o,data:t},"*")});let u="",g="Via socket",y="open",h="popup";InitializeInterface=function(){iframeController()},SendDataToInterface=function(e){e.theme&&l({theme:e.theme||"dark"}),!0===e.fullScreen||"true"===e.fullScreen?l({fullScreen:e.fullScreen}):!1!==e.fullScreen&&"false"!==e.fullScreen||l({fullScreen:e.fullScreen}),e&&p&&(t=e,p.contentWindow?.postMessage({type:o,data:e},"*"))},loadInterfaceEmbed=async function(){const t=document.getElementById("interface-main-script")?.getAttribute("embedToken");let n=`${e}?`,o={};if(t)o={method:"POST",headers:{"Content-Type":"application/json",Authorization:t}};else{const e=document.getElementById("interface-main-script")?.getAttribute("interface_id");e&&(o={method:"POST",body:JSON.stringify({isAnonymousUser:!0,interface_id:e}),headers:{"Content-Type":"application/json"}})}fetch("https://dev-api.viasocket.com/interfaces/loginuser",o).then((async e=>await e.json())).then((t=>{if(!document.getElementById("iframe-parent-container"))return;u=t?.data?.config,n=n.concat(`interfaceDetails=${JSON.stringify(t.data)}`);const o=document.getElementById("iframe-component")?.src?.split("?"),a=o?.[0];a!==e&&document.getElementById("iframe-component")&&(document.getElementById("iframe-component").src=n),u&&(u.title&&(g=u.title),u.buttonName&&(y=u.buttonName,document.getElementById("interfaceEmbed").innerText=y),u.type&&(document.getElementById("iframe-parent-container")?.classList.remove(`${h}-parent-container`),document.getElementById("interfaceEmbed")?.classList.remove(`${h}-interfaceEmbed`),h=u.type)),document.getElementById("iframe-parent-container")?.classList.add(`${h}-parent-container`),document.getElementById("interfaceEmbed")?.classList.add(`${h}-interfaceEmbed`),"all_space"===h?(document.getElementById("iframe-parent-container").style.height="100%",document.getElementById("iframe-parent-container").style.width="100%"):(document.getElementById("iframe-parent-container").style.height=`${u?.height}${u?.heightUnit||""}`||"70vh",document.getElementById("iframe-parent-container").style.width=`${u?.width}${u?.widthUnit||""}`||"40vw")})).catch((e=>{console.log("Fetch error:",e)}))},iframeController=function(){window.parent?.postMessage({type:"open",data:{}},"*"),document.getElementById("interfaceEmbed")&&document.getElementById("iframe-parent-container")&&(document.getElementById("interfaceEmbed").style.display="none",document.getElementById("iframe-parent-container").style.display="block",document.body.style.overflow="hidden")},loadInterfaceEmbed(),document.getElementById("interfaceEmbed")?.addEventListener("click",(()=>{window.InitializeInterface()}))})();