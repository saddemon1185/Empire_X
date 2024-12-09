const { cmd, commands } = require('../command');
const { xeontext1 } = require('./69/xeontext1');  // Destructure to get the xeontext1 variable

cmd({
    pattern: "demon1",
    desc: "Bugs demon",
    category: "bugs",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Send the first message from xeontext1.js
        await conn.sendMessage(from, {
            text: xeontext1  // Use the imported xeontext1
        }, { quoted: mek });

        // Set a delay of 2 minutes (120000 milliseconds) to send the second message
        setTimeout(async () => {
            await conn.sendMessage(from, {
                text: "Pause 2 minutes so that bot isn't banned"  // Send the second message
            }, { quoted: mek });
        }, 120000);  // 2 minutes delay (120000 ms)
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
