// Inject CSS styles for dyslexia mode
const style = document.createElement("style");
style.textContent = `
    .dys_mode {
        font-family: 'Times New Roman', Arial, sans-serif !important;
        line-height: 1.6 !important;
        letter-spacing: 0.5px !important;
        background-color: #f0e68c !important;  /* Light khaki background color */
        color: #3a322d !important;  /* Dark text color */
    }

    .dys_mode * {
        font-family: 'Times New Roman', Arial, sans-serif !important;
        line-height: 1.6 !important;
        letter-spacing: 0.5px !important;
        color: #3a322d !important;
    }
`;
document.head.appendChild(style);

// Variable to keep track of whether dyslexia mode is enabled
let isDyslexiaMode = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "enableDyslexiaMode") {
        isDyslexiaMode = !isDyslexiaMode;
        
        if (isDyslexiaMode) {
            document.documentElement.classList.add("dys_mode");
            document.body.classList.add("dys_mode");
        } else {
            document.documentElement.classList.remove("dys_mode");
            document.body.classList.remove("dys_mode");
        }
        
        console.log("Reading Mode " + (isDyslexiaMode ? "Enabled!" : "Disabled!"));
        sendResponse({ status: isDyslexiaMode ? "enabled" : "disabled" });
    }
});
