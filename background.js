// Create context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "simplifyText",
        title: "Simplify Text", // Title displayed when right-clicking on text
        contexts: ["selection"] // This context menu item will appear only when selecting text
    });
});

// Handle context menu item click
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "simplifyText") {
        // Get the selected text
        const selectedText = info.selectionText;
        
        // Ensure selected text is not empty
        if (selectedText.trim() === "") {
            chrome.tabs.sendMessage(tab.id, {
                action: "showError",
                error: "No text selected. Please select some text to simplify."
            });
            return;
        }

        // Replace with the actual backend service URL
        fetch('https://your-backend-service.com/simplify', { // Make sure to update with your actual backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: selectedText }) // Send the selected text to the backend
        })
        .then(response => {
            // Check if the response is valid
            if (!response.ok) {
                throw new Error("Failed to fetch simplified text.");
            }
            return response.json(); // Parse the response JSON
        })
        .then(data => {
            // Send simplified text to content script
            chrome.tabs.sendMessage(tab.id, {
                action: "showSimplified",
                text: data.simplified // Assuming 'simplified' is the simplified text in the response
            });
        })
        .catch(error => {
            // If there is an error, send an error message to the content script
            console.error('Error:', error);
            chrome.tabs.sendMessage(tab.id, {
                action: "showError",
                error: "Failed to simplify text. Please try again."
            });
        });
    }
});
