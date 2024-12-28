const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const fs = require('fs');

const prefix = config.PREFIX || ".";
const mode = config.MODE || "private";

cmd({
    pattern: "menu",
    desc: "Get command list",
    react: "⚙️",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Dynamic command categories
        let menu = {
            ai: '',
            download: '',
            fun: '',
            group: '',
            owner: '',
            privacy: '',
            search: '',
            system: '',
        };

        // Format uptime function
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
        const pluginCount = fs.readdirSync('./plugins').filter(file => file.endsWith('.js')).length;
        const platform = os.platform();
        const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalCommands = commands.length;

        // Categorize commands dynamically
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            if (command.pattern && !command.dontAddCommandList) {
                if (menu[command.category] !== undefined) {
                    menu[command.category] += `┃𖠄│ ${i + 1}. ${prefix}${command.pattern}\n`;
                } else {
                    menu[command.category] = `┃𖠄│ ${i + 1}. ${prefix}${command.pattern}\n`;
                }
            }
        }

        // Define all categories dynamically to avoid hardcoding
        const categories = [
            "ai", "download", "fun", "group",
            "owner", "privacy", "search", "system",
        ];

        // Construct menu dynamically
        let madeMenu = `
╭━━━〔 Empire_X 〕━━━⬤
┃𖠄│ Prefix: [ ${prefix} ]
┃𖠄│ User: *${config.OWNER_NAME || "Unknown User"}*
┃𖠄│ Mode: *${mode}*
┃𖠄│ Platform: *${platform}*
┃𖠄│ Uptime: *${uptime}*
┃𖠄│ Memory: *${memoryUsage}MB*
┃𖠄│ Plugins: *${pluginCount}*
┃𖠄│ Commands: *${totalCommands}*
┃𖠄╰─────────────⬤
╰━━━━━━━━━━━━━━⬤
`;

        // Append categories to the menu
        for (const category of categories) {
            madeMenu += `
╭━━〔 ${category.toUpperCase()} 〕━━⬤
${menu[category] || '┃𖠄│ None'}
╰━━━━━━━━━━━━━⬤
`;
        }

        // Output final menu
        console.log(madeMenu);

        // Send the constructed menu
        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: madeMenu
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});