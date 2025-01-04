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
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🏜️ *Text not found! Please type a text to Make Art*");
        
        await mumaker.textpro("https://textpro.me/create-naruto-logo-style-text-effect-online-1125.html", q)
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