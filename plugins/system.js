const config = require('../config');
const { cmd } = require('../command');
const { runtime } = require('../lib/functions'); // Ensure runtime is imported
const fs = require('fs');
const axios = require('axios');
const { exec } = require('child_process'); // Import exec for executing system commands


cmd({
    pattern: "ping",
    react: "♻️",
    alias: ["speed"],
    desc: "Check bot's ping",
    category: "system",
    use: '.ping',
    filename: __filename
},
async (conn, mek, m, { from, quoted, pushname, reply }) => {
    try {
        const startTime = Date.now();
        const message = await conn.sendMessage(from, { text: '*_Pinging..._*' });
        const endTime = Date.now();
        const ping = endTime - startTime;

        await conn.sendMessage(
            from,
            {
                text: `
╭─────❏ 𝙿𝙸𝙽𝙶 ❏
│ 𝙷𝙴𝙻𝙻𝙾 ${pushname}
│──────────────────
│𝙴𝙼𝙿𝙸𝚁𝙴_𝚇 𝙿𝙸𝙽𝙶 : ${ping} 𝙼𝚂
╰━━━━━━━━━━━━━━━──⊷`,
            },
            { quoted: message }
        );
    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "uptime",
    desc: "Check bot's uptime.",
    category: "system",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        function formatUptime(seconds) {
            const days = Math.floor(seconds / (24 * 60 * 60));
            seconds %= 24 * 60 * 60;
            const hours = Math.floor(seconds / (60 * 60));
            seconds %= 60 * 60;
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
        }

        const uptime = formatUptime(process.uptime());

        const uptimeMessage = `
╭─────❏ 𝚄𝙿𝚃𝙸𝙼𝙴 ❏
│ 𝙷𝙴𝙻𝙻𝙾 ${pushname}
│───────────────────
│𝙴𝙼𝙿𝙸𝚁𝙴_𝚇 𝙷𝙰𝚂 𝙱𝙴𝙴𝙽 𝙰𝙲𝚃𝙸𝚅𝙴 :
│ ${uptime}
╰━━━━━━━━━━━━━━━━━━━──⊷
        `;

        await conn.sendMessage(from, { text: uptimeMessage }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message || e}`);
    }
});

cmd({
    pattern: "alive",
    desc: "Check if the bot is online.",
    category: "system",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        function formatUptime(seconds) {
            const days = Math.floor(seconds / (24 * 60 * 60));
            seconds %= 24 * 60 * 60;
            const hours = Math.floor(seconds / (60 * 60));
            seconds %= 60 * 60;
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return { days, hours, minutes, seconds };
        }

        const uptime = formatUptime(process.uptime());

        const aliveMsg = `
╭───────❏ *Empire_X IS ACTIVE* ❏
│ 𝙷𝙴𝙻𝙻𝙾 ${pushname}
│──────────────────
│ *UPTIME:* 
│ ${uptime.days} Days, ${uptime.hours} Hours, ${uptime.minutes} Minutes, ${uptime.seconds} Seconds
╰━━━━━━━━━━━━━━━━━━━━━━━━──⊷
        `;

        await conn.sendMessage(
            from,
            { 
                image: { url: 'https://files.catbox.moe/r4decc.jpg' },
                caption: aliveMsg
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message || e}`);
    }
});

cmd({
    pattern: "requestbug",
    alias: ["report"],
    category: "system",
    react: "🤕",
    desc: "Allows users to report a bug with a description.",
    filename: __filename,
}, async (conn, mek, m, { from, body, sender, pushname }) => {
    try {
        const bugDescription = body.split(" ").slice(1).join(" ");

        if (!bugDescription) {
            await conn.sendMessage(
                from,
                {
                    text: `
╭─────❏ *REQUEST BUG* ❏
│ 𝙷𝙴𝙻𝙻𝙾 ${pushname || "User"}
│──────────────────
│ *USAGE:* 
│ Please specify the bug you want to report.
│ Example: .requestbug This command is not working.
╰━━━━━━━━━━━━━━━──⊷
                    `,
                },
                { quoted: mek }
            );
            return;
        }

        const devsData = fs.readFileSync('./lib/dev.json', 'utf8');
        const devsNumber = JSON.parse(devsData)[0];

        const requestMessage = `
╭─────❏ *BUG REPORT* ❏
│ 𝙵𝚁𝙾𝙼: @${sender.split('@')[0]}
│ 𝙽𝙰𝙼𝙴: ${pushname || "Unknown"}
│──────────────────
│ *REPORT:* 
│ ${bugDescription}
╰━━━━━━━━━━━━━━━──⊷
        `;

        // Send bug report to the developer
        await conn.sendMessage(`${devsNumber}@s.whatsapp.net`, {
            text: requestMessage,
        });

        // Notify the user
        await conn.sendMessage(
            from,
            {
                text: `
╭─────❏ *REQUEST BUG* ❏
│ Thank you, ${pushname || "User"}!
│──────────────────
│ Your bug report has been sent to the developers for review.
╰━━━━━━━━━━━━━━━──⊷
                `,
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        await conn.sendMessage(
            from,
            {
                text: `
╭─────❏ *ERROR* ❏
│ Sorry, an error occurred while submitting your bug report.
│ Please try again later.
╰━━━━━━━━━━━━━━━──⊷
                `,
            },
            { quoted: mek }
        );
    }
});
