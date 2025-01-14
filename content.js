// Inject CSS styles for dyslexia mode and tooltips
const style = document.createElement("style");
style.textContent = `
    .dys_mode {
        font-family: 'Century Gothic', Arial, sans-serif !important;
        line-height: 1.6 !important;
        letter-spacing: 0.5px !important;
        background-color: #FFFDD0 !important;
        color: #3a322d !important;
    }

    .dys_mode * {
        font-family: 'Century Gothic', Arial, sans-serif !important;
        line-height: 1.6 !important;
        letter-spacing: 0.5px !important;
        color: #3a322d !important;
    }

    .clarify-tooltip {
        position: fixed;
        z-index: 10000;
        background-color: white;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        max-width: 300px;
        max-height: 200px;
        overflow-y: auto;
    }

    .clarify-tooltip .close-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
        padding: 2px 6px;
        border: none;
        background: #f0f0f0;
        border-radius: 3px;
    }
`;
document.head.appendChild(style);

// Variable to keep track of whether dyslexia mode is enabled
let isDyslexiaMode = false;

// Function to create and show tooltip
function showTooltip(text, position) {
    // Remove any existing tooltips
    const existingTooltip = document.querySelector('.clarify-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }

    const tooltip = document.createElement('div');
    tooltip.className = 'clarify-tooltip';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.textContent = '×';
    closeBtn.onclick = () => tooltip.remove();
    
    const content = document.createElement('div');
    content.style.marginTop = '10px';
    content.textContent = text;
    
    tooltip.appendChild(closeBtn);
    tooltip.appendChild(content);
    
    // Position tooltip near the selection
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    
    document.body.appendChild(tooltip);
    
    // Close tooltip when clicking outside
    document.addEventListener('click', function closeTooltip(e) {
        if (!tooltip.contains(e.target)) {
            tooltip.remove();
            document.removeEventListener('click', closeTooltip);
        }
    });
}

// Listen for messages from background script
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
    else if (message.action === "showSimplified") {
        showTooltip(message.text);
    }
    else if (message.action === "showError") {
        showTooltip(message.error);
    }
});
