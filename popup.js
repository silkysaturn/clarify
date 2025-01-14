document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("dys_btn");
    const output = document.getElementById("output");
    const apiKeyInput = document.getElementById("api_key");
    const saveKeyButton = document.getElementById("save_key");

    // Load saved API key
    chrome.storage.sync.get('apiKey', (data) => {
        if (data.apiKey) {
            apiKeyInput.value = data.apiKey;
        }
    });

    // Save API key
    saveKeyButton.addEventListener("click", () => {
        const apiKey = apiKeyInput.value.trim();
        if (apiKey) {
            chrome.storage.sync.set({ apiKey }, () => {
                output.textContent = "API key saved!";
                setTimeout(() => {
                    output.textContent = "";
                }, 2000);
            });
        }
    });

    button.addEventListener("click", () => {
        console.log("Button clicked! Sending message...");
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { action: "enableDyslexiaMode" }, (response) => {
                console.log("Response from content script:", response);
            });
        });
        output.textContent = "Reading Mode Enabled!";
    });
});
