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

// Toggle Dyslexia Mode
dyslexiaModeButton.addEventListener("click", () => {
    isDyslexiaMode = !isDyslexiaMode;

    if (isDyslexiaMode) {
        document.body.classList.add("dys_mode");  // Apply dyslexia mode class
    } else {
        document.body.classList.remove("dys_mode");
    }
});



// Variable to keep track of whether dyslexia mode is enabled
let isDyslexiaMode = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "enableDyslexiaMode") {
        document.body.style.fontFamily = "'OpenDyslexic', Arial, sans-serif";  // Example action
        document.body.style.backgroundColor = "#f0e68c";  // Light khaki background color
        document.body.style.color = "#3a322d";  // Dark text color
        document.body.style.lineHeight = "1.6";
        document.body.style.letterSpacing = "0.5px";
        console.log("Dyslexia Mode enabled!");
        sendResponse({ status: "enabled" });
    }
});

