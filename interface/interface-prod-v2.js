
/* eslint-disable */
const urlToViasocket = `https://face.viasocket.com/i`;
const styleUrl = 'https://interface-embed.viasocket.com/style-prod.css';
const loginurl = 'https://flow-api.viasocket.com/interfaces/loginuser'
let tempDataToSend = null;
let bodyLoaded = false;
const messageType = 'interfaceData'
let props = {};

const interfaceScript = document.getElementById('interface-main-script');
function SendTempDataToInterface(event) {
    const { type } = event.data;
    console.log(type, 'type', tempDataToSend, '23432345');
    console.log(document.getElementById('iframe-parent-container'), 121234123451234)
    if (type === 'interfaceLoaded' && tempDataToSend) {
        document.getElementById('iframe-parent-container').contentWindow.postMessage({ type: messageType, data: tempDataToSend }, '*')
        tempDataToSend = null;
    }
}
window.addEventListener('message', SendTempDataToInterface);

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

const AI_WHITE_ICON = makeImageUrl('b1357e23-2fc6-4dc3-855a-7a213b1fa100')
const AI_BLACK_ICON = makeImageUrl('91ee0bff-cfe3-4e2d-64e5-fadbd9a3a200')

closeIframe = function () {
    if (document.getElementById('iframe-parent-container')?.style?.display === 'block') {
        document.getElementById('iframe-parent-container').style.display = 'none'
        document.body.style.overflow = 'auto'
        document.getElementById('interfaceEmbed').style.display = 'unset'
        window.parent?.postMessage({ type: 'close', data: {} }, '*')
        return
    }
}

const updateProps = (newprops) => {
    props = { ...props, ...newprops }
    setPropValues(newprops)
}
const setPropValues = (newprops) => {
    if (newprops.theme) {
        document.getElementById("popup-interfaceEmbed").src = newprops.theme === 'dark' ? AI_WHITE_ICON : AI_BLACK_ICON
    } else if (newprops.fullScreen === true || newprops.fullScreen === 'true') {
        document.getElementById('iframe-parent-container')?.classList.add('full-screen')
    } else if (newprops.fullScreen === false || newprops.fullScreen === 'false') {
        document.getElementById('iframe-parent-container')?.classList.remove('full-screen')
    }
}

loadContent = function () {
    if (bodyLoaded) return;
    // Append the link element to the head of the document
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = styleUrl;
    document.head.appendChild(link);

    if (!document.getElementById('iframe-parent-container')) {
        const parentContainer = document.createElement('div');
        parentContainer.id = 'iframe-parent-container';
        parentContainer.className = 'popup-parent-container'
        parentContainer.style.display = 'none'

        parentContainer.innerHTML = `
            <button id='close-button' onclick="closeIframe()">
            <svg width="35px" height="35px" viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(4.640000000000001,4.640000000000001), scale(0.71)"><rect x="-3.2" y="-3.2" width="38.40" height="38.40" rx="0" fill="#ffffff" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross-square</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-206.000000, -1037.000000)" fill="#000000"> <path d="M226.95,1056.54 C227.34,1056.93 227.34,1057.56 226.95,1057.95 C226.559,1058.34 225.926,1058.34 225.536,1057.95 L222,1054.41 L218.464,1057.95 C218.074,1058.34 217.441,1058.34 217.05,1057.95 C216.66,1057.56 216.66,1056.93 217.05,1056.54 L220.586,1053 L217.05,1049.46 C216.66,1049.07 216.66,1048.44 217.05,1048.05 C217.441,1047.66 218.074,1047.66 218.464,1048.05 L222,1051.59 L225.536,1048.05 C225.926,1047.66 226.559,1047.66 226.95,1048.05 C227.34,1048.44 227.34,1049.07 226.95,1049.46 L223.414,1053 L226.95,1056.54 L226.95,1056.54 Z M234,1037 L210,1037 C207.791,1037 206,1038.79 206,1041 L206,1065 C206,1067.21 207.791,1069 210,1069 L234,1069 C236.209,1069 238,1067.21 238,1065 L238,1041 C238,1038.79 236.209,1037 234,1037 L234,1037 Z" id="cross-square" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
            </button>
        <iframe id="iframe-component" title="iframe"></iframe>
  `

        const chatBotIcon = document.createElement('div')
        chatBotIcon.id = 'interfaceEmbed'

        const imgElement = document.createElement('img');
        imgElement.id = 'popup-interfaceEmbed';
        imgElement.className = 'chatbot-icon'
        imgElement.alt = 'Ask Ai';
        imgElement.src = AI_BLACK_ICON

        chatBotIcon.appendChild(imgElement);
        document.body.appendChild(chatBotIcon);

        if (document.getElementById('interface-chatbot')) {
            document.getElementById('interface-chatbot').appendChild(parentContainer);
        } else {
            document.body.appendChild(parentContainer);
        }
    }
    else {
        closeIframe()
        if (document.getElementById('iframe-component')) document.getElementById('iframe-component').src = ''
    }
    bodyLoaded = true;
    updateProps({ ...props })
}
document.addEventListener("DOMContentLoaded", loadContent);
if (document?.body) loadContent()

