
const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "menu",
    desc: "Get command list",
    react: "⚙️",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, pushname, reply }) => {
    try {
        // Initialize the menu object with empty strings for categories
        let menu = {
            owner: "",
            main: "",
            group: "",
            download: "",
            convert: "",
            search: "",
            system: "",
            user: "",
            whatsapp: "",
            ai: ""  // Ensure 'ai' category exists
        };

        // Loop through the commands to categorize them and add them to the respective sections
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            if (command.pattern && !command.dontAddCommandList) {
                // Check if the category exists in the menu object
                if (menu[command.category] !== undefined) {
                    // Add the command pattern to the appropriate category
                    menu[command.category] += `│▸ ${i + 1}. ${command.pattern}\n`;
                }
            }
        }

        // Create the menu output with additional information at the top
        let madeMenu = `╭─ 《 *𝐄𝐦𝐩𝐢𝐫𝐞_𝐕𝟏 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐞𝐝* 》 ───
*OWNER:* ${config.OWNER_NAME}
*VERSION:* v1.0.0
*UPTIME:* ${runtime(process.uptime())}
*MEM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
╰────────────────

╭──〈 *MAIN* 〉────
${menu.main || "No commands in this category."}
╰──────────────

╭──〈 *ᴄᴏɴᴠᴇʀᴛᴇʀ* 〉────
${menu.convert || "No commands in this category."}
╰──────────────

╭──〈 *ᴅᴏᴡɴʟᴏᴀᴅ* 〉────
${menu.download || "No commands in this category."}
╰──────────────

╭──〈 *ɢʀᴏᴜᴘ* 〉────
${menu.group || "No commands in this category."}
╰──────────────

╭──〈 *sʏsᴛᴇᴍ* 〉────
${menu.system || "No commands in this category."}
╰──────────────

╭──〈 *OWNEE* 〉────
${menu.owner || "No commands in this category."}
╰──────────────

╭──〈 *ᴜsᴇʀ* 〉────
${menu.user || "No commands in this category."}
╰──────────────

╭──〈 *ᴡʜᴀᴛsᴀᴘᴘ* 〉────
${menu.whatsapp || "No commands in this category."}
╰──────────────

> *Powered by Only_one_🥇Empire*`;

        // Send the dynamic menu to the user
        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: madeMenu }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message || e}`);
    }
});
