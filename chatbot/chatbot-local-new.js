/* eslint-disable */

// 1. Configuration
const CONFIG = {
    urls: {
        base: 'http://localhost:3001/chatbot',
        style: 'https://chatbot-embed.viasocket.com/style-local.css',
        login: 'http://localhost:7072/chatbot/loginuser',
    },
    icons: {
        white: makeImageUrl('b1357e23-2fc6-4dc3-855a-7a213b1fa100'),
        black: makeImageUrl('91ee0bff-cfe3-4e2d-64e5-fadbd9a3a200'),
    },
    defaultConfig: {
        type: 'popup',
        height: '100',
        heightUnit: '%',
        width: '50',
        widthUnit: '%',
        buttonName: '',
    },
    attributes: [
        'interfaceId', 'embedToken', 'threadId', 'bridgeName', 'variables',
        'onOpen', 'onClose', 'iconColor', 'className', 'style', 'environment',
        'fullScreen', 'hideCloseButton', 'hideIcon', 'parentId', 'config',
        'headerButtons', 'eventsToSubscribe', 'modalConfig', 'allowModalSwitch'
    ]
};

// 2. State Management
const state = {
    tempDataToSend: null,
    bodyLoaded: false,
    props: {},
    parentContainer: null,
    config: { ...CONFIG.defaultConfig },
    title: 'Via socket',
    buttonName: 'Chatbot',
    className: 'popup'
};

// 3. Utility Functions
function makeImageUrl(imageId) {
    try {
        return `https://imagedelivery.net/Vv7GgOGQbSyClWJqhyP0VQ/${imageId}/public`;
    } catch (error) {
        console.error('Error creating image URL:', error);
        return '';
    }
}

