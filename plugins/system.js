const config = require('../config');
const { cmd } = require('../command');
const { runtime } = require('../lib/functions'); // Ensure runtime is imported
const fs = require('fs');
const { exec } = require('child_process'); // Import exec for executing system commands

cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "system",  // Changed category to "system"
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        const botUptime = runtime(process.uptime());

        const aliveMsg = `*Empire_X IS RUNNING!!*\n\n` +
                         `*BOT UPTIME INFO:* \n` +
                         `*╭═════════════════⊷*\n` +
                         `┃❍ ${botUptime.days} Day(s)\n` +
                         `┃❍ ${botUptime.hours} Hour(s)\n` +
                         `┃❍ ${botUptime.minutes} Minute(s)\n` +
                         `┃❍ ${botUptime.seconds} Second(s)\n` +
                         `*╰═════════════════⊷*`;

        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG || 'https://via.placeholder.com/512' },
            caption: aliveMsg
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "updatebot",
    react: "🔄",
    desc: "Update the bot from the GitHub repository",
    category: "system", // Changed category to "system"
    use: '.update',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const targetFolder = 'bot'; // Folder for your bot to be updated

        // Command to pull the latest updates from the GitHub repository
        const gitCommand = `git -C ${targetFolder} pull origin main`; // Pull latest changes from the main branch

        exec(gitCommand, (gitErr, gitStdout, gitStderr) => {
            if (gitErr) {
                return reply(`*Error during update:* ${gitErr.message}`);
            }
            if (gitStderr) {
                return reply(`*Git error:* ${gitStderr}`);
            }

            conn.sendMessage(from, { text: '*✅ Bot updated successfully from the repository!*' }, { quoted: mek });
        });
    } catch (error) {
        console.error("Error during bot update:", error);
        reply(`*Error during bot update:* ${error.message}`);
    }
});

cmd({
    pattern: "uptime",
    desc: "Check bot's uptime.",
    category: "system",  // Changed category to "system"
    filename: __filename
},
async (conn, mek, m, { from, quoted, pushname, reply }) => {
    try {
        function formatUptime(seconds) {
            const days = Math.floor(seconds / (24 * 60 * 60));
            seconds %= 24 * 60 * 60;
            const hours = Math.floor(seconds / (60 * 60));
            seconds %= 60 * 60;
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        const uptime = formatUptime(process.uptime());

        const uptimeMessage = `*📌 Empire_X*\n\n` +
            `*🕒 Bot Has Been Up For:*\n` +
            `${uptime}`;

        await conn.sendMessage(from, { text: uptimeMessage }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message || e}`);
    }
});

cmd({
    pattern: "requestbug",
    category: "system",  // Changed category to "system"
    react: "🤕",
    desc: "Allows users to report a bug with a description.",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, body, sender, pushname, groupMetadata }) => {
    try {
        const bugDescription = body.split(" ").slice(1).join(" ");

        if (!bugDescription) {
            await conn.sendMessage(from, {
                text: `Use ${prefix}requestbug :\nExample: ${prefix}requestbug this command is not working.`,
            }, { quoted: mek });
            return;
        }

        const devsData = fs.readFileSync('./lib/dev.json', 'utf8');
        const devsNumber = JSON.parse(devsData)[0];

        const requestMessage = `
➲ *Need user requested:* @${sender.split('@')[0]}
➲ *Sent by:* ${pushname}
➲ *Report:* ${bugDescription}
`;

        await conn.sendMessage(devsNumber + "@s.whatsapp.net", {
            text: requestMessage
        });

        await conn.sendMessage(from, {
            text: `Thank you! Your bug report has been sent to the devs for review.`,
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, {
            text: `An error occurred while submitting the bug report. Please try again.`,
        }, { quoted: mek });
    }
});

cmd({
    pattern: "ping",
    desc: "To check ping",
    category: "system",
    filename: __filename,
}, async (conn, mek, m, { from }) => {
    try {
        const initialTime = new Date().getTime();

        // Send the initial message
        const sentMessage = await conn.sendMessage(from, { text: '```Pinging from server...```' }, { quoted: mek });

        const loadingSteps = [20, 40, 60, 80, 100];
        for (const step of loadingSteps) {
            const bar = '█'.repeat(step / 5) + '░'.repeat(20 - step / 5);
            const updatedMessage = `*Pong*\nLoading: [${bar}] ${step}%`;

            // Wait for 500ms before updating
            await new Promise(resolve => setTimeout(resolve, 500));

            // Edit the same message with updated progress
            await conn.sendMessage(from, { text: updatedMessage }, { edit: sentMessage.key });
        }

        // Calculate the ping value
        const pingValue = new Date().getTime() - initialTime;

        // Final update with ping result
        const finalMessage = `*Pong: ${pingValue} ms*`;
        await conn.sendMessage(from, { text: finalMessage }, { edit: sentMessage.key });

    } catch (error) {
        console.error("Error in ping command:", error);
        await conn.sendMessage(from, { text: "❌ An error occurred while checking the ping." }, { quoted: mek });
    }
});

cmd({
    pattern: "shutdown",
    desc: "Shutdown the bot.",
    category: "system",  // Changed category to "system"
    react: "🛑",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    reply("🛑 Shutting down...").then(() => process.exit());
});
