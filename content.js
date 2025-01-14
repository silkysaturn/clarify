// Inject CSS styles for dyslexia mode
const style = document.createElement("style");
style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Open+Dyslexic&display=swap');
    .dys_mode {
        font-family: 'Times New Roman', Arial, sans-serif;
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

// Function to simplify text using OpenAI API
async function simplifyText(text) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await chrome.storage.sync.get('apiKey')}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: "You are a helpful assistant that simplifies complex text for better understanding. Keep the meaning intact but use simpler words and shorter sentences."
                }, {
                    role: "user",
                    content: `Please simplify this text: ${text}`
                }],
                temperature: 0.7
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error simplifying text:', error);
        return null;
    }
}

// Function to handle text selection
function handleTextSelection() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        const button = document.createElement('button');
        button.textContent = 'Simplify';
        button.style.position = 'fixed';
        button.style.zIndex = '10000';
        
        // Position the button near the selection
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        button.style.top = `${rect.bottom + window.scrollY + 5}px`;
        button.style.left = `${rect.left + window.scrollX}px`;
        
        button.onclick = async () => {
            const simplified = await simplifyText(selectedText);
            if (simplified) {
                // Create a tooltip with simplified text
                const tooltip = document.createElement('div');
                tooltip.style.position = 'fixed';
                tooltip.style.zIndex = '10000';
                tooltip.style.backgroundColor = '#fff';
                tooltip.style.padding = '10px';
                tooltip.style.border = '1px solid #ccc';
                tooltip.style.borderRadius = '5px';
                tooltip.style.maxWidth = '300px';
                tooltip.style.top = `${rect.bottom + window.scrollY + 30}px`;
                tooltip.style.left = `${rect.left + window.scrollX}px`;
                tooltip.textContent = simplified;
                
                document.body.appendChild(tooltip);
                
                // Remove tooltip when clicking outside
                document.addEventListener('click', function removeTooltip(e) {
                    if (!tooltip.contains(e.target)) {
                        tooltip.remove();
                        document.removeEventListener('click', removeTooltip);
                    }
                });
            }
            button.remove();
        };
        
        document.body.appendChild(button);
        
        // Remove button when selection changes
        document.addEventListener('selectionchange', function removeButton() {
            button.remove();
            document.removeEventListener('selectionchange', removeButton);
        });
    }
}

// Listen for text selection
document.addEventListener('mouseup', handleTextSelection);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "enableDyslexiaMode") {
        document.body.style.fontFamily = "'Times New Roman', Arial, sans-serif";
        document.body.style.backgroundColor = "#f0e68c";
        document.body.style.color = "#3a322d";
        document.body.style.lineHeight = "1.6";
        document.body.style.letterSpacing = "0.5px";
        console.log("Reading Mode Enabled!");
        sendResponse({ status: "enabled" });
    }
});