let config = ''
let title = 'Via socket'
let buttonName = 'open'
let className = 'popup'


InitializeInterface = function () {
    iframeController()
}


SendDataToInterface = function (dataToSend) {
    if (dataToSend.theme) {
        updateProps({ theme: dataToSend.theme || 'dark' })
    }
    if (dataToSend.fullScreen === true || dataToSend.fullScreen === 'true') {
        updateProps({ fullScreen: dataToSend.fullScreen });
    }
    else if (dataToSend.fullScreen === false || dataToSend.fullScreen === 'false') {
        updateProps({ fullScreen: dataToSend.fullScreen });
    }

    const iframeComponent = document.getElementById('iframe-component');
    console.log('iframeComponent', iframeComponent);
    console.log('dataToSend', dataToSend);
    if (iframeComponent) {
        iframeComponent.onload = function () {
            iframeComponent.contentWindow?.postMessage({ type: messageType, data: dataToSend }, '*')
            window.removeEventListener('message', SendTempDataToInterface)
        }
    }
    if (dataToSend && iframeComponent) {
        tempDataToSend = dataToSend;
        iframeComponent.contentWindow?.postMessage({ type: messageType, data: dataToSend }, '*')
    }
}

loadInterfaceEmbed = async function () {
    const embedToken = document.getElementById('interface-main-script')?.getAttribute('embedToken');
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
        const interface_id = document.getElementById('interface-main-script')?.getAttribute('interface_id');
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
            const parts = document.getElementById('iframe-component')?.src?.split('?')
            const baseUrl = parts?.[0]
            if (baseUrl !== urlToViasocket && document.getElementById('iframe-component')) {
                document.getElementById('iframe-component').src = modifiedUrl
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
                document.getElementById('iframe-parent-container').style.height = `${config?.height}${config?.heightUnit || ''}` || '70vh'
                document.getElementById('iframe-parent-container').style.width = `${config?.width}${config?.widthUnit || ''}` || '40vw'
            }
        })
        .catch((error) => {
            console.log('Fetch error:', error)
        })
}

iframeController = function () {
    window.parent?.postMessage({ type: 'open', data: {} }, '*')
    if (document.getElementById('interfaceEmbed') && document.getElementById('iframe-parent-container')) {
        document.getElementById('interfaceEmbed').style.display = 'none'
        document.getElementById('iframe-parent-container').style.display = 'block'
        // document.getElementById('title').innerText = title || 'Viasocket'
        document.body.style.overflow = 'hidden'
    }
}
loadInterfaceEmbed()

document.getElementById('interfaceEmbed')?.addEventListener('click', () => {
    window.InitializeInterface()
})