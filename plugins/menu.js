const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');

        cmd({
    pattern: "menu",
    desc: "get cmd list",
    react: "⚙️",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, pushname, reply }) => {
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
    tools: "",
    user: "",
    whatsapp: ""
};

// Loop through the commands to categorize them and add them to the respective sections
for (let i = 0; i < commands.length; i++) {
    if (commands[i].pattern && !commands[i].dontAddCommandList) {
        // Categorize commands based on their category
        menu[commands[i].category] += `│▸ ${i + 1}. ${commands[i].pattern}\n`;
    }
}

// Create the menu output with additional information at the top
let madeMenu = `╭─ 《 *𝐄𝐦𝐩𝐢𝐫𝐞_𝐕𝟏 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐞𝐝* 》 ───
*OWNER:* ${config.OWNER_NAME}
*VERSION:* v1.0.0
*UPTIME:* ${runtime(process.uptime())}
*MEM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
╰────────────────

╭──〈 *ᴀɪ* 〉────
${menu.ai}
╰──────────────

╭──〈 *ᴄᴏɴᴠᴇʀᴛᴇʀ* 〉────
${menu.convert}
╰──────────────

╭──〈 *ᴅᴏᴡɴʟᴏᴀᴅ* 〉────
${menu.download}
╰──────────────

╭──〈 *ɢʀᴏᴜᴘ* 〉────
${menu.group}
╰──────────────

╭──〈 *sʏsᴛᴇᴍ* 〉────
${menu.system}
╰──────────────

╭──〈 *ᴛᴏᴏʟs* 〉────
${menu.tools}
╰──────────────

╭──〈 *ᴜsᴇʀ* 〉────
${menu.user}
╰──────────────

╭──〈 *ᴡʜᴀᴛsᴀᴘᴘ* 〉────
${menu.whatsapp}
╰──────────────

> *Powered by Only_one_🥇Empire*`;

// Send the dynamic menu to the user
await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: madeMenu }, { quoted: mek });
