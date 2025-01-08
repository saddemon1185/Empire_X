const config = require('../config');
const { cmd, commands } = require('../command');
const { monospace } = require('../lib/monospace');

const prefix = config.PREFIX || ".";
const mode = config.MODE || "private";

cmd({
    pattern: "menu",
    desc: "Get command list",
    react: "🪀",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, quoted, isCmd, command, args, q, isGroup, sender, pushname, reply }) => {
    try {
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

        // Get current date and time in Nigeria timezone (WAT)
        const now = new Date();
        const date = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Africa/Lagos',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(now);

        const time = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Africa/Lagos',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(now);

        const uptime = formatUptime(process.uptime());
        const totalCommands = commands.length;

        // Categorize commands dynamically
        const categorized = commands.reduce((menu, cmd) => {
            if (cmd.pattern && !cmd.dontAddCommandList) {
                if (!menu[cmd.category]) menu[cmd.category] = [];
                menu[cmd.category].push(cmd.pattern);
            }
            return menu;
        }, {});

        // Header section
        const header = `╭━━━▻〔 ${monospace('EMPIRE_X')} 〕━━━━━⬤
┃𖠄 Owner: ${monospace(pushname)}
┃𖠄 Prefix: ${monospace(prefix)}
┃𖠄 Mode: ${monospace(mode)}
┃𖠄 Commands: ${monospace(totalCommands.toString())}
┃𖠄 Uptime: ${monospace(uptime)}
┃𖠄 Date: ${monospace(date)}
┃𖠄 Time: ${monospace(time)}
╰━━━━━━━━━━━━━━━━━━━━━━⬤`;

        // Category formatter
        const formatCategory = (category, cmds) => {
            const title = `╭━━〔 ${monospace(category.toUpperCase())} 〕━━⬤ \n`;
            const body = cmds.map(cmd => `┃ • ${monospace(prefix + cmd)}`).join('\n');
            const footer = `╰━━━━━━━━━━━━━⬤\n`;
            return `${title}${body}\n${footer}`;
        };

        // Generate menu dynamically
        let menu = header;
        for (const [category, cmds] of Object.entries(categorized)) {
            menu += formatCategory(category, cmds) + '\n';
        }

        // Send the menu with an image
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/r4decc.jpg' }, // Replace with your desired image URL
            caption: menu.trim(),
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});