function safelySendMessage(target, type, data) {
    try {
        if (!target?.postMessage) return;
        target.postMessage({ type, data }, '*');
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

function animateElement(element, show = true, duration = 300) {
    if (!element) return;

    element.style.transition = `opacity ${duration}ms ease-in-out`;
    element.style.opacity = show ? '0' : '1';

    requestAnimationFrame(() => {
        element.style.opacity = show ? '1' : '0';
        setTimeout(() => {
            element.style.display = show ? 'block' : 'none';
        }, show ? 0 : duration);
    });
}

// 4. DOM Element Creation
function createChatbotElements() {
    try {
        const chatBotIcon = document.createElement('div');
        chatBotIcon.id = 'interfaceEmbed';

        const imgElement = document.createElement('img');
        imgElement.id = 'popup-interfaceEmbed';
        imgElement.className = 'chatbot-icon-interfaceEmbed';
        imgElement.alt = 'Ask Ai';
        imgElement.src = CONFIG.icons.black;
        imgElement.style.visibility = 'hidden';

        const textElement = document.createElement('span');
        textElement.id = 'popup-interfaceEmbed-text';

        chatBotIcon.appendChild(imgElement);
        chatBotIcon.appendChild(textElement);
        document.body.appendChild(chatBotIcon);

        return { chatBotIcon, imgElement, textElement };
    } catch (error) {
        console.error('Error creating chatbot elements:', error);
        return null;
    }
}

// 5. Props Management
function updateProps(newProps = {}) {
    try {
        state.props = { ...state.props, ...newProps };
        setPropValues(newProps);
    } catch (error) {
        console.error('Error updating props:', error);
    }
}

function setPropValues(newProps) {
    try {
        const elements = {
            icon: document.getElementById("popup-interfaceEmbed"),
            container: document.getElementById('iframe-parent-container'),
            interfaceEmbed: document.getElementById('interfaceEmbed'),
            closeButton: document.getElementById('close-button-interfaceEmbed')
        };

        if (newProps.iconColor && elements.icon) {
            elements.icon.src = newProps.iconColor === 'dark' ? CONFIG.icons.white : CONFIG.icons.black;
        }

        if (newProps.fullScreen !== undefined && elements.container) {
            elements.container.classList.toggle('full-screen-interfaceEmbed',
                newProps.fullScreen === true || newProps.fullScreen === 'true');
        }

        if ('hideIcon' in newProps && elements.interfaceEmbed) {
            elements.interfaceEmbed.style.display =
                (newProps.hideIcon === true || newProps.hideIcon === 'true') ? 'none' : 'unset';
        }

        if ('hideCloseButton' in newProps && elements.closeButton) {
            elements.closeButton.style.display =
                (newProps.hideCloseButton === true || newProps.hideCloseButton === 'true') ? 'none' : 'unset';
        }
    } catch (error) {
        console.error('Error setting prop values:', error);
    }
}

// 6. Event Handlers
function setupEventListeners() {
    try {
        const chatbotIcon = document.getElementById('interfaceEmbed');
        if (chatbotIcon) {
            chatbotIcon.addEventListener('click', openChatbot);
        }

        window.addEventListener('message', (event) => {
            if (event.data?.type === 'CLOSE_CHATBOT') {
                closeChatbot();
            }
        });

        // Mutation Observer for script tag
        const observer = new MutationObserver(handleScriptRemoval);
        observer.observe(document.head, { childList: true });

        // Resize Observer
        const iframeObserver = new ResizeObserver(handleResize);
        iframeObserver.observe(document.documentElement);
    } catch (error) {
        console.error('Error setting up event listeners:', error);
    }
}

// 7. Chatbot Operations
function openChatbot() {
    try {
        // Get iframe reference first
        const iframeComponent = document.getElementById('iframe-component-interfaceEmbed');

        // Notify all contexts
        safelySendMessage(window.parent, 'open', {});
        safelySendMessage(window.ReactNativeWebView, 'open', {});
        safelySendMessage(iframeComponent?.contentWindow, 'open', {});

        const interfaceElement = document.getElementById('interfaceEmbed');
        const iframeContainer = document.getElementById('iframe-parent-container');

        if (interfaceElement && iframeContainer) {
            interfaceElement.style.display = 'none';
            // Make sure container is visible before animation
            iframeContainer.style.display = 'block';
            iframeContainer.style.opacity = '0';
            animateElement(iframeContainer, true);
            document.body.style.overflow = 'hidden';
        }
    } catch (error) {
        console.error('Error opening chatbot:', error);
    }
}

function closeChatbot() {
    try {
        const iframeContainer = document.getElementById('iframe-parent-container');
        if (!iframeContainer?.style?.display === 'block') return;

        animateElement(iframeContainer, false, 200);

        setTimeout(() => {
            document.body.style.overflow = 'auto';
            const interfaceElement = document.getElementById('interfaceEmbed');
            if (interfaceElement) {
                interfaceElement.style.display = (state.props.hideIcon === true || state.props.hideIcon === 'true')
                    ? 'none'
                    : 'unset';
            }

            // Notify all contexts
            safelySendMessage(window.parent, 'close', {});
            safelySendMessage(window.ReactNativeWebView, 'close', {});
            safelySendMessage(iframeComponent?.contentWindow, 'close', {});
        }, 200);
    } catch (error) {
        console.error('Error closing chatbot:', error);
    }
}

// 8. API Communication
async function loadChatbotEmbed() {
    try {
        const script = document.getElementById('chatbot-main-script');
        const embedToken = script?.getAttribute('embedToken');
        const interface_id = script?.getAttribute('interface_id');

        if (!document.getElementById('iframe-parent-container')) {
            changeContainer(state.props.parentId || '');
        }

        const requestOptions = createRequestOptions(embedToken, interface_id);
        const response = await fetch(CONFIG.urls.login, requestOptions);
        const data = await response.json();

        handleChatbotResponse(data);
    } catch (error) {
        console.error('Error loading chatbot embed:', error);
    }
}

function createRequestOptions(embedToken, interface_id) {
    if (embedToken) {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: embedToken
            }
        };
    }

    if (interface_id) {
        return {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                isAnonymousUser: true,
                interface_id: interface_id
            })
        };
    }

    throw new Error('Neither embedToken nor interface_id provided');
}

