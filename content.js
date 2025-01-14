const toggleDyslexiaMode = document.createElement("button");
toggleDyslexiaMode.textContent = "Toggle Dyslexia Mode";
toggleDyslexiaMode.style.position = "fixed";
toggleDyslexiaMode.style.top = "10px";
toggleDyslexiaMode.style.right = "10px";
toggleDyslexiaMode.style.zIndex = "1000";
toggleDyslexiaMode.style.padding = "10px";
toggleDyslexiaMode.style.backgroundColor = "#007bff";
toggleDyslexiaMode.style.color = "#fff";
toggleDyslexiaMode.style.border = "none";
toggleDyslexiaMode.style.borderRadius = "5px";
toggleDyslexiaMode.style.cursor = "pointer";
document.body.appendChild(toggleDyslexiaMode);

let isDyslexiaMode = false;

toggleDyslexiaMode.addEventListener("click", () => {
    if (isDyslexiaMode) {
        document.body.classList.remove("dyslexia-mode");
    } else {
        document.body.classList.add("dyslexia-mode");
    }
    isDyslexiaMode = !isDyslexiaMode;
});
<<<<<<< HEAD
=======

// Add Simplify Text Button
const simplifyButton = document.createElement("button");
simplifyButton.textContent = "Simplify Text";
simplifyButton.style.position = "fixed";
simplifyButton.style.bottom = "10px";
simplifyButton.style.right = "10px";
simplifyButton.style.zIndex = "1000";
simplifyButton.style.padding = "10px";
simplifyButton.style.backgroundColor = "#28a745";
simplifyButton.style.color = "#fff";
simplifyButton.style.border = "none";
simplifyButton.style.borderRadius = "5px";
simplifyButton.style.cursor = "pointer";
document.body.appendChild(simplifyButton);

simplifyButton.addEventListener("click", () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
        chrome.runtime.sendMessage({ action: "simplifyText", text: selectedText });
    } else {
        alert("Please select text to simplify!");
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "displaySimplifiedText") {
        alert(`Simplified Text: ${message.text}`);
    }
});

>>>>>>> parent of 0340309 (debugging)
