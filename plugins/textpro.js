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
        if (!q) return reply("🏜️ *Text not found! Please type a text to make art*");
        await mumaker.textpro("https://textpro.me/create-naruto-logo-style-text-effect-online-1125.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-naruto-logo-style-text-effect-online-1125.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
});

cmd({
    pattern: "avengers",
    react: "🦸‍♂️",
    alias: ["textpro2"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.avengers <text>',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🦸‍♂️ *Text not found! Please type a text to make art*");
        await mumaker.textpro("https://textpro.me/create-avengers-logo-online-1126.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-avengers-logo-online-1126.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
});

cmd({
    pattern: "joker",
    react: "💀",
    alias: ["textpro3"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.joker <text>',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("💀 *Text not found! Please type a text to make art*");
        await mumaker.textpro("https://textpro.me/create-joker-logo-text-effect-1127.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-joker-logo-text-effect-1127.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
});

cmd({
    pattern: "neon",
    react: "🌟",
    alias: ["textpro4"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.neon <text>',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🌟 *Text not found! Please type a text to make art*");
        await mumaker.textpro("https://textpro.me/neon-text-effect-online-1128.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/neon-text-effect-online-1128.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
});

cmd({
    pattern: "metal",
    react: "⚙️",
    alias: ["textpro5"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.metal <text>',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("⚙️ *Text not found! Please type a text to make art*");
        await mumaker.textpro("https://textpro.me/create-metal-text-effect-online-1129.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-metal-text-effect-online-1129.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
});

cmd({
    pattern: "glitch",
    react: "🎨",
    alias: ["textpro6"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.glitch <text>',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🎨 *Text not found! Please type a text to make art*");
        await mumaker.textpro("https://textpro.me/create-glitch-text-effect-online-1130.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-glitch-text-effect-online-1130.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
});

cmd({
    pattern: "horror",
    react: "👻",
    alias: ["textpro7"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.horror <text>',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("👻 *Text not found! Please type a text to make art*");
        await mumaker.textpro("https://textpro.me/create-horror-text-effect-online-1131.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-horror-text-effect-online-1131.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
});

cmd({
    pattern: "glow",
    react: "💡",
    alias: ["textpro8"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.glow <text>',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("💡 *Text not found! Please type a text to make art*");
        await mumaker.textpro("https://textpro.me/create-glow-text-effect-online-1132.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-glow-text-effect-online-1132.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
});

cmd({
    pattern: "glowing",
    react: "✨",
    alias: ["textpro9"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.glowing <text>',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("✨ *Text not found! Please type a text to make art*");
        await mumaker.textpro("https://textpro.me/create-glowing-text-effect-online-1133.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-glowing-text-effect-online-1133.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
});

cmd({
    pattern: "smoke",
    react: "💨",
    alias: ["textpro10"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.smoke <text>',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("💨 *Text not found! Please type a text to make art*");
        await mumaker.textpro("https://textpro.me/create-smoke-text-effect-online-1134.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-smoke-text-effect-online-1134.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
});