function handleChatbotResponse(data) {
    try {
        if (!data?.data) return;

        state.config = data.data.config;
        const encodedData = encodeURIComponent(JSON.stringify(data.data));
        const modifiedUrl = `${CONFIG.urls.base}?interfaceDetails=${encodedData}`;

        const iframeComponent = document.getElementById('iframe-component-interfaceEmbed');
        if (iframeComponent) {
            iframeComponent.src = modifiedUrl;
            // Ensure iframe is visible
            iframeComponent.style.display = 'block';
            iframeComponent.style.width = '100%';
            iframeComponent.style.height = '100%';
            iframeComponent.style.border = 'none';
        }

        if (state.config) {
            state.props.config = { ...state.props.config, ...state.config };
            applyConfig({ ...state.config });
        }
    } catch (error) {
        console.error('Error handling chatbot response:', error);
    }
}

// 9. Configuration Application
function applyConfig(config) {
    try {
        if (!config) return;

        const elements = {
            interfaceEmbed: document.getElementById('interfaceEmbed'),
            container: document.getElementById('iframe-parent-container'),
            textElement: document.getElementById('popup-interfaceEmbed-text'),
            imgElement: document.getElementById('popup-interfaceEmbed')
        };

        if (!elements.container) return;

        updateVisualElements(elements, config);
        updateContainerDimensions(elements.container, config);
        updateContainerClasses(elements, config);
    } catch (error) {
        console.error('Error applying config:', error);
    }
}

function updateVisualElements(elements, config) {
    if (config.title) {
        state.title = config.title;
    }

    if (config.buttonName) {
        state.buttonName = config.buttonName;
        elements.textElement.innerText = config.buttonName;
        elements.interfaceEmbed?.classList.add('show-bg-color');
        elements.imgElement.style.visibility = 'hidden';
    } else {
        elements.textElement.innerText = '';
        elements.interfaceEmbed?.classList.remove('show-bg-color');
        elements.imgElement.style.visibility = 'visible';
    }

    if (config.iconUrl) {
        elements.imgElement.src = config.iconUrl;
        elements.interfaceEmbed?.classList.remove('show-bg-color');
        elements.textElement.innerText = '';
        elements.imgElement.style.visibility = 'visible';
    }
}

function updateContainerDimensions(container, config) {
    if (state.className === 'all_available_space') {
        container.style.height = '100%';
        container.style.width = '100%';
        container.style.display = 'block';
    } else {
        container.style.height = `${config?.height}${config?.heightUnit || ''}` || '70vh';
        container.style.width = `${config?.width}${config?.widthUnit || ''}` || '40vw';
    }
}

// 10. Message Handling
function SendDataToChatbot(dataToSend) {
    try {
        if (typeof dataToSend === 'string') {
            dataToSend = JSON.parse(dataToSend);
        }

        safelySendMessage(window.ReactNativeWebView, 'data', dataToSend);
        handleParentIdChange(dataToSend);
        sendOtherData(dataToSend);
    } catch (error) {
        console.error('Error sending data to chatbot:', error);
    }
}

function handleParentIdChange(dataToSend) {
    if (!('parentId' in dataToSend)) return;

    const previousParentId = state.props.parentId;
    const newParentId = dataToSend.parentId;

    if (previousParentId === newParentId) return;

    const existingParent = document.getElementById(previousParentId);
    if (existingParent?.contains(state.parentContainer)) {
        existingParent.removeChild(state.parentContainer);
    } else if (state.parentContainer && document.body.contains(state.parentContainer)) {
        document.body.removeChild(state.parentContainer);
    }

    updateProps({ parentId: newParentId });
    changeContainer(newParentId || '');
}

