const { cmd } = require('../command');
const { downloadMediaMessage } = require('../lib/msg'); // Import from lib/msg.js

// Read View Once Message Command
cmd({
    pattern: "vv",
    desc: "Read and download view-once messages",
    category: "tools",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        // Ensure the message is a view-once message
        if (!quoted || !quoted.isViewOnce) {
            return reply("✳️❇️ This is not a View Once message.");
        }

        // Download the content from the view-once message
        const { buffer, caption } = await downloadMediaMessage(quoted);

        // Send the media back to the user
        const mtype = Object.keys(quoted.message)[0].replace("Message", "").toLowerCase();
        await conn.sendMessage(from, {
            [mtype]: buffer,
            caption
        }, { quoted: mek });
        
    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});

module.exports = { sms, downloadMediaMessage };