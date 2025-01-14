document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("dys_btn");
    const output = document.getElementById("output");

    button.addEventListener("click", () => {
        chrome.tabs.query({active: true,currentWindow: true}, (tabs) => {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.is, { action: "enableDyslexiaMode" });
        });
        output.textContent = "Dyslexia Mode Enabled!";
    })
});