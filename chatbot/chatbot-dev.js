/* eslint-disable */
const urlToViasocket = `https://dev-chatbot.gtwy.ai/i`;
const styleUrl = 'https://chatbot-embed.viasocket.com/style-dev.css';
const loginurl = 'https://dev-db.gtwy.ai/chatbot/loginuser';

let tempDataToSend = null;
let bodyLoaded = false;
const messageType = 'interfaceData'
let props = {}
function makeImageUrl(imageId) {
  return `https://imagedelivery.net/Vv7GgOGQbSyClWJqhyP0VQ/${imageId}/public`
}

const AI_WHITE_ICON = makeImageUrl('b1357e23-2fc6-4dc3-855a-7a213b1fa100')
const AI_BLACK_ICON = makeImageUrl('91ee0bff-cfe3-4e2d-64e5-fadbd9a3a200')
let interfaceScript = document.getElementById('chatbot-main-script')
const chatBotIcon = document.createElement('div')
chatBotIcon.id = 'interfaceEmbed'

const imgElement = document.createElement('img');
imgElement.id = 'popup-interfaceEmbed';
imgElement.className = 'chatbot-icon-interfaceEmbed'
imgElement.alt = 'Ask Ai';
imgElement.src = AI_BLACK_ICON
imgElement.style.visibility = 'hidden';
chatBotIcon.appendChild(imgElement);
// Create a span element to hold the button text
const textElement = document.createElement('span');
textElement.id = 'popup-interfaceEmbed-text';
chatBotIcon.appendChild(textElement);

document.body.appendChild(chatBotIcon);

var link = document.createElement('link');
link.id = 'chatbotEmbed-style'
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = styleUrl;
document.head.appendChild(link);

const closebutton = ` <button id='close-button-interfaceEmbed' onclick="closeChatbot()">
          <svg width="35px" height="35px" viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000">
            <g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(4.640000000000001,4.640000000000001), scale(0.71)">
              <rect x="-3.2" y="-3.2" width="38.40" height="38.40" rx="0" fill="#ffffff" strokewidth="0"></rect>
            </g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title>cross-square</title>
              <desc>Created with Sketch Beta.</desc>
              <defs></defs>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-206.000000, -1037.000000)" fill="#000000">
                  <path d="M226.95,1056.54 C227.34,1056.93 227.34,1057.56 226.95,1057.95 C226.559,1058.34 225.926,1058.34 225.536,1057.95 L222,1054.41 L218.464,1057.95 C218.074,1058.34 217.441,1058.34 217.05,1057.95 C216.66,1057.56 216.66,1056.93 217.05,1056.54 L220.586,1053 L217.05,1049.46 C216.66,1049.07 216.66,1048.44 217.05,1048.05 C217.441,1047.66 218.074,1047.66 218.464,1048.05 L222,1051.59 L225.536,1048.05 C225.926,1047.66 226.559,1047.66 226.95,1048.05 C227.34,1048.44 227.34,1049.07 226.95,1049.46 L223.414,1053 L226.95,1056.54 L226.95,1056.54 Z M234,1037 L210,1037 C207.791,1037 206,1038.79 206,1041 L206,1065 C206,1067.21 207.791,1069 210,1069 L234,1069 C236.209,1069 238,1067.21 238,1065 L238,1041 C238,1038.79 236.209,1037 234,1037 L234,1037 Z" id="cross-square" sketch:type="MSShapeGroup"></path>
                </g>
              </g>
            </g>
          </svg>
        </button>`;

const updateProps = (newprops = {}) => {
  props = { ...props, ...newprops }
  setPropValues(newprops)
}
const setPropValues = (newprops) => {
  if (newprops.iconColor) {
    document.getElementById("popup-interfaceEmbed").src = newprops.iconColor === 'dark' ? AI_WHITE_ICON : AI_BLACK_ICON
  } if (newprops.fullScreen === true || newprops.fullScreen === 'true') {
    document.getElementById('iframe-parent-container')?.classList.add('full-screen-interfaceEmbed')
  } if (newprops.fullScreen === false || newprops.fullScreen === 'false') {
    document.getElementById('iframe-parent-container')?.classList.remove('full-screen-interfaceEmbed')
  } if ('hideIcon' in newprops && document.getElementById('interfaceEmbed')) {
    document.getElementById('interfaceEmbed').style.display = (newprops.hideIcon === true || newprops.hideIcon === 'true') ? 'none' : 'unset';
  } if ('hideCloseButton' in newprops && document.getElementById('close-button-interfaceEmbed')) {
    document.getElementById('close-button-interfaceEmbed').style.display = (newprops.hideCloseButton === true || newprops.hideCloseButton === 'true') ? 'none' : 'unset';
  }
}
function createProps() {
  if (interfaceScript) {
    // Create an object to store the extracted attributes
    const attributes = [
      'interfaceId',
      'embedToken',
      'threadId',
      'bridgeName',
      'variables',
      'onOpen',
      'onClose',
      'iconColor',
      'className',
      'style',
      'environment',
      'fullScreen',
      'hideCloseButton',
      'hideIcon',
      'parentId',
      'config'
    ]
    attributes.forEach((attr) => {
      if (interfaceScript.hasAttribute(attr)) {
        let attributeValue = interfaceScript.getAttribute(attr)
        if (attr === 'config' && attributeValue) {
          try { attributeValue = JSON.parse(attributeValue) }
          catch (e) {
            console.log(e)
          }
        }
        props[attr] = attributeValue
        tempDataToSend = { ...tempDataToSend, [attr]: attributeValue }
      }
    })
    // updateProps(props);
  } else {
    console.log('Script tag not found')
  }
}
createProps()

