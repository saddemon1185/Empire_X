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
        const { key } = sentMessage;

        // Loading bar steps
        const loadingSteps = [20, 40, 60, 80, 100];
        for (const step of loadingSteps) {
            const bar = '█'.repeat(step / 5) + '░'.repeat(20 - step / 5);
            await conn.sendMessage(from, { 
                text: `*Pong*\nLoading: [${bar}] ${step}%` 
            }, { edit: key }); // Use "edit" to update the message instead of sending new ones
            await new Promise(resolve => setTimeout(resolve, 1000)); // Pause between steps
        }

        // Calculate ping value and send the final message
        const pingValue = new Date().getTime() - initialTime;
        await conn.sendMessage(from, { 
            text: `*Pong: ${pingValue} ms*` 
        }, { edit: key });

    } catch (error) {
        console.error("Error in ping command:", error);
        await reply("An error occurred while checking the ping.");
    }
});

// SYSTEM STATUS COMMAND
cmd({
    pattern: "system",
    alias: ["status", "uptime"],
    desc: "Check uptime, RAM usage, and more.",
    category: "main",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const config = await readEnv(); // Fetch configuration from your database or environment

        // Construct system status message
        const status = `*Empire_V1 UPTIME↷*\n\n` +
                       `*_UPTIME:➠_* ${runtime(process.uptime())}\n` +
                       `*_RAM USAGE:➠_* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ` +
                       `${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\n` +
                       `*_HOSTNAME:➠_* ${os.hostname()}\n` +
                       `*_OWNER:➠_* *${config.OWNER_NAME || 'Unknown Owner'}*`;

        // Send system status message with an image (if configured)
        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG }, // Ensure this URL is valid
            caption: status
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while fetching the system status.");
    }
});
