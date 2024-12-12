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
async (conn, mek, m, { from, quoted, pushname, reply }) => {
    try {
        // Dynamic command categories
        let menu = {
            main: '',
            download: '',
            group: '',
            owner: '',
            convert: '',
            search: '',
            bugs: '',
        };

        // Calculate uptime directly
        function formatUptime(seconds) {
            const days = Math.floor(seconds / (24 * 60 * 60));
            seconds %= 24 * 60 * 60;
            const hours = Math.floor(seconds / (60 * 60));
            seconds %= 60 * 60;
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        const uptime = formatUptime(process.uptime()); // Direct uptime calculation

        // Function to get plugin count
        function getPluginCount() {
            const pluginsPath = './plugins'; // Ensure the path is correct
            return fs.readdirSync(pluginsPath).filter(file => file.endsWith('.js')).length;
        }

        const pluginCount = getPluginCount();
        const platform = os.platform();

        // Memory calculation in GB
        const usedMemory = (process.memoryUsage().heapUsed / 1024 / 1024 / 1024).toFixed(2); // Used memory in GB
        const totalMemory = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2); // Total memory in GB

        // Categorize commands dynamically
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            if (command.pattern && !command.dontAddCommandList) {
                if (menu[command.category] !== undefined) {
                    menu[command.category] += `│ ${i + 1}. ${prefix}${command.pattern}\n`;
                }
            }
        }

        // Construct menu
        let madeMenu = `
╭────《 *Empire_X* 》────⊷
│ ╭──────✧❁✧──────◆
│ │ Prefix : [ ${config.PREFIX} ]
│ │ User : ${config.OWNER_NAME}  
│ │ Mode : ${config.MODE}
│ │ Plugins : ${pluginCount}
│ │ Uptime : ${uptime}
│ │ MEM: ${usedMemory} GB / ${totalMemory} GB
│ │ Platform : ${platform}     
│ ╰──────✧❁✧──────◆
╰══════════════════⊷

╭────❏ *DOWNLOAD COMMANDS* ❏
${menu.download || 'None'}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *MAIN COMMANDS* ❏
${menu.main || 'None'}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *GROUP COMMANDS* ❏
${menu.group || 'None'}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *OWNER COMMANDS* ❏
${menu.owner || 'None'}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *CONVERT COMMANDS* ❏
${menu.convert || 'None'}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *SEARCH COMMANDS* ❏
${menu.search || 'None'}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *BUGS COMMANDS* ❏
${menu.bugs || 'None'}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *POWERED BY* ❏
│ 
╰━━━━━━━━━━━━━━──⊷
`;

        // Send the constructed menu
        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: madeMenu }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message || e}`);
    }
});