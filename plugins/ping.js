const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

// PING COMMAND
cmd({
    pattern: "ping",
    desc: "To check ping",
    category: "main",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const initialTime = new Date().getTime();
        const sentMessage = await conn.sendMessage(from, { text: '```Pinging from server...```' }, { quoted: mek });

        // Update the message with a loading bar
        const loadingSteps = [20, 40, 60, 80, 100];
        for (const step of loadingSteps) {
            const bar = '█'.repeat(step / 5) + '░'.repeat(20 - step / 5);
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading delay
            await conn.sendMessage(from, { 
                text: `*Pong*\nLoading: [${bar}] ${step}%` 
            }, { quoted: mek, edit: sentMessage.key }); // Edit the message with the loading bar
        }

        // Calculate ping and send the final message
        const pingValue = new Date().getTime() - initialTime;
        await conn.sendMessage(from, { 
            text: `*Pong: ${pingValue} ms*` 
        }, { quoted: mek, edit: sentMessage.key });

    } catch (error) {
        console.error("Error in ping command:", error);
        await reply("❌ An error occurred while checking the ping.");
    }
});

// SYSTEM STATUS COMMAND
cmd({
    pattern: "uptime",
    alias: ["status"],
    desc: "Check uptime, RAM usage, and more.",
    category: "main",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Construct system status message
        const status = `*Empire_V1 UPTIME↷*\n\n` +
                       `*_UPTIME:➠_* ${runtime(process.uptime())}\n` +
                       `*_RAM USAGE:➠_* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ` +
                       `${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\n` +
                       `*_HOSTNAME:➠_* ${os.hostname()}\n` +
                       `*_OWNER:➠_* *${config.OWNER_NAME || 'Unknown Owner'}*`;

        // Send system status message with an image (if configured)
        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG || 'https://via.placeholder.com/512' }, // Default image fallback
            caption: status
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in system status command:", error);
        await reply("❌ An error occurred while fetching the system status.");
    }
});
