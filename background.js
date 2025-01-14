// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "simplifyText",
        title: "Simplify Text",
        contexts: ["selection"]
    });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "simplifyText") {
        const selectedText = info.selectionText;
        
        // Replace with your actual server endpoint
        fetch('https://nosu-ai-hackathon.onrender.com/simplify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: selectedText })
        })
        .then(response => response.json())
        .then(data => {
            chrome.tabs.sendMessage(tab.id, {
                action: "showSimplified",
                text: data.simplified || data.text
            });
        })
        .catch(error => {
            console.error('Error:', error);
            chrome.tabs.sendMessage(tab.id, {
                action: "showError",
                error: "Failed to simplify text. Please try again."
            });
        });
    }
});
