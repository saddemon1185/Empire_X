const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const fs = require('fs'); // Ensure fs is imported

const prefix = config.PREFIX || ".";
const mode = config.MODE || "private";

cmd({
    pattern: "menu",
    desc: "get cmd list",
    react: "⚙️",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, pushname, reply }) => {
    try {
        let menu = {
            main: '',
            download: '',
            group: '',
            owner: '',
            convert: '',
            search: '',
            bugs: '',
        };

        function getPluginCount() {
            const pluginsPath = './plugins'; // Ensure the path is correct
            return fs.readdirSync(pluginsPath).filter(file => file.endsWith('.js')).length;
        }

        const pluginCount = getPluginCount();
        const platform = os.platform();

        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            if (command.pattern && !command.dontAddCommandList) {
                // Check if the category exists in the menu object
                if (menu[command.category] !== undefined) {
                    // Add the command pattern to the appropriate category
                    menu[command.category] += `│ ${i + 1} .${command.pattern}\n`;
                }
            }
        }

        let madeMenu = `
╭────《 *Empire_X* 》────⊷
│ ╭──────✧❁✧──────◆
│ │ Prefix : [ ${config.PREFIX} ]
│ │ User : ${config.OWNER_NAME}  
│ │ Mode : ${config.MODE}
│ │ Plugins : ${pluginCount}
│ │ Uptime : ${runtime(process.uptime())}
│ │ MEM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB
│ │ Platform : ${platform}     
│ ╰──────✧❁✧──────◆
╰══════════════════⊷

╭────❏ *DOWNLOAD COMMANDS* ❏
${menu.download || ' '}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *MAIN COMMANDS* ❏
${menu.main || ' '}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *GROUP COMMANDS* ❏
${menu.group || ' '}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *OWNER COMMANDS* ❏
${menu.owner || ' '}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *CONVERT COMMANDS* ❏
${menu.convert || ' '}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *SEARCH COMMANDS* ❏
${menu.search || ' '}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *BUGS COMMANDS* ❏
${menu.bugs || ' '}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *POWERED BY* ❏
│ 
╰━━━━━━━━━━━━━━──⊷
`;

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: madeMenu }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message || e}`);
    }
});