// 11. DOM Manipulation Functions
function createIframeContainer() {
    try {
        const container = document.createElement('div');
        container.id = 'iframe-parent-container';
        container.className = 'popup-parent-container'
        container.style.display = 'none';

        const iframe = document.createElement('iframe');
        iframe.id = 'iframe-component-interfaceEmbed';
        iframe.className = 'iframe-component-interfaceEmbed';
        iframe.allow = 'microphone';

        container.appendChild(iframe);

        return container;
    } catch (error) {
        console.error('Error creating iframe container:', error);
        return null;
    }
}

function changeContainer(parentId) {
    try {
        const container = createIframeContainer();
        if (!container) return;

        state.parentContainer = container;

        if (parentId) {
            const parentElement = document.getElementById(parentId);
            if (parentElement) {
                parentElement.appendChild(container);
                return;
            }
        }

        document.body.appendChild(container);
    } catch (error) {
        console.error('Error changing container:', error);
    }
}

// 12. Observer Handlers
function handleScriptRemoval(mutationsList, observer) {
    try {
        for (const mutation of mutationsList) {
            if (mutation.type !== 'childList') continue;

            handleAddedNodes(mutation.addedNodes);
            handleRemovedNodes(mutation.removedNodes, observer);
        }
    } catch (error) {
        console.error('Error handling script removal:', error);
    }
}

function handleAddedNodes(nodes) {
    for (const node of nodes) {
        if (node.id === 'chatbot-main-script') {
            const script = document.getElementById('chatbot-main-script');
            if (script) {
                createProps();
            }
        }
    }
}

function handleRemovedNodes(nodes, observer) {
    for (const node of nodes) {
        if (node.id === 'chatbot-main-script') {
            cleanupChatbot();
            observer.disconnect();
        }
    }
}

function handleResize(entries) {
    try {
        const container = document.getElementById('iframe-parent-container');
        if (!container) return;

        for (const entry of entries) {
            const { width } = entry.contentRect;

            if (width < 600) {
                container.style.height = '100%';
                container.style.width = '100%';
            } else {
                applyConfig(state.props?.config);
            }
        }
    } catch (error) {
        console.error('Error handling resize:', error);
    }
}

// 13. Cleanup Functions
function cleanupChatbot() {
    try {
        const elementsToRemove = [
            'iframe-parent-container',
            'interfaceEmbed',
            'chatbotEmbed-style'
        ];

        elementsToRemove?.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.remove();
            }
        });
    } catch (error) {
        console.error('Error cleaning up chatbot:', error);
    }
}

// 14. Style Management
function loadStyles() {
    try {
        const link = document.createElement('link');
        link.id = 'chatbotEmbed-style';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = CONFIG.urls.style;
        document.head.appendChild(link);
    } catch (error) {
        console.error('Error loading styles:', error);
    }
}

// 15. Initialization
function createProps() {
    try {
        const script = document.getElementById('chatbot-main-script');
        if (!script) {
            console.warn('Script tag not found');
            return;
        }

        const newProps = {};
        CONFIG.attributes.forEach(attr => {
            if (script.hasAttribute(attr)) {
                let value = script.getAttribute(attr);

                // Parse JSON attributes
                if (['config', 'headerButtons', 'eventsToSubscribe', 'modalConfig'].includes(attr)) {
                    try {
                        value = JSON.parse(value);
                    } catch (e) {
                        console.warn(`Failed to parse ${attr}:`, e);
                    }
                }

                newProps[attr] = value;
                state.tempDataToSend = { ...state.tempDataToSend, [attr]: value };
            }
        });

        updateProps(newProps);
    } catch (error) {
        console.error('Error creating props:', error);
    }
}

function init() {
    try {
        createChatbotElements();
        createProps();
        loadStyles();
        setupEventListeners();
        loadChatbotEmbed();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export necessary functions for external use
window.closeChatbot = closeChatbot;
window.openChatbot = openChatbot;
window.SendDataToChatbot = SendDataToChatbot;