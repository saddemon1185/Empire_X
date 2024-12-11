const config = require('../config');
const { cmd } = require('../command');
const { runtime } = require('../lib/functions'); // Ensure runtime is imported

cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Get the uptime in a structured format
        const botUptime = runtime(process.uptime());

        // Construct the message with formatted uptime
        const aliveMsg = `*Empire_X IS RUNNING!!*\n\n` +
                         `*BOT UPTIME INFO:* \n` +
                         `*╭═════════════════⊷*\n` +
                         `┃❍ ${botUptime.days} Day(s)\n` +
                         `┃❍ ${botUptime.hours} Hour(s)\n` +
                         `┃❍ ${botUptime.minutes} Minute(s)\n` +
                         `┃❍ ${botUptime.seconds} Second(s)\n` +
                         `*╰═════════════════⊷*`;

        // Send the message without buttons
        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG || 'https://via.placeholder.com/512' },
            caption: aliveMsg
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});