// Inject CSS styles for dyslexia mode
const style = document.createElement("style");
style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Open+Dyslexic&display=swap');
    .dys_mode {
        font-family: 'Century Gothic', Arial, sans-serif;
        line-height: 1.6;
        letter-spacing: 0.5px;
        background-color: #f0e68c;  /* Light khaki background color */
        color: #3a322d;  /* Dark text color */
    }
`;
document.head.appendChild(style);


// Variable to keep track of whether dyslexia mode is enabled
let isDyslexiaMode = false;

// Listen for message from popup.js to enable dyslexia mode
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "enableDyslexiaMode") {
        document.body.classList.add("dys_mode"); // Apply the style
        console.log("Dyslexia Mode enabled!");
        sendResponse({ status: "enabled" });
    }
});
