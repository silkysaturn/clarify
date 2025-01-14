chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "simplifyText") {
        fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer YOUR_API_KEY`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Simplify this text: "${message.text}"`,
                max_tokens: 100
            })
        })
        .then(response => response.json())
        .then(data => {
            const simplifiedText = data.choices[0].text.trim();
            chrome.tabs.sendMessage(sender.tab.id, { action: "showSimplifiedText", text: simplifiedText });
        });
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "showSimplifiedText") {
        alert(`Simplified Text: ${message.text}`);
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "simplifyText") {
        const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your API key
        const prompt = `Simplify this text: "${message.text}"`;

        fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 100,
                temperature: 0.7
            })
        })
        .then((response) => response.json())
        .then((data) => {
            const simplifiedText = data.choices[0].text.trim();
            chrome.tabs.sendMessage(sender.tab.id, { action: "displaySimplifiedText", text: simplifiedText });
        })
        .catch((error) => {
            console.error("Error with OpenAI API:", error);
            chrome.tabs.sendMessage(sender.tab.id, { action: "displaySimplifiedText", text: "Error simplifying text. Please try again." });
        });
    }
});


