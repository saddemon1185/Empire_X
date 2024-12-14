const config = require('../config');
const { cmd } = require('../command');
const os = require("os");

cmd({
    pattern: "uptime",
    desc: "Check bot's uptime.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, pushname, reply }) => {
    try {
        // Function to format uptime into days, hours, minutes, and seconds
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

        // Message text
        const uptimeMessage = `📌 *Empire_X*  \n\n` +
            `🕒 *Bot Has Been Up For:* _${uptime}_`;

        // Button with link
        const buttons = [
            {
                buttonId: 'view_channel',
                buttonText: { displayText: 'View channel' },
                type: 1
            }
        ];

        const buttonMessage = {
            text: uptimeMessage,
            footer: 'Contact: 𝑂𝑛𝑙𝑦_𝑜𝑛𝑒_🥇𝐸𝑚𝑝𝑖𝑟𝑒',
            buttons: buttons,
            headerType: 1,
            contextInfo: {
                externalAdReply: {
                    title: "Empire_X",
                    body: "WhatsApp Business · Status",
                    thumbnailUrl: "https://raw.githubusercontent.com/efeurhobo/Empire_X/main/lib/assets/empire.jpg",
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    mediaUrl: "https://whatsapp.com/channel/0029VajVvpQIyPtUbYt3Oz0k",
                    sourceUrl: "https://whatsapp.com/channel/0029VajVvpQIyPtUbYt3Oz0k"
                }
            }
        };

        // Send the button message
        await conn.sendMessage(from, buttonMessage, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ An error occurred: ${e.message || e}`);
    }
});