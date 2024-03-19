
const ssoUrl = `https://flow.viasocket.com/sso`;
const urlToViasocket = `https://embedfrontend.viasocket.com/embed`;
const loginurl = 'https://flow-api.viasocket.com/users/register'
const styleurl="https://embed.viasocket.com/style.css"
let bodyLoaded=false;
loadContent=function(){
  if(bodyLoaded) return;
  const stylelink = document.createElement('link');
  stylelink.rel='stylesheet'
  stylelink.href=styleurl
  document.head.appendChild(stylelink);
  if(!document.getElementById('iframe-embed-parent-container'))
  {
  const parentContainer = document.createElement('div');
  parentContainer.id = 'iframe-embed-parent-container';
  parentContainer.innerHTML = `<button id='viasocket-embed-close-button' onclick="handleclose()">
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#818181"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
  </button>
  <iframe id="embed-iframe-component" title="iframe"></iframe>`;
  document.body.appendChild(parentContainer);
  }
  else {
    handleclose()
    if(document.getElementById('embed-iframe-component')) document.getElementById('embed-iframe-component').src = ''
}
  bodyLoaded=true;
}
document.addEventListener("DOMContentLoaded", loadContent);
if(document?.body) loadContent()

initiateSSO = function (details) {
    let { company_id, org_id, email, ssoToken, title } = details;
    let updatedDetails = { org_id, title, company_id, email, viasocketSSOToken: ssoToken }
    let stringifyData = JSON.stringify(updatedDetails);
    window.open(`${ssoUrl}?viasocketSSO=${stringifyData}`, '_blank')
}

/* eslint-disable */
let modifiedUrl = `${urlToViasocket}?`
var container = document.getElementById('iframe-embed-parent-container')
let config = ''
let className = 'right_slider'
receiveMessageFromChild=function(e){
    if(e?.data?.type==='copy') navigator.clipboard.writeText(e?.data?.message || '')
  }
   handleclose = function (){
       document.getElementById('iframe-embed-parent-container').style.display = 'none'
    if(config?.buttonType!=='custom' &&  document.getElementById('viasocket-embed-open-button'))   document.getElementById('viasocket-embed-open-button').style.display = 'unset'
  }

intializeIntegration = function () {
}

SenddDataToIntegration = function (dataToSend) {
  const messageType = 'embeddata'
  document.getElementById('embed-iframe-component').onload = function () {
    document.getElementById('embed-iframe-component').contentWindow.postMessage({ type: messageType, data: dataToSend }, '*')
  }
  if (dataToSend && document.getElementById('embed-iframe-component')) {
    document.getElementById('embed-iframe-component').contentWindow.postMessage({ type: messageType, data: dataToSend }, '*')
  }
}

loadViasocketEmbed = async function () {
  const embedToken = document.getElementById('viasocket-embed-main-script')?.getAttribute('embedToken') || document.getElementById('main-script')?.getAttribute('embedToken')
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: embedToken
    }
  }

  fetch(loginurl, requestOptions)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      config = data?.data?.config
  modifiedUrl = modifiedUrl.concat(`viasocketEmbedDetails=${JSON.stringify(data.data)}`)
     
      if (config) {
        if (config.buttonName && config.buttonType!=='custom' &&  document.getElementById('viasocket-embed-open-button')) {
          document.getElementById('viasocket-embed-open-button').innerText = config.buttonName
        }

        if (config.type) {
          className = config.type
           document.getElementById('iframe-embed-parent-container').classList.remove(`${className}-embed-parent-container`)
          if(config.buttonType!=='custom' &&  document.getElementById('viasocket-embed-open-button'))
          {
            document.getElementById('viasocket-embed-open-button')?.classList?.remove(`${className}-embed-open-button`)
            document.getElementById('viasocket-embed-open-button')?.classList?.add(`${className}-embed-open-button`)
          }
        }
      }
       document.getElementById('iframe-embed-parent-container').classList.add(`${className}-embed-parent-container`)
      if (className === 'all_space') {
         document.getElementById('iframe-embed-parent-container').style.height = '100%'
         document.getElementById('iframe-embed-parent-container').style.width = '100%'
      } else {
         document.getElementById('iframe-embed-parent-container').style.height = config?.height+(config?.heightUnit || '') || '70vh'
         document.getElementById('iframe-embed-parent-container').style.width = config?.width+(config?.widthUnit || '') || '40vw'
      }
    })
    .catch((error) => {
      console.log('Fetch error:', error)
    })
}

loadViasocketEmbed()
openViasocket=function(scriptId=false){
  if(document.getElementById('embed-iframe-component'))
  {
    if(modifiedUrl?.includes('&scriptId=')) modifiedUrl=modifiedUrl.split('&scriptId')[0]
    if(scriptId) modifiedUrl=modifiedUrl+`&scriptId=${scriptId}`
    document.getElementById('embed-iframe-component').src = modifiedUrl
  }
  
  if ( document.getElementById('iframe-embed-parent-container')) {
    if(config.buttonType!=='custom' && document.getElementById('viasocket-embed-open-button')) document.getElementById('viasocket-embed-open-button').style.display = 'none'
     document.getElementById('iframe-embed-parent-container').style.display = 'flex'
    document.body.style.overflow = 'hidden'
  }

}

window.addEventListener('message', receiveMessageFromChild, false);