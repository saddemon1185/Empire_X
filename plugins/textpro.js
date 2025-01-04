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
        if (!q) return reply("🏜️ *Text not found ! Please type a text to Make Art*")
        const limk = "https://textpro.me/create-naruto-logo-style-text-effect-online-1125.html"
        const duka = await mumaker.textpro( limk , q )
        await conn.sendMessage(from,{image:{url: duka.image },caption: `\n🗾 *Link - ${limk}* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` },{quoted:mek })
    } catch (e) {
        reply('⛔ *Error !!*'+ e )
        console.log(e)
    }
})

cmd({
    pattern: "textpro",
    react: "🏜️",
    alias: ["textimage"],
    desc: "Text to Image Collection",
    category: "textpro",
    use: '.textpro [Text]',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🏜️ *Text not found ! Please type a text to Make Art*")
        const limk = "https://textpro.me/create-naruto-logo-style-text-effect-online-1125.html"
        const duka = await mumaker.textpro( limk , q )
        await conn.sendMessage(from,{image:{url: duka.image },caption: `\n🗾 *Link - ${limk}* \n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*` },{quoted:mek })
    } catch (e) {
        reply('⛔ *Error !!*'+ e )
        console.log(e)
    }
})

cmd({
    pattern: "glitch",
    react: "🌐",
    alias: ["glitchtext"],
    desc: "Text to Image with Glitch Effect",
    category: "textpro",
    use: '.glitch [Text]',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🌐 *Text not found ! Please type a text to make glitch art*")
        const limk = "https://textpro.me/create-glitch-text-effect-online-1056.html"
        const duka = await mumaker.textpro(limk, q)
        await conn.sendMessage(from, { image: { url: duka.image }, caption: `\n🖥️ *Link - ${limk}*` }, { quoted: mek })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
})

cmd({
    pattern: "neon",
    react: "💡",
    alias: ["neontext"],
    desc: "Text to Image with Neon Effect",
    category: "textpro",
    use: '.neon [Text]',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("💡 *Text not found ! Please type a text to make neon art*")
        const limk = "https://textpro.me/create-neon-light-text-effect-online-1020.html"
        const duka = await mumaker.textpro(limk, q)
        await conn.sendMessage(from, { image: { url: duka.image }, caption: `\n💡 *Link - ${limk}*` }, { quoted: mek })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
})

cmd({
    pattern: "burn",
    react: "🔥",
    alias: ["burntext"],
    desc: "Text to Image with Fire Burn Effect",
    category: "textpro",
    use: '.burn [Text]',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🔥 *Text not found ! Please type a text to make burn art*")
        const limk = "https://textpro.me/create-fire-burn-text-effect-online-1025.html"
        const duka = await mumaker.textpro(limk, q)
        await conn.sendMessage(from, { image: { url: duka.image }, caption: `\n🔥 *Link - ${limk}*` }, { quoted: mek })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
})

cmd({
    pattern: "gold",
    react: "💰",
    alias: ["goldtext"],
    desc: "Text to Image with Golden Effect",
    category: "textpro",
    use: '.gold [Text]',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("💰 *Text not found ! Please type a text to make gold art*")
        const limk = "https://textpro.me/create-golden-text-effect-online-1059.html"
        const duka = await mumaker.textpro(limk, q)
        await conn.sendMessage(from, { image: { url: duka.image }, caption: `\n💰 *Link - ${limk}*` }, { quoted: mek })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
})

cmd({
    pattern: "matrix",
    react: "🌐",
    alias: ["matrixtext"],
    desc: "Text to Image with Matrix Effect",
    category: "textpro",
    use: '.matrix [Text]',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("🌐 *Text not found ! Please type a text to make matrix art*")
        const limk = "https://textpro.me/create-matrix-text-effect-online-1094.html"
        const duka = await mumaker.textpro(limk, q)
        await conn.sendMessage(from, { image: { url: duka.image }, caption: `\n🌐 *Link - ${limk}*` }, { quoted: mek })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
})

cmd({
    pattern: "glowing",
    react: "💎",
    alias: ["glowingtext"],
    desc: "Text to Image with Glowing Effect",
    category: "textpro",
    use: '.glowing [Text]',
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("💎 *Text not found ! Please type a text to make glowing art*")
        const limk = "https://textpro.me/create-glowing-text-effect-online-1095.html"
        const duka = await mumaker.textpro(limk, q)
        await conn.sendMessage(from, { image: { url: duka.image }, caption: `\n💎 *Link - ${limk}*` }, { quoted: mek })
    } catch (e) {
        reply('⛔ *Error !!*' + e)
        console.log(e)
    }
})