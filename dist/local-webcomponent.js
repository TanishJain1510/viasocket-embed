let TEMPLATE_NAME = 'viasocket-embed';
let IFRAME_ATTRIBUTE = 'iframe-template-type';
let IFRAME_PARENT_ATTRIBUTE = 'iframe-parent-template-type';

class ViaSocketTemplate extends HTMLElement {
    connectedCallback() {
        this.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick() {
        const flowId = this.getAttribute('flowId');
        const flowIdTemp = flowId ? flowId : '';
        const dataToSend = {
            viasocketEmbedToken: this.dataset.accessToken,
            embedFlowId: flowIdTemp
        }
        const parentDiv = document.createElement('div');
        const divElement = document.createElement('div');
        const imgElement = document.createElement("img");
        divElement.setAttribute(IFRAME_ATTRIBUTE, TEMPLATE_NAME);
        parentDiv.setAttribute(IFRAME_PARENT_ATTRIBUTE, TEMPLATE_NAME);

        const stringifyData = JSON.stringify(dataToSend);
        const URL = `http://localhost:3000/embed?viasocketEmbedDetails=${stringifyData}`;

        imgElement.src = "https://embed.viasocket.com/close-icon.svg";
        imgElement.alt = "Close";
        imgElement.style.width = '24px';
        imgElement.classList.add('wc-slider-close-btn');

        const iframe = document.createElement("iframe");
        iframe.setAttribute(IFRAME_ATTRIBUTE, TEMPLATE_NAME);
        iframe.src = URL;
        iframe.style.width = '100%';
        iframe.style.height = "100%";

        divElement.appendChild(iframe);
        divElement.appendChild(imgElement)
        parentDiv.appendChild(divElement)
        document.body.appendChild(parentDiv);
        document.body.style.overflow = "hidden";

        iframe.addEventListener('error', (err) => {
            console.log("iframe error", err)
        });

        imgElement.addEventListener('click', () => {
            document.body.removeChild(parentDiv);
            document.body.style.overflow = "auto";
        })
    }
}

customElements.define('viasocket-embed', ViaSocketTemplate);

initViaSocketEmbed = function (options) {
    const template = document.querySelectorAll('viasocket-embed');
    if (!template) throw new Error('viasocket-embed element not found');
    template.forEach(template => {
        template.dataset.accessToken = options.accessToken;
    });
}