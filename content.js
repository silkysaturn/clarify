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