function handleScriptRemoval(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      for (const addedNode of mutation.addedNodes) {
        if (addedNode.id === 'chatbot-main-script') {
          interfaceScript = document.getElementById('chatbot-main-script')
          createProps()
        }
      }
      for (const removedNode of mutation.removedNodes) {
        if (removedNode.id === 'chatbot-main-script') {
          // Perform your cleanup here
          console.log('Script tag removed, performing cleanup...')
          const elementToRemove = document.getElementById('iframe-parent-container')
          const interfaceEmbed = document.getElementById('interfaceEmbed')
          const styleEmbed = document.getElementById('chatbotEmbed-style')
          if (interfaceEmbed) {
            interfaceEmbed.remove()
          }
          if (elementToRemove) {
            elementToRemove.remove()
          }
          if (styleEmbed) {
            styleEmbed.remove()
          }
          // Stop observing after the script tag is removed
          observer.disconnect()
        }
      }
    }
  }
}

const observer = new MutationObserver(handleScriptRemoval)
observer.observe(document.head, { childList: true })

// Iframe pareant resizable code
const iframeObserver = new ResizeObserver((entries) => {
  const iframeParentContainer = document.getElementById('iframe-parent-container')
  for (let entry of entries) {
    const { width, height } = entry.contentRect;
    // Perform necessary actions based on new dimensions
    if (width < 600) {
      if (iframeParentContainer) {
        iframeParentContainer.style.height = '100%'
        iframeParentContainer.style.width = '100%'
      }
      // Handle small window size
    } else {
      if (iframeParentContainer) {
        applyConfig(props?.config)
      }
      // Handle large window size
    }
  }
});

// Observe the <html> or <body> element of the iframe
iframeObserver.observe(document.documentElement);

closeChatbot = function () {
  const iframeContainer = document.getElementById('iframe-parent-container')

  if (iframeContainer?.style?.display === 'block') {
    // Apply inline animation for fade out
    iframeContainer.style.transition = 'opacity 0.2s ease-in-out'
    iframeContainer.style.opacity = 0

    // Wait for the animation to finish before hiding the element
    setTimeout(() => {
      iframeContainer.style.display = 'none'
      document.body.style.overflow = 'auto'
      if (document.getElementById('interfaceEmbed')) {
        document.getElementById('interfaceEmbed').style.display = (props.hideIcon === true || props.hideIcon === 'true') ? 'none' : 'unset';
      }
      window.parent?.postMessage({ type: 'close', data: {} }, '*');
      if (window.ReactNativeWebView) window?.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'close', data: {} }));
      iframeComponent.contentWindow?.postMessage({ type: 'close', data: {} }, '*')
    }, 200) // This should match the duration of the transition

    return
  }
}

// Set a timeout to automatically remove the event listener after 60 seconds
const timeoutId = setTimeout(() => {
  window.removeEventListener('message', SendTempDataToChatbot)
  console.log('Event listener removed after 60 seconds')
}, 60000);

function SendTempDataToChatbot(event) {
  const { type } = event.data
  if (type === 'interfaceLoaded') {
    if (tempDataToSend) {
      if (document.getElementById('iframe-component-interfaceEmbed').contentWindow) {
        document.getElementById('iframe-component-interfaceEmbed').contentWindow.postMessage({ type: messageType, data: tempDataToSend }, '*')
        tempDataToSend = null
      }
    }
    window.removeEventListener('message', SendTempDataToChatbot)
    clearTimeout(timeoutId)
  }
}

