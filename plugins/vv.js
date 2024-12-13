const { cmd } = require('../command');
const { downloadMediaMessage } = require('../lib/msg'); // Import the function from lib/msg.js

// Read View Once Message Command
cmd({
    pattern: "vv",
    desc: "Read and download view-once messages",
    category: "tools",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!quoted || !/viewOnce/.test(quoted.mtype)) {
            return reply("✳️❇️ It's not a View Once message.");
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