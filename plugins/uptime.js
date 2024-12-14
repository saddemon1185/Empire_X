const config = require('../config');
const { cmd } = require('../command');
const os = require("os");

cmd({
    pattern: "uptime",
    desc: "Check bot's uptime.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from }) => {
    try {
        // Function to format uptime
        function formatUptime(seconds) {
            const days = Math.floor(seconds / (24 * 60 * 60));
            seconds %= 24 * 60 * 60;
            const hours = Math.floor(seconds / (60 * 60));
            seconds %= 60 * 60;
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        // Get the formatted uptime
        const uptime = formatUptime(process.uptime());

        // Button with link
        const buttons = [
            {
                buttonId: 'join_channel',
                buttonText: { displayText: 'Join Channel' },
                type: 1
            }
        ];

        const buttonMessage = {
            text: `🕒 *Bot Uptime*: _${uptime}_`,
            footer: '',
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                externalAdReply: {
                    title: "",
                    body: "",
                    mediaType: 1,
                    mediaUrl: "https://whatsapp.com/channel/0029VajVvpQIyPtUbYt3Oz0k",
                    sourceUrl: "https://whatsapp.com/channel/0029VajVvpQIyPtUbYt3Oz0k"
                }
            }
        };

        // Send the button message with uptime
        await conn.sendMessage(from, buttonMessage, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ An error occurred: ${e.message || e}`);
    }
});