let parentContainer = null
let config = {
  type: 'popup',
  height: '100',
  heightUnit: '%',
  width: '50',
  widthUnit: '%',
  buttonName: ''
}
let title = 'Via socket'
let buttonName = 'Chatbot'
let className = 'popup'

loadChatbotEmbed = async function () {
  const embedToken = document.getElementById('chatbot-main-script')?.getAttribute('embedToken')
  let modifiedUrl = `${urlToViasocket}?`
  let requestOptions = {}

  if (embedToken) {
    requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: embedToken
      }
    }
  } else {
    const interface_id = document.getElementById('chatbot-main-script')?.getAttribute('interface_id')
    if (interface_id) {
      requestOptions = {
        method: 'POST',
        body: JSON.stringify({ isAnonymousUser: true, interface_id: interface_id }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    }
  }

  fetch(loginurl, requestOptions)
    .then(async (response) => {
      const data = await response.json()
      return data
    })
    .then((data) => {
      if (!document.getElementById('iframe-parent-container')) return
      config = data?.data?.config
      const encodedData = encodeURIComponent(`${JSON.stringify(data.data)}`)
      modifiedUrl = modifiedUrl.concat(`interfaceDetails=${encodedData}`)
      const parts = document.getElementById('iframe-component-interfaceEmbed')?.src?.split('?')
      const baseUrl = parts?.[0]
      if (baseUrl !== urlToViasocket && document.getElementById('iframe-component-interfaceEmbed')) {
        document.getElementById('iframe-component-interfaceEmbed').src = modifiedUrl
      }
      if (config) {
        // applyConfig({ ...config, ...props?.config })
        props['config'] = { ...props?.config, ...config }
        applyConfig({ ...config })
      }
    })
    .catch((error) => {
      console.log('Fetch error:', error)
    })
}
function applyConfig(config) {
  const interfaceEmbedElement = document.getElementById('interfaceEmbed')
  const iframeParentContainer = document.getElementById('iframe-parent-container')
  if (!iframeParentContainer) return
  if (config) {
    if (config.title) {
      title = config.title
    }
    if (config.buttonName) {
      buttonName = config.buttonName
      textElement.innerText = buttonName
      interfaceEmbedElement.classList.add('show-bg-color')
      if (imgElement) imgElement.style.visibility = 'hidden'
    } else {
      textElement.innerText = ''
      interfaceEmbedElement?.classList.remove('show-bg-color')
      if (imgElement) imgElement.style.visibility = 'visible'
    }
    if (config.iconUrl) {
      if (imgElement) imgElement.src = config.iconUrl
      interfaceEmbedElement?.classList.remove('show-bg-color')
      textElement.innerText = ''
      if (imgElement) imgElement.style.visibility = 'visible'
    }
    if (config.type && iframeParentContainer) {
      // Remove existing class that matches the pattern
      iframeParentContainer?.classList.forEach((cls) => {
        if (cls.endsWith('-parent-container')) {
          iframeParentContainer.classList.remove(cls)
        }
      })
      interfaceEmbedElement?.classList.forEach((cls) => {
        if (cls.endsWith('-interfaceEmbed')) {
          interfaceEmbedElement.classList.remove(cls)
        }
      })

      // Add new class
      iframeParentContainer?.classList.add(`${config.type}-parent-container`)
      interfaceEmbedElement?.classList.add(`${config.type}-interfaceEmbed`)
      className = config.type
    }
  }

  if (className === 'all_available_space') {
    iframeParentContainer.style.height = '100%'
    iframeParentContainer.style.width = '100%'
    iframeParentContainer.style.display = 'block'
  } else {
    iframeParentContainer.style.height = `${config?.height}${config?.heightUnit || ''}` || '70vh'
    iframeParentContainer.style.width = `${config?.width}${config?.widthUnit || ''}` || '40vw'
  }
}

const loadContent = function (parentId = props.parentId || '', bodyLoadedHai = bodyLoaded) {
  if (bodyLoadedHai) return
  window.addEventListener('message', SendTempDataToChatbot)
  if (!parentContainer) {
    parentContainer = document.createElement('div')
    parentContainer.id = 'iframe-parent-container'
    parentContainer.className = 'popup-parent-container'
    parentContainer.style.display = 'none'
    parentContainer.innerHTML = `
       ${closebutton}
        <iframe id="iframe-component-interfaceEmbed" title="iframe" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>
      `
  }
  changeContainer(parentId)

  bodyLoaded = true
  updateProps({ ...props })
  loadChatbotEmbed()
}

const changeContainer = function (parentId) {
  window.addEventListener('message', SendTempDataToChatbot)
  if (parentId && document.getElementById(parentId)) {
    const container = document.getElementById(parentId)
    if (container) {
      container.style.position = 'relative'
      container.appendChild(parentContainer)
    }
  } else if (document.getElementById('interface-chatbot')) {
    document.getElementById('interface-chatbot').appendChild(parentContainer)
  } else {
    document.body.appendChild(parentContainer)
  }
}

document.addEventListener('DOMContentLoaded', loadContent)
if (document?.body) loadContent()

const iframeComponent = document.getElementById('iframe-component-interfaceEmbed')
if (iframeComponent?.contentWindow) {
  iframeComponent.onload = function () {
    try {
      // const dataToSend = JSON.parse(JSON.stringify(tempDataToSend)) // Strip functions or DOM nodes
      iframeComponent.contentWindow?.postMessage({ type: messageType, data: tempDataToSend }, '*')
    } catch (error) {
      console.error('Error serializing data:', error)
    }
  }
}

SendDataToChatbot = function (dataToSend) {
  if (typeof dataToSend === 'string') {
    dataToSend = JSON.parse(dataToSend)
  }
  if (window.ReactNativeWebView) window?.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'data', data: dataToSend }));
  if ('parentId' in dataToSend) {
    tempDataToSend = { ...tempDataToSend, ...dataToSend }
    var previousParentId = props['parentId']
    var existingParent = document.getElementById(previousParentId)
    if (existingParent?.contains(parentContainer)) {
      if (previousParentId !== dataToSend.parentId) {
        if (previousParentId) {

          if (existingParent && parentContainer && existingParent.contains(parentContainer)) {
            existingParent.removeChild(parentContainer)
          }
        } else if (parentContainer && document.body.contains(parentContainer)) {
          document.body.removeChild(parentContainer)
        }
        updateProps({ parentId: dataToSend.parentId })
        changeContainer(dataToSend?.parentId || '')
      }
    } else {
      updateProps({ parentId: dataToSend.parentId })
      changeContainer(dataToSend?.parentId || '')
    }
  }
  sendOtherData(dataToSend)
}

