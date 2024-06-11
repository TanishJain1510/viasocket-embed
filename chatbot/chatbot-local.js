/* eslint-disable */
const urlToViasocket = `http://localhost:3001/i`
const styleUrl = 'https://chatbot-embed.viasocket.com/style-local.css';
const loginurl = 'http://localhost:7072/chatbot/loginuser';

let tempDataToSend = null;
let bodyLoaded = false;
const messageType = 'interfaceData'
let props = {};
const AI_WHITE_ICON = makeImageUrl('b1357e23-2fc6-4dc3-855a-7a213b1fa100')
const AI_BLACK_ICON = makeImageUrl('91ee0bff-cfe3-4e2d-64e5-fadbd9a3a200')

const interfaceScript = document.getElementById('chatbot-main-script');


const chatBotIcon = document.createElement('div')
chatBotIcon.id = 'interfaceEmbed'

const imgElement = document.createElement('img');
imgElement.id = 'popup-interfaceEmbed';
imgElement.className = 'chatbot-icon-interfaceEmbed'
imgElement.alt = 'Ask Ai';
imgElement.src = AI_BLACK_ICON

chatBotIcon.appendChild(imgElement);
document.body.appendChild(chatBotIcon);

var link = document.createElement('link');
link.id = 'chatbotEmbed-style'
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = styleUrl;
document.head.appendChild(link);

function handleScriptRemoval(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            for (const removedNode of mutation.removedNodes) {
                if (removedNode.id === 'chatbot-main-script') {
                    // Perform your cleanup here
                    console.log('Script tag removed, performing cleanup...');
                    const elementToRemove = document.getElementById('iframe-parent-container');
                    const interfaceEmbed = document.getElementById('interfaceEmbed');
                    const styleEmbed = document.getElementById('chatbotEmbed-style');
                    if (interfaceEmbed) {
                        console.log('removing iframe');
                        interfaceEmbed.remove();
                    }
                    if (elementToRemove) {
                        console.log('removing button');
                        elementToRemove.remove();
                    }
                    if (styleEmbed) {
                        console.log('removing style tag');
                        styleEmbed.remove();
                    }
                    // Stop observing after the script tag is removed
                    observer.disconnect();
                }
            }
        }
    }
}

const observer = new MutationObserver(handleScriptRemoval);
observer.observe(document.head, { childList: true });

if (interfaceScript) {
    // Create an object to store the extracted attributes
    const attributes = ['interfaceId', 'embedToken', 'threadId', 'bridgeName', 'variables', 'onOpen', 'onClose', 'theme', 'className', 'style', 'environment', 'fullScreen'];
    attributes.forEach(attr => {
        if (interfaceScript.hasAttribute(attr)) {
            props[attr] = interfaceScript.getAttribute(attr);
        }
    });
    // console.log(props)
} else {
    console.log("Script tag not found");
}

function makeImageUrl(imageId) {
    return `https://imagedelivery.net/Vv7GgOGQbSyClWJqhyP0VQ/${imageId}/public`
}

closeChatbot = function () {
    if (document.getElementById('iframe-parent-container')?.style?.display === 'block') {
        document.getElementById('iframe-parent-container').style.display = 'none'
        document.body.style.overflow = 'auto'
        document.getElementById('interfaceEmbed').style.display = 'unset'
        window.parent?.postMessage({ type: 'close', data: {} }, '*')
        return
    }
}

const updateProps = (newprops = {}) => {
    props = { ...props, ...newprops }
    setPropValues(newprops)
}
const setPropValues = (newprops) => {
    if (newprops.theme) {
        document.getElementById("popup-interfaceEmbed").src = newprops.theme === 'dark' ? AI_WHITE_ICON : AI_BLACK_ICON
    } else if (newprops.fullScreen === true || newprops.fullScreen === 'true') {
        document.getElementById('iframe-parent-container')?.classList.add('full-screen-interfaceEmbed')
    } else if (newprops.fullScreen === false || newprops.fullScreen === 'false') {
        document.getElementById('iframe-parent-container')?.classList.remove('full-screen-interfaceEmbed')
    }
}

// Set a timeout to automatically remove the event listener after 60 seconds
const timeoutId = setTimeout(() => {
    window.removeEventListener('message', SendTempDataToChatbot);
    console.log("Event listener removed after 60 seconds");
}, 60000);

