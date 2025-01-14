
const simplifyButton = document.createElement("button");
simplifyButton.textContent = "Simplify Text";
simplifyButton.style.position = "fixed";
simplifyButton.style.bottom = "10px";
simplifyButton.style.right = "10px";
simplifyButton.style.zIndex = "1000";
document.body.appendChild(simplifyButton);

simplifyButton.addEventListener("click", () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
        chrome.runtime.sendMessage({ action: "simplifyText", text: selectedText });
    } else {
        alert("Please select text to simplify!");
    }
});
const toggleDyslexiaMode = document.createElement("button");
toggleDyslexiaMode.textContent = "Dyslexia Mode";
toggleDyslexiaMode.style.position = "fixed";
toggleDyslexiaMode.style.top = "10px";
toggleDyslexiaMode.style.right = "10px";
toggleDyslexiaMode.style.zIndex = "1000";
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
