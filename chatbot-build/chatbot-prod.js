(()=>{const e=new class{constructor(){this.props={},this.parentContainer=null,this.config={type:"popup",height:"100",heightUnit:"%",width:"50",widthUnit:"%",buttonName:""},this.urls={chatbotUrl:"https://chatbot.gtwy.ai/chatbot",styleSheet:"https://chatbot-embed.viasocket.com/style-prod.css",login:"https://db.gtwy.ai/chatbot/loginuser"},this.icons={white:this.makeImageUrl("b1357e23-2fc6-4dc3-855a-7a213b1fa100"),black:this.makeImageUrl("91ee0bff-cfe3-4e2d-64e5-fadbd9a3a200")},this.state={bodyLoaded:!1,fullscreen:!1,tempDataToSend:null},this.initializeEventListeners()}makeImageUrl(e){return`https://imagedelivery.net/Vv7GgOGQbSyClWJqhyP0VQ/${e}/public`}createChatbotIcon(){const e=document.createElement("div");e.id="interfaceEmbed";const t=document.createElement("img");t.id="popup-interfaceEmbed",t.alt="Ask Ai",t.src=this.icons.black,t.style.visibility="hidden",e.appendChild(t);const n=document.createElement("span");return n.id="popup-interfaceEmbed-text",e.appendChild(n),{chatBotIcon:e,imgElement:t,textElement:n}}createStyleLink(){const e=document.createElement("link");return e.id="chatbotEmbed-style",e.rel="stylesheet",e.type="text/css",e.href=this.urls.styleSheet,e}extractScriptProps(){const e=document.getElementById("chatbot-main-script");return e?["interfaceId","embedToken","threadId","bridgeName","variables","onOpen","onClose","iconColor","className","style","environment","fullScreen","hideCloseButton","hideIcon","parentId","config","headerButtons","eventsToSubscribe","modalConfig","allowModalSwitch","chatTitle","chatIcon"].reduce(((t,n)=>{if(e.hasAttribute(n)){let o=e.getAttribute(n);if(["config","headerButtons","eventsToSubscribe","modalConfig"].includes(n))try{o=JSON.parse(o)}catch(e){console.error(`Error parsing ${n}:`,e)}t[n]=o,this.state.tempDataToSend={...this.state.tempDataToSend,[n]:o}}return t}),{}):(console.log("Script tag not found"),{})}initializeEventListeners(){this.observeScriptChanges(),this.setupMessageListeners(),this.setupResizeObserver()}observeScriptChanges(){new MutationObserver((e=>{for(const t of e)"childList"===t.type&&this.handleScriptMutations(t)})).observe(document.head,{childList:!0})}handleScriptMutations(e){e.addedNodes.forEach((e=>{"chatbot-main-script"===e.id&&(this.props=this.extractScriptProps())})),e.removedNodes.forEach((e=>{"chatbot-main-script"===e.id&&this.cleanupChatbot()}))}cleanupChatbot(){["iframe-parent-container","interfaceEmbed","chatbotEmbed-style"].forEach((e=>{const t=document.getElementById(e);t&&t.remove()}))}setupMessageListeners(){window.addEventListener("message",this.handleIncomingMessages.bind(this))}handleIncomingMessages(e){const{type:t,data:n}=e.data||{};switch(t){case"CLOSE_CHATBOT":this.closeChatbot();break;case"ENTER_FULL_SCREEN_CHATBOT":this.toggleFullscreen(!0);break;case"EXIT_FULL_SCREEN_CHATBOT":this.toggleFullscreen(!1);break;case"interfaceLoaded":this.sendInitialData()}}setupResizeObserver(){new ResizeObserver((e=>{const t=document.getElementById("iframe-parent-container");if(!t||this.state.fullscreen)return;const{width:n}=e[0].contentRect;n<600?(t.style.height="100%",t.style.width="100%"):this.applyConfig(this?.props?.config||{})})).observe(document.documentElement)}openChatbot(){const e=document.getElementById("interfaceEmbed"),t=document.getElementById("iframe-parent-container");e&&t&&(e.style.display="none",t.style.display="block",t.style.opacity=0,t.style.transition="opacity 0.3s ease-in-out",requestAnimationFrame((()=>{t.style.opacity=1}))),window.parent&&window.parent.postMessage?.({type:"open",data:{}},"*"),window.ReactNativeWebView&&window.ReactNativeWebView.postMessage?.(JSON.stringify({type:"open",data:{}}));const n=document.getElementById("iframe-component-interfaceEmbed");n?.contentWindow?.postMessage({type:"open",data:{}},"*")}closeChatbot(){const e=document.getElementById("iframe-parent-container");"block"===e?.style?.display&&(e.style.transition="opacity 0.2s ease-in-out",e.style.opacity=0,setTimeout((()=>{window.parent&&window.parent.postMessage?.({type:"close",data:{}},"*"),window.ReactNativeWebView&&window.ReactNativeWebView.postMessage?.(JSON.stringify({type:"close",data:{}})),e.style.display="none";const t=document.getElementById("interfaceEmbed");t&&(t.style.display=!0===this.props.hideIcon||"true"===this.props.hideIcon?"none":"unset")}),100))}toggleFullscreen(e){const t=document.getElementById("iframe-parent-container");this.state.fullscreen=e,t&&(t.style.transition="width 0.3s ease-in-out, height 0.3s ease-in-out",e?(t.style.width="100%",t.style.height="100%"):(t.style.height=`${this.props?.config?.height}${this.props?.config?.heightUnit||""}`||"70vh",t.style.width=`${this.props?.config?.width}${this.props?.config?.widthUnit||""}`||"40vw"))}async initializeChatbot(){document.addEventListener("DOMContentLoaded",this.loadContent.bind(this)),document?.body&&this.loadContent()}loadContent(){if(this.state.bodyLoaded)return;const{chatBotIcon:e,imgElement:t,textElement:n}=this.createChatbotIcon();document.body.appendChild(e),document.head.appendChild(this.createStyleLink()),this.attachIconEvents(e),this.createIframeContainer(),this.loadChatbotEmbed(),this.state.bodyLoaded=!0,this.updateProps(this.extractScriptProps())}createIframeContainer(){this.parentContainer=document.createElement("div"),this.parentContainer.id="iframe-parent-container",this.parentContainer.className="popup-parent-container",this.parentContainer.style.display="none";const e=document.createElement("iframe");e.id="iframe-component-interfaceEmbed",e.title="iframe",e.setAttribute("sandbox","allow-scripts allow-same-origin allow-popups"),this.parentContainer.appendChild(e);const t=this.props.parentId||"";this.changeContainer(t,this.parentContainer)}changeContainer(e,t=this.parentContainer){if(e&&document.getElementById(e)){const n=document.getElementById(e);n.style.position="relative",this.parentContainer.style.position="absolute",n.appendChild(t)}else document.getElementById("interface-chatbot")?document.getElementById("interface-chatbot").appendChild(t):document.body.appendChild(t)}attachIconEvents(e){e.addEventListener("click",(()=>window.openChatbot()))}async loadChatbotEmbed(){try{const e=await this.fetchChatbotDetails();this.processChatbotDetails(e)}catch(e){console.error("Chatbot embed loading error:",e)}}async fetchChatbotDetails(){try{const e=document.getElementById("chatbot-main-script"),t=e?.getAttribute("embedToken"),n=e?.getAttribute("interface_id"),o=t?this.createTokenBasedRequest(t):this.createAnonymousRequest(n);return(await fetch(this.urls.login,o)).json()}catch(e){console.error("Fetch login user error:",e)}}createTokenBasedRequest(e){return{method:"POST",headers:{"Content-Type":"application/json",Authorization:e}}}createAnonymousRequest(e){return{method:"POST",body:JSON.stringify({isAnonymousUser:!0,interface_id:e}),headers:{"Content-Type":"application/json"}}}processChatbotDetails(e){const t=document.getElementById("iframe-component-interfaceEmbed");if(!t)return;this.props.config={...this.props?.config,...e?.data?.config};const n=encodeURIComponent(JSON.stringify(e.data)),o=`${this.urls.chatbotUrl}?interfaceDetails=${n}`;t.src=o,this.applyConfig(this.props?.config)}applyConfig(e={}){const t=document.getElementById("interfaceEmbed"),n=document.getElementById("iframe-parent-container");if(n){if(e&&Object.keys(e).length>0){if(e.title&&(this.title=e.title),e.buttonName){this.buttonName=e.buttonName,document.getElementById("popup-interfaceEmbed-text").innerText=this.buttonName,t.classList.add("show-bg-color");const n=document.getElementById("popup-interfaceEmbed");n&&(n.style.visibility="hidden")}else{document.getElementById("popup-interfaceEmbed-text").innerText="",t?.classList.remove("show-bg-color");const e=document.getElementById("popup-interfaceEmbed");e&&(e.style.visibility="visible")}if(e.iconUrl){const n=document.getElementById("popup-interfaceEmbed");n&&(n.src=e.iconUrl),t?.classList.remove("show-bg-color"),document.getElementById("popup-interfaceEmbed-text").innerText="",n&&(n.style.visibility="visible")}e.type&&n&&(n?.classList.forEach((e=>{e.endsWith("-parent-container")&&n.classList.remove(e)})),t?.classList.forEach((e=>{e.endsWith("-interfaceEmbed")&&t.classList.remove(e)})),n?.classList.add(`${e.type}-parent-container`),t?.classList.add(`${e.type}-interfaceEmbed`),this.className=e.type)}"all_available_space"===this.className?(n.style.height="100%",n.style.width="100%",n.style.display="block"):(n.style.height=`${e?.height}${e?.heightUnit||""}`||"70vh",n.style.width=`${e?.width}${e?.widthUnit||""}`||"40vw")}}updateProps(e){this.props={...this.props,...e},this.setPropValues(e)}setPropValues(e){e.iconColor&&(document.getElementById("popup-interfaceEmbed").src="dark"===e.iconColor?AI_WHITE_ICON:AI_BLACK_ICON),!0!==e.fullScreen&&"true"!==e.fullScreen||document.getElementById("iframe-parent-container")?.classList.add("full-screen-interfaceEmbed"),!1!==e.fullScreen&&"false"!==e.fullScreen||document.getElementById("iframe-parent-container")?.classList.remove("full-screen-interfaceEmbed"),"hideIcon"in e&&document.getElementById("interfaceEmbed")&&(document.getElementById("interfaceEmbed").style.display=!0===e.hideIcon||"true"===e.hideIcon?"none":"unset"),"hideCloseButton"in e&&document.getElementById("close-button-interfaceEmbed")&&(document.getElementById("close-button-interfaceEmbed").style.display=!0===e.hideCloseButton||"true"===e.hideCloseButton?"none":"unset")}sendInitialData(){const e=document.getElementById("iframe-component-interfaceEmbed");e?.contentWindow&&this.state.tempDataToSend&&(e.contentWindow.postMessage({type:"interfaceData",data:this.state.tempDataToSend},"*"),this.state.tempDataToSend=null)}};window.SendDataToChatbot=function(n){const o=document.getElementById("iframe-component-interfaceEmbed");if("string"==typeof n)try{n=JSON.parse(n)}catch(e){return void console.error("Failed to parse dataToSend:",e)}if(window.ReactNativeWebView&&window.ReactNativeWebView.postMessage(JSON.stringify({type:"data",data:n})),"parentId"in n){e.state.tempDataToSend={...e.state.tempDataToSend,...n};const t=e.props.parentId,o=document.getElementById(t);o?.contains(e.parentContainer)?t!==n.parentId&&(t?o&&e.parentContainer&&o.contains(e.parentContainer)&&o.removeChild(e.parentContainer):e.parentContainer&&document.body.contains(e.parentContainer)&&document.body.removeChild(e.parentContainer),e.updateProps({parentId:n.parentId}),e.changeContainer(n.parentId||"")):(e.updateProps({parentId:n.parentId}),e.changeContainer(n.parentId||""))}t(n,o)};const t=(t,n)=>{const o={};if("hideCloseButton"in t&&(o.hideCloseButton=t.hideCloseButton||!1),"hideIcon"in t&&(o.hideIcon=t.hideIcon||!1),t.iconColor&&(o.iconColor=t.iconColor||"dark"),!0!==t.fullScreen&&"true"!==t.fullScreen&&!1!==t.fullScreen&&"false"!==t.fullScreen||(o.fullScreen=t.fullScreen),Object.keys(o).length>0&&e.updateProps(o),n?.contentWindow&&(t&&(e.state.tempDataToSend={...e.state.tempDataToSend,...t},n.contentWindow.postMessage({type:"interfaceData",data:t},"*")),t.askAi&&n.contentWindow.postMessage({type:"askAi",data:t||{}},"*")),"config"in t&&t.config){const n={...e.config,...t.config};e.applyConfig(n),e.updateProps({config:n})}};window.openChatbot=()=>e.openChatbot(),window.closeChatbot=()=>e.closeChatbot(),window.reloadChats=()=>{const e=document.getElementById("iframe-component-interfaceEmbed");e?.contentWindow?.postMessage({type:"refresh",reload:!0},"*")},window.askAi=e=>{const t=document.getElementById("iframe-component-interfaceEmbed");t?.contentWindow?.postMessage({type:"askAi",data:e||""},"*")},e.initializeChatbot()})();