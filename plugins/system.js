const config = require('../config');
const { cmd } = require('../command');
const { runtime } = require('../lib/functions'); // Ensure runtime is imported
const fs = require('fs');
const axios = require('axios');
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

        const aliveMsg = `> *Empire_X IS Active*  
╭───────────────◆  
│⿻ *Uptime:* 
│⿻ (${botUptime.days}) Days 
│⿻ (${botUptime.hours}) Hours 
│⿻ (${botUptime.minutes}) Minutes 
│⿻ (${botUptime.seconds}) Seconds
╰────────────────◆`;

        // Information Message
        const infoMessage = {
    image: { url: 'https://raw.githubusercontent.com/efeurhobo/Empire_X/main/lib/assets/empire.jpg' },
    caption: aliveMsg,
    contextInfo: {
        mentionedJid: [mek.sender],
        forwardingScore: 5,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363337275149306@newsletter',
            newsletterName: "Empire_X",
            serverMessageId: 143
        }
    }
};

        // Send the alive message with the formatted information
        await conn.sendMessage(from, infoMessage, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
cmd({
    pattern: "updatebot",
    react: "🔄",
    desc: "Automatically update the bot from the GitHub repository",
    category: "system",
    use: '.update',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const targetFolder = 'bot'; // Directory of your bot project
        const gitCommand = `git -C ${targetFolder} pull origin main`; // Pull updates from the 'main' branch

        exec(gitCommand, (err, stdout, stderr) => {
            if (err) {
                reply(`*Error during update:* ${err.message}`);
                return;
            }
            if (stderr) {
                reply(`*Git stderr:* ${stderr}`);
                return;
            }

            conn.sendMessage(from, { text: '*✅ Bot updated successfully with the latest files from GitHub!*' }, { quoted: mek });
        });
    } catch (error) {
        console.error("Error during bot update:", error);
        reply(`*Error during bot update:* ${error.message}`);
    }
});

cmd({
    pattern: "uptime",
    desc: "Check bot's uptime.",
    category: "system", // Changed category to "system"
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
            return `│⿻  (${days}) Days\n│⿻  (${hours}) Hours\n│⿻  (${minutes}) Minutes\n│⿻  (${seconds}) Seconds`;
        }

        const uptime = formatUptime(process.uptime());

        const uptimeMessage = `> *Empire_X BOT UPTIME*  
╭───────────────◆  
│⿻ *Uptime:*  
${uptime}  
╰────────────────◆`;

        const infoMessage = {
            text: uptimeMessage,
            contextInfo: {
                mentionedJid: [mek.sender],
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363337275149306@newsletter', // Your newsletter JID
                    newsletterName: "Empire_X",                  // Your newsletter name
                    serverMessageId: 143                         // Adjust based on the actual message ID you want to forward
                }
            }
        };

        await conn.sendMessage(from, infoMessage, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message || e}`);
    }
});

cmd({
    pattern: "requestbug",
    alias: ["report"],
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
    react: "♻️",
    alias: ["speed"],
    desc: "Check bot\'s ping",
    category: "system",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '*_Pinging..._*' })
        const endTime = Date.now()
        const ping = endTime - startTime
        await conn.sendMessage(from, { text: `*Pong.. : ${ping}ms*`}, { quoted: message })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
// shutdown commands 
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
// updatecmd commands 
cmd({
  pattern: "updatecmd",
  desc: "Update commands.",
  category: "system",
  filename: __filename
},
async (conn, mek, m, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!isOwner) return reply("Only bot owners can use this command.");

    const pluginsDir = path.join(__dirname, '../plugins');
    const files = fs.readdirSync(pluginsDir);

    for (const file of files) {
      if (file.endsWith('.js')) {
        const filePath = path.join(pluginsDir, file);
        require(filePath);
        console.log(`Loaded ${file}`);
      }
    }

    reply("commands updated successfully.");
  } catch (e) {
    console.log(e);
    reply(`Error updating commands: ${e.message}`);
  }
});
// update commands 

cmd({
    pattern: "update",
    react: "🔄",
    desc: "Update folder from GitHub",
    category: "system",
    use: '.update',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const repoUrl = 'https://github.com/efeurhobo/Empire_X.git'; // لینک مخزن گیت‌هاب
        const targetFolder = 'plugins'; // پوشه‌ای که باید به‌روز شود

        // بررسی وجود پوشه هدف
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder); // ساخت پوشه در صورت عدم وجود
        }

        // تعیین دستور مناسب گیت
        const gitCommand = fs.existsSync(`${targetFolder}/.git`)
            ? `git -C ${targetFolder} pull`
            : `git clone ${repoUrl} ${targetFolder}`;

        // اجرای دستور گیت
        await new Promise((resolve, reject) => {
            exec(gitCommand, (err, stdout, stderr) => {
                if (err) {
                    reject(`Git command failed: ${stderr}`);
                } else {
                    resolve(stdout);
                }
            });
        });

        // ارسال پیام موفقیت
        await conn.sendMessage(from, { text: '*✅ Update completed successfully!*' }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply(`*Error during update:* ${error.message}`);
    }
});
