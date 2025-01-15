// Create context menu items
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "simplifyText",
        title: "Simplify Text",
        contexts: ["selection"]
    });
    
    chrome.contextMenus.create({
        id: "defineWord",
        title: "Define Word",
        contexts: ["selection"]
    });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "simplifyText") {
        const selectedText = info.selectionText;
        
        fetch('http://127.0.0.1:5000/simplify', {
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
    else if (info.menuItemId === "defineWord") {
        const selectedWord = info.selectionText.trim();
        
        fetch('http://127.0.0.1:5000/define', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word: selectedWord })
        })
        .then(response => response.json())
        .then(data => {
            chrome.tabs.sendMessage(tab.id, {
                action: "showDefinition",
                text: data.definition
            });
        })
        .catch(error => {
            console.error('Error:', error);
            chrome.tabs.sendMessage(tab.id, {
                action: "showError",
                error: "Failed to get definition. Please try again."
            });
        });
    }
});
