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
    use: '.naruto',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🏜️ *Text not found! Please type a text to Make Art*")
        await mumaker.textpro("https://textpro.me/create-naruto-logo-style-text-effect-online-1125.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-naruto-logo-style-text-effect-online-1125.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
})

cmd({
    pattern: "avengers",
    react: "🦸‍♂️",
    alias: ["textpro2"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.avengers',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🏜️ *Text not found! Please type a text to Make Art*")
        await mumaker.textpro("https://textpro.me/create-avengers-logo-style-text-effect-online-1126.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-avengers-logo-style-text-effect-online-1126.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
})

cmd({
    pattern: "3dtext",
    react: "🔵",
    alias: ["textpro3"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.3dtext',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🏜️ *Text not found! Please type a text to Make Art*")
        await mumaker.textpro("https://textpro.me/create-3d-text-effect-online-1127.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-3d-text-effect-online-1127.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
})

cmd({
    pattern: "matrix",
    react: "💻",
    alias: ["textpro4"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.matrix',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🏜️ *Text not found! Please type a text to Make Art*")
        await mumaker.textpro("https://textpro.me/create-matrix-logo-style-text-effect-online-1128.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-matrix-logo-style-text-effect-online-1128.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
})

cmd({
    pattern: "pubg",
    react: "🎮",
    alias: ["textpro5"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.pubg',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🏜️ *Text not found! Please type a text to Make Art*")
        await mumaker.textpro("https://textpro.me/create-pubg-logo-style-text-effect-online-1129.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-pubg-logo-style-text-effect-online-1129.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
})

cmd({
    pattern: "lion",
    react: "🦁",
    alias: ["textpro6"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.lion',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🏜️ *Text not found! Please type a text to Make Art*")
        await mumaker.textpro("https://textpro.me/create-lion-logo-style-text-effect-online-1130.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-lion-logo-style-text-effect-online-1130.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
})

cmd({
    pattern: "steel",
    react: "🦾",
    alias: ["textpro7"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.steel',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🏜️ *Text not found! Please type a text to Make Art*")
        await mumaker.textpro("https://textpro.me/create-steel-logo-style-text-effect-online-1131.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-steel-logo-style-text-effect-online-1131.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
})

cmd({
    pattern: "glitch",
    react: "⚡",
    alias: ["textpro8"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.glitch',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🏜️ *Text not found! Please type a text to Make Art*")
        await mumaker.textpro("https://textpro.me/create-glitch-logo-style-text-effect-online-1132.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-glitch-logo-style-text-effect-online-1132.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
})

cmd({
    pattern: "fire",
    react: "🔥",
    alias: ["textpro9"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.fire',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🏜️ *Text not found! Please type a text to Make Art*")
        await mumaker.textpro("https://textpro.me/create-fire-logo-style-text-effect-online-1133.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-fire-logo-style-text-effect-online-1133.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
})

cmd({
    pattern: "neon",
    react: "💡",
    alias: ["textpro10"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.neon',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🏜️ *Text not found! Please type a text to Make Art*")
        await mumaker.textpro("https://textpro.me/create-neon-light-text-effect-online-1134.html", q)
            .then((result) => {
                conn.sendMessage(from, { image: { url: result.image }, caption: `\n🗾 *Link - https://textpro.me/create-neon-light-text-effect-online-1134.html* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` }, { quoted: mek })
            })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
})