// Save API key to Chrome's local storage
document.getElementById("saveKeyBtn").addEventListener("click", () => {
    const apiKey = document.getElementById("apiKeyInput").value.trim();

    if (!apiKey) {
        showStatus("API key cannot be empty!", "red");
        return;
    }

    // Save the API key to Chrome storage
    chrome.storage.local.set({ apiKey }, () => {
        showStatus("API key saved successfully!", "green");
    });
});

// Show status message
function showStatus(message, color) {
    const statusMessage = document.getElementById("statusMessage");
    statusMessage.textContent = message;
    statusMessage.style.color = color;

    setTimeout(() => {
        statusMessage.textContent = "";
    }, 3000);
}

// Load the existing API key on popup load
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("apiKey", (result) => {
        if (result.apiKey) {
            document.getElementById("apiKeyInput").value = result.apiKey;
        }
    });
});
