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
