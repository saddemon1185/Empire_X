I want this codes to have the output of this image 
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
        const uptime = formatUptime(process.uptime()); // Direct uptime calculation

        // Construct the uptime message
        const uptimeMessage = `*📌 Empire_X*\n\n` +
            `*🕒 Bot Has Been Up For:*\n` +
            `${uptime}`;

        // Send the message
        await conn.sendMessage(from, { text: uptimeMessage }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message || e}`);
    }
});