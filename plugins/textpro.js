const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const mumaker = require("mumaker")

 cmd({
    pattern: "naruto",
    react: "🏜️",
    alias: ["textpro1"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.naruto <text>',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (args.length == 0) return reply("🏜️ *Text not found! Please type a text to make art*");

        // Get the text input from args, which is the correct method for handling user input.
        const textInput = args.join(" ");
        
        // Log the text input to verify it's being captured correctly
        console.log("Received text:", textInput);
        
        // Proceed with the textpro API call
        await mumaker.textpro("https://textpro.me/create-naruto-logo-style-text-effect-online-1125.html", textInput)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-naruto-logo-style-text-effect-online-1125.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek });
            }).catch((err) => {
                reply('⛔ *Error!!* ' + err.message);
                console.log(err);
            });
    } catch (e) {
        reply('⛔ *Error!!* ' + e.message);
        console.log(e);
    }
});