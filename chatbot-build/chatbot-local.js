(()=>{const e="http://localhost:3001/i";let t=null;const n="interfaceData";let o={};const a=l("b1357e23-2fc6-4dc3-855a-7a213b1fa100"),d=l("91ee0bff-cfe3-4e2d-64e5-fadbd9a3a200"),i=document.getElementById("chatbot-main-script"),c=document.createElement("div");c.id="interfaceEmbed";const r=document.createElement("img");function l(e){return`https://imagedelivery.net/Vv7GgOGQbSyClWJqhyP0VQ/${e}/public`}r.id="popup-interfaceEmbed",r.className="chatbot-icon",r.alt="Ask Ai",r.src=d,c.appendChild(r),document.body.appendChild(c),i?["interfaceId","embedToken","threadId","bridgeName","variables","onOpen","onClose","theme","className","style","environment","fullScreen"].forEach((e=>{i.hasAttribute(e)&&(o[e]=i.getAttribute(e))})):console.log("Script tag not found"),closeChatbot=function(){if("block"===document.getElementById("iframe-parent-container")?.style?.display)return document.getElementById("iframe-parent-container").style.display="none",document.body.style.overflow="auto",document.getElementById("interfaceEmbed").style.display="unset",void window.parent?.postMessage({type:"close",data:{}},"*")};const m=e=>{o={...o,...e},s(e)},s=e=>{e.theme?document.getElementById("popup-interfaceEmbed").src="dark"===e.theme?a:d:!0===e.fullScreen||"true"===e.fullScreen?document.getElementById("iframe-parent-container")?.classList.add("full-screen"):!1!==e.fullScreen&&"false"!==e.fullScreen||document.getElementById("iframe-parent-container")?.classList.remove("full-screen")},p=setTimeout((()=>{window.removeEventListener("message",u),console.log("Event listener removed after 60 seconds")}),6e4);function u(e){const{type:o}=e.data;"interfaceLoaded"===o&&(t&&(console.log("data sent"),document.getElementById("iframe-component").contentWindow.postMessage({type:n,data:t},"*"),t=null),window.removeEventListener("message",u),clearTimeout(p),console.log("interfaceLoaded and event listener removed"))}const f=document.createElement("div");loadChatbotEmbed=async function(){const t=document.getElementById("chatbot-main-script")?.getAttribute("embedToken");let n=`${e}?`,o={};if(t)o={method:"POST",headers:{"Content-Type":"application/json",Authorization:t}};else{const e=document.getElementById("chatbot-main-script")?.getAttribute("interface_id");e&&(o={method:"POST",body:JSON.stringify({isAnonymousUser:!0,interface_id:e}),headers:{"Content-Type":"application/json"}})}fetch("http://localhost:7072/chatbot/loginuser",o).then((async e=>await e.json())).then((t=>{if(!document.getElementById("iframe-parent-container"))return;g=t?.data?.config,n=n.concat(`interfaceDetails=${JSON.stringify(t.data)}`);const o=document.getElementById("iframe-component")?.src?.split("?"),a=o?.[0];a!==e&&document.getElementById("iframe-component")&&(document.getElementById("iframe-component").src=n),g&&(g.title&&(y=g.title),g.buttonName&&(b=g.buttonName,document.getElementById("interfaceEmbed").innerText=b),g.type&&(document.getElementById("iframe-parent-container")?.classList.remove(`${E}-parent-container`),document.getElementById("interfaceEmbed")?.classList.remove(`${E}-interfaceEmbed`),E=g.type)),document.getElementById("iframe-parent-container")?.classList.add(`${E}-parent-container`),document.getElementById("interfaceEmbed")?.classList.add(`${E}-interfaceEmbed`),"all_space"===E?(document.getElementById("iframe-parent-container").style.height="100%",document.getElementById("iframe-parent-container").style.width="100%"):(console.log(g,234234),document.getElementById("iframe-parent-container").style.height=`${g?.height}${g?.heightUnit||""}`||"70vh",document.getElementById("iframe-parent-container").style.width=`${g?.width}${g?.widthUnit||""}`||"40vw")})).catch((e=>{console.log("Fetch error:",e)}))},loadContent=function(e=o.parentId){window.addEventListener("message",u);var t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.href="https://chatbot-embed.viasocket.com/style-local.css",document.head.appendChild(t),document.getElementById("iframe-parent-container")?(closeChatbot(),document.getElementById("iframe-component")&&(document.getElementById("iframe-component").src="")):(f.id="iframe-parent-container",f.className="popup-parent-container",f.style.display="none",f.innerHTML='\n            <button id=\'close-button\' onclick="closeChatbot()">\n            <svg width="35px" height="35px" viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(4.640000000000001,4.640000000000001), scale(0.71)"><rect x="-3.2" y="-3.2" width="38.40" height="38.40" rx="0" fill="#ffffff" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross-square</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-206.000000, -1037.000000)" fill="#000000"> <path d="M226.95,1056.54 C227.34,1056.93 227.34,1057.56 226.95,1057.95 C226.559,1058.34 225.926,1058.34 225.536,1057.95 L222,1054.41 L218.464,1057.95 C218.074,1058.34 217.441,1058.34 217.05,1057.95 C216.66,1057.56 216.66,1056.93 217.05,1056.54 L220.586,1053 L217.05,1049.46 C216.66,1049.07 216.66,1048.44 217.05,1048.05 C217.441,1047.66 218.074,1047.66 218.464,1048.05 L222,1051.59 L225.536,1048.05 C225.926,1047.66 226.559,1047.66 226.95,1048.05 C227.34,1048.44 227.34,1049.07 226.95,1049.46 L223.414,1053 L226.95,1056.54 L226.95,1056.54 Z M234,1037 L210,1037 C207.791,1037 206,1038.79 206,1041 L206,1065 C206,1067.21 207.791,1069 210,1069 L234,1069 C236.209,1069 238,1067.21 238,1065 L238,1041 C238,1038.79 236.209,1037 234,1037 L234,1037 Z" id="cross-square" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>\n            </button>\n        <iframe id="iframe-component" title="iframe"></iframe>\n  ',e?document.getElementById(e).appendChild(f):document.body.appendChild(f)),m({...o}),document.getElementById("interfaceEmbed").style.display="unset",loadChatbotEmbed()},document.addEventListener("DOMContentLoaded",loadContent),document?.body&&loadContent();const h=document.getElementById("iframe-component");h&&(h.onload=function(){console.log("ifram onload and remove event listener",t,"tempDataToSend"),h.contentWindow?.postMessage({type:n,data:t},"*")});let g={type:"popup",height:"100",heightUnit:"%",width:"50",widthUnit:"%",buttonName:""},y="Via socket",b="Chatbot",E="popup";SendDataToChatbot=function(e){(e.parentId||""===e.parentId)&&(console.log(o.parentId,"pehle wali value"),o.parentId?document.getElementById(o.parentId)?.removeChild(f):document.body.removeChild(f),m({parentId:e.parentId}),loadContent(e.parentId)),e.theme&&m({theme:e.theme||"dark"}),!0===e.fullScreen||"true"===e.fullScreen?m({fullScreen:e.fullScreen}):!1!==e.fullScreen&&"false"!==e.fullScreen||m({fullScreen:e.fullScreen}),e&&h&&(t=e,h.contentWindow?.postMessage({type:n,data:e},"*"))},openChatbot=function(){window.parent?.postMessage({type:"open",data:{}},"*"),document.getElementById("interfaceEmbed")&&document.getElementById("iframe-parent-container")&&(document.getElementById("interfaceEmbed").style.display="none",document.getElementById("iframe-parent-container").style.display="block",document.body.style.overflow="hidden")},document.getElementById("interfaceEmbed")?.addEventListener("click",(()=>{window.openChatbot()}))})();