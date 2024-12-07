const config = require('../config');
const { cmd, commands } = require('../command');
const os = require('os');
const fs = require('fs');

cmd({
    pattern: "menu",
    desc: "get cmd list",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Initialize menu categories
        let menu = {
            main: '',
            download: '',
            group: '',
            owner: '',
            convert: '',
            search: ''
        };

        let madeMenu = `
Owner: ${pushname}

>DOWNLOAD COMMANDS:
${menu.download}

>MAIN COMMANDS:
${menu.main}

>GROUP COMMANDS:
${menu.group}

>OWNER COMMANDS:
${menu.owner}

>CONVERT COMMANDS:
${menu.convert}

>SEARCH COMMANDS:
${menu.search}

Powered By Only_one_🥇empire
`;

        // Send the dynamic menu to the user
        await conn.sendMessage(from, { text: madeMenu }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
})
