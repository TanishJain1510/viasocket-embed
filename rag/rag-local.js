/* eslint-disable */
const loginurl = 'http://localhost:7072/user/embed/login';
const urlToRag = `http://localhost:3001/rag`;

(function () {
    let ragScript = document.getElementById('rag-main-script');
    const embedToken = ragScript.getAttribute('embedToken');
    const configuration = {
        chunkingType: ragScript.getAttribute('chunkingType') || null,
        hideConfig: ragScript.getAttribute('hideConfig') || null,
    }
    // Ensure a global namespace object exists
    window.MyEmbed = window.MyEmbed || {};

    // Create iframe immediately without src
    let embedIframe = document.createElement('iframe');
    embedIframe.style.display = 'none';
    embedIframe.style.position = 'fixed';
    embedIframe.style.top = '0';
    embedIframe.style.left = '0';
    embedIframe.style.width = '100vw';
    embedIframe.style.height = '100vh';
    embedIframe.style.border = 'none';
    embedIframe.style.zIndex = '999999';
    embedIframe.sandbox = 'allow-same-origin allow-scripts allow-popups allow-forms';
    embedIframe.allow = 'cross-origin-isolated';
    document.body.appendChild(embedIframe);

    // Handle login and set src
    if (embedToken) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: embedToken
            }
        };

        fetch(loginurl, requestOptions)
            .then(async (response) => {
                const data = await response.json();
                const dataToPass = {
                    ...data?.data,
                    configuration: configuration
                }
                let modifiedUrl = urlToRag;
                const encodedData = encodeURIComponent(`${JSON.stringify(dataToPass)}`);
                modifiedUrl = `${modifiedUrl}?ragDetails=${encodedData}`;
                embedIframe.src = modifiedUrl;
                return data;
            })
            .catch((error) => {
                console.log('Fetch error:', error);
            });
    }

    /**
     * Opens (shows) the iframe covering the entire screen.
     */
    function openIframe() {
        embedIframe.style.display = 'block';
    }

    /**
     * Closes (hides) the iframe.
     */
    function closeIframe() {
        embedIframe.style.display = 'none';
    }

    // Expose our functions to the global scope
    window.openRag = openIframe;
    window.closeRag = closeIframe;

    // Listen for close message from iframe
    window.addEventListener('message', (event) => {
        if (event.data.type === 'closeRag') {
            closeIframe();
        }
    });
})();
