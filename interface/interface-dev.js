/* eslint-disable */

const urlToViasocket = `https://dev-interface.viasocket.com/i`
// Select the iframe-parent-container document.getElementById('interfaceEmbed') by its ID
// Create a new button document.getElementById('interfaceEmbed')
var button = document.createElement('button')
let config = ''
let title = 'Via socket'
let buttonName = 'open'
button.setAttribute('type', 'button')
button.setAttribute('class', 'close-button')
button.setAttribute('id', 'close-button')
button.textContent = 'close'
button.style.position = 'absolute'
let className = 'popup'
button.style.top = '2px' // Adjust the top position as needed
button.style.right = '2px'
button.addEventListener('click', () => {
  if (document.getElementById('iframe-parent-container')?.style?.display === 'block') {
    document.getElementById('iframe-parent-container').style.display = 'none'
    document.body.style.overflow = 'auto'
    document.getElementById('interfaceEmbed').style.display = 'unset'
    window.parent?.postMessage({ type: 'close', data: {} }, '*')
    return
  }
})
document.getElementById('iframe-parent-container')?.appendChild(button)

InitializeInterface = function () {
  iframeController()
}

SendDataToInterface = function (dataToSend) {
  const messageType = 'interfaceData'
  document.getElementById('iframe-component').onload = function () {
    document.getElementById('iframe-component').contentWindow?.postMessage({ type: messageType, data: dataToSend }, '*')
  }
  if (dataToSend && document.getElementById('iframe-component')) {
    document.getElementById('iframe-component').contentWindow?.postMessage({ type: messageType, data: dataToSend }, '*')
  }
}

loadViasocketEmbed = async function () {

  const embedToken = document.getElementById('interface-main-script')?.getAttribute('embedToken')
  let modifiedUrl = `${urlToViasocket}?`
  const loginurl = 'https://dev-api.viasocket.com/interfaces/loginuser'
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
        body: JSON.stringify({ isAnyonumousUser: true, interface_id: interface_id }),
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
          document.getElementById('iframe-parent-container').classList.remove(`${className}-parent-container`)
          document.getElementById('interfaceEmbed').classList.remove(`${className}-interfaceEmbed`)
          className = config.type
        }
      }
      document.getElementById('iframe-parent-container').classList.add(`${className}-parent-container`)
      document.getElementById('interfaceEmbed').classList.add(`${className}-interfaceEmbed`)
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
  if (document.getElementById('interfaceEmbed') && document.getElementById('iframe-parent-container')) {
    document.getElementById('interfaceEmbed').style.display = 'none'
    document.getElementById('iframe-parent-container').style.display = 'block'
    document.getElementById('title').innerText = title || 'Viasocket'
    document.body.style.overflow = 'hidden'
  }
}
loadViasocketEmbed()
document.getElementById('interfaceEmbed').addEventListener('click', () => {
  window.InitializeInterface()
})