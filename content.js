// Create a button for enabling/disabling dyslexia mode
const dyslexiaModeButton = document.createElement("button");
dyslexiaModeButton.innerText = "Toggle Dyslexia Mode";
dyslexiaModeButton.style.position = "fixed";
dyslexiaModeButton.style.top = "20px";
dyslexiaModeButton.style.right = "20px";
dyslexiaModeButton.style.padding = "10px";
dyslexiaModeButton.style.backgroundColor = "#ffcc00";
dyslexiaModeButton.style.border = "none";
dyslexiaModeButton.style.fontSize = "16px";
dyslexiaModeButton.style.cursor = "pointer";

// Inject CSS styles for dyslexia mode
const style = document.createElement("style");
style.textContent = `
    #dys_mode {
        font-family: 'OpenDyslexic', Arial, sans-serif;
        line-height: 1.6;
        letter-spacing: 0.5px;
    }
`;
document.head.appendChild(style);


// Append button to the body
document.body.appendChild(dyslexiaModeButton);

// Variable to keep track of whether dyslexia mode is enabled
let isDyslexiaMode = false;

// Add click event to toggle dyslexia mode
dyslexiaModeButton.addEventListener("click", () => {
    isDyslexiaMode = !isDyslexiaMode;

    if (isDyslexiaMode) {
        document.body.classList.add("dys_mode");
    } else {
        document.body.classList.remove("dys_mode");
    }
});

// Listen for the message from popup.js to enable dyslexia mode
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "enableDyslexiaMode") {
        // Enable dyslexia mode when the message is received
        isDyslexiaMode = true;
        document.body.classList.add("dys_mode");
    }
});