function SendTempDataToChatbot(event) {
    const { type } = event.data;
    if (type === 'interfaceLoaded') {
        if (tempDataToSend) {
            console.log('data sent')
            document.getElementById('iframe-component-interfaceEmbed').contentWindow.postMessage({ type: messageType, data: tempDataToSend }, '*')
            tempDataToSend = null;
        }
        window.removeEventListener('message', SendTempDataToChatbot);
        clearTimeout(timeoutId);
        console.log("interfaceLoaded and event listener removed");
    }
}
const parentContainer = document.createElement('div');
// let parentContainer = document.getElementById('iframe-parent-container');

loadChatbotEmbed = async function () {
    const embedToken = document.getElementById('chatbot-main-script')?.getAttribute('embedToken');
    let modifiedUrl = `${urlToViasocket}?`
    let requestOptions = {};

    if (embedToken) {
        requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: embedToken
            }
        }
    } else {
        const interface_id = document.getElementById('chatbot-main-script')?.getAttribute('interface_id');
        if (interface_id) {
            requestOptions = {
                method: 'POST',
                body: JSON.stringify({ isAnonymousUser: true, interface_id: interface_id }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        }
    }

    fetch(loginurl, requestOptions)
        .then(async (response) => {
            const data = await response.json();
            return data
        })
        .then((data) => {
            if (!document.getElementById('iframe-parent-container')) return;
            config = data?.data?.config
            modifiedUrl = modifiedUrl.concat(`interfaceDetails=${JSON.stringify(data.data)}`)
            const parts = document.getElementById('iframe-component-interfaceEmbed')?.src?.split('?')
            const baseUrl = parts?.[0]
            if (baseUrl !== urlToViasocket && document.getElementById('iframe-component-interfaceEmbed')) {
                document.getElementById('iframe-component-interfaceEmbed').src = modifiedUrl
            }
            if (config) {
                if (config.title) {
                    title = config.title
                }
                if (config.buttonName) {
                    buttonName = config.buttonName
                    document.getElementById('interfaceEmbed').innerText = buttonName
                }

                if (config.type) {
                    document.getElementById('iframe-parent-container')?.classList.remove(`${className}-parent-container`)
                    document.getElementById('interfaceEmbed')?.classList.remove(`${className}-interfaceEmbed`)
                    className = config.type
                }
            }
            document.getElementById('iframe-parent-container')?.classList.add(`${className}-parent-container`)
            document.getElementById('interfaceEmbed')?.classList.add(`${className}-interfaceEmbed`)

            if (className === 'all_space') {
                document.getElementById('iframe-parent-container').style.height = '100%'
                document.getElementById('iframe-parent-container').style.width = '100%'
            } else {
                console.log(config, 234234)
                document.getElementById('iframe-parent-container').style.height = `${config?.height}${config?.heightUnit || ''}` || '70vh'
                document.getElementById('iframe-parent-container').style.width = `${config?.width}${config?.widthUnit || ''}` || '40vw'
            }
        })
        .catch((error) => {
            console.log('Fetch error:', error)
        })
}

loadContent = function (parentId = props.parentId || '', bodyLoadedHai = bodyLoaded) {
    console.log(bodyLoadedHai, '=-=-=-=', parentId)
    if (bodyLoadedHai) return;
    window.addEventListener('message', SendTempDataToChatbot);

    if (!document.getElementById('iframe-parent-container')) {
        // parentContainer = document.createElement('div');
        parentContainer.id = 'iframe-parent-container';
        parentContainer.className = 'popup-parent-container'
        parentContainer.style.display = 'none'

        parentContainer.innerHTML = `
            <button id='close-button-interfaceEmbed' onclick="closeChatbot()">
            <svg width="35px" height="35px" viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(4.640000000000001,4.640000000000001), scale(0.71)"><rect x="-3.2" y="-3.2" width="38.40" height="38.40" rx="0" fill="#ffffff" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross-square</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-206.000000, -1037.000000)" fill="#000000"> <path d="M226.95,1056.54 C227.34,1056.93 227.34,1057.56 226.95,1057.95 C226.559,1058.34 225.926,1058.34 225.536,1057.95 L222,1054.41 L218.464,1057.95 C218.074,1058.34 217.441,1058.34 217.05,1057.95 C216.66,1057.56 216.66,1056.93 217.05,1056.54 L220.586,1053 L217.05,1049.46 C216.66,1049.07 216.66,1048.44 217.05,1048.05 C217.441,1047.66 218.074,1047.66 218.464,1048.05 L222,1051.59 L225.536,1048.05 C225.926,1047.66 226.559,1047.66 226.95,1048.05 C227.34,1048.44 227.34,1049.07 226.95,1049.46 L223.414,1053 L226.95,1056.54 L226.95,1056.54 Z M234,1037 L210,1037 C207.791,1037 206,1038.79 206,1041 L206,1065 C206,1067.21 207.791,1069 210,1069 L234,1069 C236.209,1069 238,1067.21 238,1065 L238,1041 C238,1038.79 236.209,1037 234,1037 L234,1037 Z" id="cross-square" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
            </button>
        <iframe id="iframe-component-interfaceEmbed" title="iframe"></iframe>
  `

        if (parentId) {
            console.log(1);
            const container = document.getElementById(parentId)
            if (container) {
                container.style.position = 'relative'
                container?.appendChild(parentContainer);
            }
        } else if (document.getElementById('interface-chatbot')) {
            console.log(2);
            document.getElementById('interface-chatbot').appendChild(parentContainer);
        }
        else {
            console.log(3);
            document.body.appendChild(parentContainer);
        }
    }
    else {
        closeChatbot()
        if (document.getElementById('iframe-component-interfaceEmbed')) document.getElementById('iframe-component-interfaceEmbed').src = ''
    }

    bodyLoaded = true;
    updateProps({ ...props })
    document.getElementById('interfaceEmbed').style.display = 'unset'
    loadChatbotEmbed()
}

document.addEventListener("DOMContentLoaded", loadContent);
if (document?.body) loadContent()

const iframeComponent = document.getElementById('iframe-component-interfaceEmbed');
if (iframeComponent) {
    iframeComponent.onload = function () {
        console.log('ifram onload and remove event listener', tempDataToSend, 'tempDataToSend');
        iframeComponent.contentWindow?.postMessage({ type: messageType, data: tempDataToSend }, '*')
    }
}

let config = {
    "type": "popup",
    "height": "100",
    "heightUnit": "%",
    "width": "50",
    "widthUnit": "%",
    "buttonName": ""
}
let title = 'Via socket'
let buttonName = 'Chatbot'
let className = 'popup'

SendDataToChatbot = function (dataToSend) {
    if (dataToSend.parentId || dataToSend.parentId === '') {
        console.log(props['parentId'], 'pehle wali value')
        if (!props['parentId']) { document.body.removeChild(parentContainer) } else { document.getElementById(props['parentId'])?.removeChild(parentContainer) }
        updateProps({ parentId: dataToSend.parentId })
        loadContent(dataToSend.parentId, false)
    }
    if (dataToSend.theme) {
        updateProps({ theme: dataToSend.theme || 'dark' })
    }
    if (dataToSend.fullScreen === true || dataToSend.fullScreen === 'true') {
        updateProps({ fullScreen: dataToSend.fullScreen });
    }
    else if (dataToSend.fullScreen === false || dataToSend.fullScreen === 'false') {
        updateProps({ fullScreen: dataToSend.fullScreen });
    }
    if (dataToSend && iframeComponent) {
        tempDataToSend = dataToSend;
        iframeComponent.contentWindow?.postMessage({ type: messageType, data: dataToSend }, '*')
    }
}

openChatbot = function () {
    window.parent?.postMessage({ type: 'open', data: {} }, '*')
    if (document.getElementById('interfaceEmbed') && document.getElementById('iframe-parent-container')) {
        document.getElementById('interfaceEmbed').style.display = 'none'
        document.getElementById('iframe-parent-container').style.display = 'block'
        // document.getElementById('title').innerText = title || 'Viasocket'
        document.body.style.overflow = 'hidden'
    }
}
// loadChatbotEmbed()

document.getElementById('interfaceEmbed')?.addEventListener('click', () => {
    window.openChatbot()
})