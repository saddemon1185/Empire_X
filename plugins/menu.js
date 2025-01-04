const config = require('../config');
const { cmd, commands } = require('../command');
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
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        // Dynamic command categories
        let menu = {
            ai: '',
            download: '',
            fun: '',
            owner: '',
            group: '',
            privacy: '',
            search: '',
            system: '',
            textpro: '',
            sticker: '',
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
        const totalCommands = commands.length;

        // Categorize commands dynamically
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            if (command.pattern && !command.dontAddCommandList) {
                if (menu[command.category] !== undefined) {
                    menu[command.category] += `┃𖠄┃• ${prefix}${command.pattern}\n`;
                }
            }
        }

        // Construct menu with the provided design
        let madeMenu = `
╭━━━▻〔 *Empire_X* 〕━━━━━⬤
┃𖠄╭──────────────────
┃𖠄│ *Owner:* _${pushname}_
┃𖠄│ *Prefix:* _${prefix}_
┃𖠄│ *Mode:* _${mode}_
┃𖠄│ *Commands:* _${totalCommands}_
┃𖠄│ *Uptime:* _${uptime}_
┃𖠄│ *Version:* _v 1.0.0_
┃𖠄╰──────────────────
╰━━━━━━━━━━━━━━━━━━━━━━⬤

╭━━━▻〔 📜 AI MENU 〕━━━━
┃𖠄╭────────────────────·๏
${menu.ai || '┃𖠄┃• No commands'}
┃𖠄└────────────────────·๏
╰━━━━━━━━━━━━━━━━━━━━━

╭━━━▻〔 📜 DOWNLOAD MENU 〕━━━━
┃𖠄╭────────────────────·๏
${menu.download || '┃𖠄┃• No commands'}
┃𖠄└────────────────────·๏
╰━━━━━━━━━━━━━━━━━━━━━

╭━━━▻〔 📜 FUN MENU 〕━━━━
┃𖠄╭────────────────────·๏
${menu.fun || '┃𖠄┃• No commands'}
┃𖠄└────────────────────·๏
╰━━━━━━━━━━━━━━━━━━━━━

╭━━━▻〔 📜 OWNER MENU 〕━━━━
┃𖠄╭────────────────────·๏
${menu.owner || '┃𖠄┃• No commands'}
┃𖠄└────────────────────·๏
╰━━━━━━━━━━━━━━━━━━━━━

╭━━━▻〔 📜 GROUP MENU 〕━━━━
┃𖠄╭────────────────────·๏
${menu.group || '┃𖠄┃• No commands'}
┃𖠄└────────────────────·๏
╰━━━━━━━━━━━━━━━━━━━━━

╭━━━▻〔 📜 PRIVACY MENU 〕━━━━
┃𖠄╭────────────────────·๏
${menu.privacy || '┃𖠄┃• No commands'}
┃𖠄└────────────────────·๏
╰━━━━━━━━━━━━━━━━━━━━━

╭━━━▻〔 📜 SEARCH MENU 〕━━━━
┃𖠄╭────────────────────·๏
${menu.search || '┃𖠄┃• No commands'}
┃𖠄└────────────────────·๏
╰━━━━━━━━━━━━━━━━━━━━━

╭━━━▻〔 📜 SYSTEM MENU 〕━━━━
┃𖠄╭────────────────────·๏
${menu.system || '┃𖠄┃• No commands'}
┃𖠄└────────────────────·๏
╰━━━━━━━━━━━━━━━━━━━━━


╭━━━▻〔 📜 LOGO MENU 〕━━━━
┃𖠄╭────────────────────·๏
${menu.textpro || '┃𖠄┃• No commands'}
┃𖠄└────────────────────·๏
╰━━━━━━━━━━━━━━━━━━━━━

╭━━━▻〔 📜 STICKER MENU 〕━━━━
┃𖠄╭────────────────────·๏
${menu.sticker || '┃𖠄┃• No commands'}
┃𖠄└────────────────────·๏
╰━━━━━━━━━━━━━━━━━━━━━
`;

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