const sendOtherData = (dataToSend) => {
  if ('hideCloseButton' in dataToSend) {
    updateProps({ hideCloseButton: dataToSend.hideCloseButton || false })
  }
  if ('hideIcon' in dataToSend) {
    updateProps({ hideIcon: dataToSend.hideIcon || false })
  }
  if (dataToSend.iconColor) {
    updateProps({ iconColor: dataToSend.iconColor || 'dark' })
  }
  if (dataToSend.fullScreen === true || dataToSend.fullScreen === 'true') {
    updateProps({ fullScreen: dataToSend.fullScreen })
  }
  if (dataToSend.fullScreen === false || dataToSend.fullScreen === 'false') {
    updateProps({ fullScreen: dataToSend.fullScreen })
  }
  if (dataToSend && iframeComponent?.contentWindow) {
    tempDataToSend = { ...tempDataToSend, ...dataToSend }
    iframeComponent.contentWindow?.postMessage({ type: messageType, data: dataToSend }, '*')
  }
  if (dataToSend.askAi && iframeComponent?.contentWindow) {
    iframeComponent.contentWindow?.postMessage({ type: 'askAi', data: dataToSend || {} }, '*')
  }
  if ('config' in dataToSend) {
    var newconfig = { ...config, ...dataToSend?.config }
    applyConfig(newconfig)
    updateProps({ config: newconfig })
  }
}

openChatbot = function () {
  window.parent?.postMessage({ type: 'open', data: {} }, '*')
  if (window.ReactNativeWebView) window?.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'open', data: {} }));
  iframeComponent.contentWindow?.postMessage({ type: 'open', data: {} }, '*')

  if (document.getElementById('interfaceEmbed') && document.getElementById('iframe-parent-container')) {
    document.getElementById('interfaceEmbed').style.display = 'none'
    const iframeContainer = document.getElementById('iframe-parent-container')
    iframeContainer.style.display = 'block'

    // Reset opacity to 0 before applying animation (in case the element was previously shown)
    iframeContainer.style.opacity = 0
    // Apply inline animation
    iframeContainer.style.transition = 'opacity 0.3s ease-in-out'
    requestAnimationFrame(() => {
      iframeContainer.style.opacity = 1
    })

    document.body.style.overflow = 'hidden'
  }
}
// loadChatbotEmbed()

reloadChats = function () {
  iframeComponent.contentWindow?.postMessage({ type: 'refresh', reload: true }, '*')
}

askAi = function (data) {
  iframeComponent.contentWindow?.postMessage({ type: 'askAi', data: data || "" }, '*')
}
document.getElementById('interfaceEmbed')?.addEventListener('click', () => {
  window.openChatbot()
})