(()=>{const e="https://face.viasocket.com/i";let t=!1;loadContent=function(){if(!t){var e=document.createElement("link");if(e.rel="stylesheet",e.type="text/css",e.href="https://interface-embed.viasocket.com/style-prod.css",document.head.appendChild(e),document.getElementById("iframe-parent-container"))closeIframe(),document.getElementById("iframe-component")&&(document.getElementById("iframe-component").src="");else{const e=document.createElement("div");e.id="iframe-parent-container",e.innerHTML='\n    <button id=\'close-button\' onclick="closeIframe()">\n    <svg width="35px" height="35px" viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(4.640000000000001,4.640000000000001), scale(0.71)"><rect x="-3.2" y="-3.2" width="38.40" height="38.40" rx="0" fill="#ffffff" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross-square</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-206.000000, -1037.000000)" fill="#000000"> <path d="M226.95,1056.54 C227.34,1056.93 227.34,1057.56 226.95,1057.95 C226.559,1058.34 225.926,1058.34 225.536,1057.95 L222,1054.41 L218.464,1057.95 C218.074,1058.34 217.441,1058.34 217.05,1057.95 C216.66,1057.56 216.66,1056.93 217.05,1056.54 L220.586,1053 L217.05,1049.46 C216.66,1049.07 216.66,1048.44 217.05,1048.05 C217.441,1047.66 218.074,1047.66 218.464,1048.05 L222,1051.59 L225.536,1048.05 C225.926,1047.66 226.559,1047.66 226.95,1048.05 C227.34,1048.44 227.34,1049.07 226.95,1049.46 L223.414,1053 L226.95,1056.54 L226.95,1056.54 Z M234,1037 L210,1037 C207.791,1037 206,1038.79 206,1041 L206,1065 C206,1067.21 207.791,1069 210,1069 L234,1069 C236.209,1069 238,1067.21 238,1065 L238,1041 C238,1038.79 236.209,1037 234,1037 L234,1037 Z" id="cross-square" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>\n    </button>\n  <iframe id="iframe-component" title="iframe"></iframe>',document.body.appendChild(e)}t=!0}},document.addEventListener("DOMContentLoaded",loadContent),document?.body&&loadContent();let n="",o="Via socket",i="open",a="popup";closeIframe=function(){if("block"===document.getElementById("iframe-parent-container")?.style?.display)return document.getElementById("iframe-parent-container").style.display="none",document.body.style.overflow="auto",document.getElementById("interfaceEmbed").style.display="unset",void window.parent?.postMessage({type:"close",data:{}},"*")},InitializeInterface=function(){iframeController()},SendDataToInterface=function(e){const t="interfaceData";document.getElementById("iframe-component").onload=function(){document.getElementById("iframe-component").contentWindow?.postMessage({type:t,data:e},"*")},e&&document.getElementById("iframe-component")&&document.getElementById("iframe-component").contentWindow?.postMessage({type:t,data:e},"*")},loadViasocketEmbed=async function(){const t=document.getElementById("interface-main-script")?.getAttribute("embedToken");let c=`${e}?`,d={};if(t)d={method:"POST",headers:{"Content-Type":"application/json",Authorization:t}};else{const e=document.getElementById("interface-main-script")?.getAttribute("interface_id");e&&(d={method:"POST",body:JSON.stringify({isAnonymousUser:!0,interface_id:e}),headers:{"Content-Type":"application/json"}})}fetch("https://flow-api.viasocket.com/interfaces/loginuser",d).then((async e=>await e.json())).then((t=>{n=t?.data?.config,c=c.concat(`interfaceDetails=${JSON.stringify(t.data)}`);const d=document.getElementById("iframe-component")?.src?.split("?"),r=d?.[0];r!==e&&document.getElementById("iframe-component")&&(document.getElementById("iframe-component").src=c),n&&(n.title&&(o=n.title),n.buttonName&&(i=n.buttonName,document.getElementById("interfaceEmbed").innerText=i),n.type&&(document.getElementById("iframe-parent-container").classList.remove(`${a}-parent-container`),document.getElementById("interfaceEmbed").classList.remove(`${a}-interfaceEmbed`),a=n.type)),document.getElementById("iframe-parent-container").classList.add(`${a}-parent-container`),document.getElementById("interfaceEmbed").classList.add(`${a}-interfaceEmbed`),"all_space"===a?(document.getElementById("iframe-parent-container").style.height="100%",document.getElementById("iframe-parent-container").style.width="100%"):(document.getElementById("iframe-parent-container").style.height=`${n?.height}${n?.heightUnit||""}`||"70vh",document.getElementById("iframe-parent-container").style.width=`${n?.width}${n?.widthUnit||""}`||"40vw")})).catch((e=>{console.log("Fetch error:",e)}))},iframeController=function(){document.getElementById("interfaceEmbed")&&document.getElementById("iframe-parent-container")&&(document.getElementById("interfaceEmbed").style.display="none",document.getElementById("iframe-parent-container").style.display="block",document.getElementById("title").innerText=o||"Viasocket",document.body.style.overflow="hidden")},loadViasocketEmbed(),document.getElementById("interfaceEmbed").addEventListener("click",(()=>{window.InitializeInterface()}))})();