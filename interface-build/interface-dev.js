(()=>{const e="https://dev-interface.viasocket.com/i";var t=document.createElement("button");let n="",o="Via socket",i="open";t.setAttribute("type","button"),t.setAttribute("class","close-button"),t.setAttribute("id","close-button"),t.textContent="close",t.style.position="absolute";let a="popup";t.style.top="2px",t.style.right="2px",t.addEventListener("click",(()=>{if("block"===document.getElementById("iframe-parent-container")?.style?.display)return document.getElementById("iframe-parent-container").style.display="none",document.body.style.overflow="auto",document.getElementById("interfaceEmbed").style.display="unset",void window.parent?.postMessage({type:"close",data:{}},"*")})),document.getElementById("iframe-parent-container")?.appendChild(t),InitializeInterface=function(){iframeController()},SendDataToInterface=function(e){const t="interfaceData";document.getElementById("iframe-component").onload=function(){document.getElementById("iframe-component").contentWindow?.postMessage({type:t,data:e},"*")},e&&document.getElementById("iframe-component")&&document.getElementById("iframe-component").contentWindow?.postMessage({type:t,data:e},"*")},loadViasocketEmbed=async function(){const t=document.getElementById("interface-main-script")?.getAttribute("embedToken");let c=`${e}?`,d={};if(t)d={method:"POST",headers:{"Content-Type":"application/json",Authorization:t}};else{const e=document.getElementById("interface-main-script")?.getAttribute("interface_id");e&&(d={method:"POST",body:JSON.stringify({isAnonymousUser:!0,interface_id:e}),headers:{"Content-Type":"application/json"}})}fetch("https://dev-api.viasocket.com/interfaces/loginuser",d).then((async e=>await e.json())).then((t=>{n=t?.data?.config,c=c.concat(`interfaceDetails=${JSON.stringify(t.data)}`);const d=document.getElementById("iframe-component")?.src?.split("?"),m=d?.[0];m!==e&&document.getElementById("iframe-component")&&(document.getElementById("iframe-component").src=c),n&&(n.title&&(o=n.title),n.buttonName&&(i=n.buttonName,document.getElementById("interfaceEmbed").innerText=i),n.type&&(document.getElementById("iframe-parent-container").classList.remove(`${a}-parent-container`),document.getElementById("interfaceEmbed").classList.remove(`${a}-interfaceEmbed`),a=n.type)),document.getElementById("iframe-parent-container").classList.add(`${a}-parent-container`),document.getElementById("interfaceEmbed").classList.add(`${a}-interfaceEmbed`),"all_space"===a?(document.getElementById("iframe-parent-container").style.height="100%",document.getElementById("iframe-parent-container").style.width="100%"):(document.getElementById("iframe-parent-container").style.height=`${n?.height}${n?.heightUnit||""}`||"70vh",document.getElementById("iframe-parent-container").style.width=`${n?.width}${n?.widthUnit||""}`||"40vw")})).catch((e=>{console.log("Fetch error:",e)}))},iframeController=function(){document.getElementById("interfaceEmbed")&&document.getElementById("iframe-parent-container")&&(document.getElementById("interfaceEmbed").style.display="none",document.getElementById("iframe-parent-container").style.display="block",document.getElementById("title").innerText=o||"Viasocket",document.body.style.overflow="hidden")},loadViasocketEmbed(),document.getElementById("interfaceEmbed").addEventListener("click",(()=>{window.InitializeInterface()}))})();