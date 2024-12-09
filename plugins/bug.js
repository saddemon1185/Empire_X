const { cmd, commands } = require('../command');
const path = require('path');

// Log the absolute path for debugging (optional, can be removed after confirmation)
console.log(path.resolve('./69/xeontext1.js'));  // This will print the absolute path to the console

// Now, import the module from the correct path
const { xeontext1 } = require('./69/xeontext1');

// Continue with the rest of your code...
cmd({
    pattern: "bugs",
    desc: "Bugs demon",
    category: "bugs",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Send the first message from the new location of xeontext1.js
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
