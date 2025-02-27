document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("dys_btn");
    const output = document.getElementById("output");

    button.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { action: "enableDyslexiaMode" }, (response) => {
                console.log("Response from content script:", response);
                output.textContent = `Reading Mode ${response.status === "enabled" ? "Enabled!" : "Disabled!"}`;
            });
        });
    });
});
