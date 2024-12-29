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

        const aliveMsg = `*Empire_X IS RUNNING!!*\n\n` +
                         `*BOT UPTIME INFO:* \n` +
                         `*╭═════════════════⊷*\n` +
                         `┃❍ ${botUptime.days} Day(s)\n` +
                         `┃❍ ${botUptime.hours} Hour(s)\n` +
                         `┃❍ ${botUptime.minutes} Minute(s)\n` +
                         `┃❍ ${botUptime.seconds} Second(s)\n` +
                         `*╰═════════════════⊷*`;

        // Send the alive message with additional channel and newsletter information
        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG || 'https://via.placeholder.com/512' },
            caption: aliveMsg,
            contextInfo: {
                mentionedJid: [mek.sender],
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363337275149306@newsletter',  // Your newsletter JID
                    newsletterName: "Empire_X",                   // Your newsletter name
                    serverMessageId: 143                          // Adjust based on the actual message ID you want to forward
                },
                externalAdReply: {
                    showAdAttribution: false,
                    title: 'Empire_X',
                    body: 'Bot is online and running!',
                    thumbnailUrl: config.ALIVE_IMG || 'https://via.placeholder.com/512',
                    sourceUrl: config.channelUrl,  // Channel URL to view
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: mek });

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
// List Plugins
cmd({
    pattern: "listplugin",
    desc: "Lists all available plugins.",
    category: "system",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    try {
        const pluginPath = "./plugins";
        const files = fs.readdirSync(pluginPath).filter(file => file.endsWith(".js"));
        if (files.length === 0) return reply("No plugins available.");

        const pluginList = files.map(file => `- ${file.replace(".js", "")}`).join("\n");
        return reply(`Available Plugins:\n\n${pluginList}`);
    } catch (error) {
        console.error("Error in listplugin command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});

// Active Plugins
cmd({
    pattern: "plugins",
    desc: "Lists all currently active plugins.",
    category: "system",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    try {
        const activePlugins = Object.keys(global.plugins || {});
        if (activePlugins.length === 0) return reply("No active plugins.");

        const pluginList = activePlugins.map(plugin => `- ${plugin}`).join("\n");
        return reply(`Active Plugins:\n\n${pluginList}`);
    } catch (error) {
        console.error("Error in plugins command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});

// Remove Plugin
cmd({
    pattern: "remove",
    desc: "Removes a plugin from the bot.",
    category: "system",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        const pluginPath = `./plugins/${args[0]}.js`;

        if (!fs.existsSync(pluginPath)) return reply(`Plugin "${args[0]}" does not exist.`);
        fs.unlinkSync(pluginPath);

        delete global.plugins[args[0]];
        return reply(`Plugin "${args[0]}" has been removed.`);
    } catch (error) {
        console.error("Error in remove command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});

// Install Plugin
cmd({
    pattern: "install",
    desc: "Installs a plugin to the bot.",
    category: "system",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        const pluginUrl = args[0];
        const pluginName = args[1] || "newplugin";

        if (!pluginUrl) return reply("Provide a valid plugin URL.");
        const response = await axios.get(pluginUrl);
        const pluginPath = `./plugins/${pluginName}.js`;

        fs.writeFileSync(pluginPath, response.data);
        return reply(`Plugin "${pluginName}" has been installed.`);
    } catch (error) {
        console.error("Error in install command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});

// Common Plugins List
cmd({
    pattern: "common",
    desc: "Lists commonly used plugins.",
    category: "system",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    try {
        const commonPlugins = ["greeting", "moderation", "utility"];
        const pluginList = commonPlugins.map(plugin => `- ${plugin}`).join("\n");

        return reply(`Commonly Used Plugins:\n\n${pluginList}`);
    } catch (error) {
        console.error("Error in common command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});

// Difference Between Plugins
cmd({
    pattern: "diff",
    desc: "Displays the difference between two plugins.",
    category: "system",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        const plugin1Path = `./plugins/${args[0]}.js`;
        const plugin2Path = `./plugins/${args[1]}.js`;

        if (!fs.existsSync(plugin1Path) || !fs.existsSync(plugin2Path)) {
            return reply("One or both plugins do not exist.");
        }

        const plugin1Content = fs.readFileSync(plugin1Path, "utf-8");
        const plugin2Content = fs.readFileSync(plugin2Path, "utf-8");

        const differences = diff.diffLines(plugin1Content, plugin2Content);

        const diffOutput = differences.map(part =>
            (part.added ? "+ " : part.removed ? "- " : "  ") + part.value
        ).join("");

        return reply(`Differences between ${args[0]} and ${args[1]}:\n\n${diffOutput}`);
    } catch (error) {
        console.error("Error in diff command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});