// Script to copy and dump message conversation from chat history
// Kamalakshan 
// 4th July 2025


    window.saveMessages = () => {
    const messageDivs = Array.from(document.querySelectorAll('div[id^="content-"]'));
    const output = [];

    messageDivs.forEach(div => {
        // Collect full text content of the div (not just <p>)
        const message = div.innerText.trim();
        if (!message) return;

        let node = div;
        let name = "", time = "";

        // Traverse up 3 levels max to find metadata
        for (let i = 0; i < 3 && (!name || !time); i++) {
            node = node.parentElement;
            if (!node) break;

            if (!name) {
                const nameEl = node.querySelector('[data-tid="message-author-name"]');
                if (nameEl) name = nameEl.innerText.trim();
            }

            if (!time) {
                const timeEl = node.querySelector("time");
                if (timeEl) time = timeEl.innerText.trim();
            }
        }

        output.push(`👤 ${name || "Unknown"}\n🕒 ${time || "Unknown time"}\n💬 ${message}`);
    });

    const resultText = output.join("\n\n---\n\n");
    const blob = new Blob([resultText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const filename = "teams_chat_log.txt";

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    console.log(`✅ Downloaded ${output.length} messages as ${filename}`);
};
console.log("✅ saveMessages() is ready. All message content, including lists, will now be saved.");
