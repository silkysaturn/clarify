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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "enableDyslexiaMode") {
        document.body.style.fontFamily = "'OpenDyslexic', Arial, sans-serif";  // Example action
        console.log("Dyslexia Mode enabled!");
        sendResponse({ status: "enabled" });  // Optional response
    }
});
