const { cmd, commands } = require('../command');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

// Read View Once Message Command
cmd({
    pattern: "vv",
    desc: "Read and download view-once messages",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!quoted || !/viewOnce/.test(quoted.mtype)) {
            return reply("✳️❇️ It's not a View Once message.");
        }

        const mtype = Object.keys(quoted.message)[0];
        const mediaMessage = quoted.message[mtype];

        // Check for view-once content
        if (!mediaMessage) return reply("Unable to access the content of the view-once message.");

        // Download the content
        const stream = await downloadContentFromMessage(mediaMessage, mtype.replace("Message", "").toLowerCase());
        let buffer = Buffer.from([]);
        
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        const caption = mediaMessage.caption || "Here is the content of the view-once message.";
        
        // Send the media back to the user
        await conn.sendMessage(from, {
            [mtype.replace(/Message/, '').toLowerCase()]: buffer,
            caption
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});