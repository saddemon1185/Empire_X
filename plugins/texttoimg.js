const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const mumaker = require("mumaker")

 cmd({
    pattern: "naruto",
    react: "🏜️",
    alias: ["textpro1"],
    desc: "Text to Image Collection",
    category: "text2img",
    use: '.naruto',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) return reply("🏜️ *Text not found! Please type a text to make art*");

        const limk = "https://textpro.me/create-naruto-logo-style-text-effect-online-1125.html";
        const duka = await mumaker.textpro(limk, q);
        
        await conn.sendMessage(from, {
            image: { url: duka.image },
            caption: `\n🗾 *Link - ${limk}* \n\n*Powered by 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐄𝐦𝐩𝐢𝐫𝐞*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e); // Improved error logging
        reply('⛔ *Error !!*' + e);
    }
});

cmd({
    pattern: "rose",
    react: "🌹",
    alias: ["textpro2"],
    desc: "Create Rose Text Effect",
    category: "text2img",
    use: '.rose',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) return reply("🌹 *Text not found! Please type a text to make art*");

        const limk = "https://textpro.me/rose-text-effect-online-1126.html";
        const duka = await mumaker.textpro(limk, q);
        
        await conn.sendMessage(from, {
            image: { url: duka.image },
            caption: `\n🗾 *Link - ${limk}* \n\n*Powered by 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐄𝐦𝐩𝐢𝐫𝐞*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply('⛔ *Error !!*' + e);
    }
});

cmd({
    pattern: "3d",
    react: "🔮",
    alias: ["textpro3"],
    desc: "Create 3D Text Effect",
    category: "text2img",
    use: '.3d',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) return reply("🔮 *Text not found! Please type a text to make art*");

        const limk = "https://textpro.me/3d-text-effect-online-1127.html";
        const duka = await mumaker.textpro(limk, q);
        
        await conn.sendMessage(from, {
            image: { url: duka.image },
            caption: `\n🗾 *Link - ${limk}* \n\n*Powered by 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐄𝐦𝐩𝐢𝐫𝐞*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply('⛔ *Error !!*' + e);
    }
});

cmd({
    pattern: "glitch",
    react: "⚡",
    alias: ["textpro4"],
    desc: "Create Glitch Text Effect",
    category: "text2img",
    use: '.glitch',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) return reply("⚡ *Text not found! Please type a text to make art*");

        const limk = "https://textpro.me/glitch-text-effect-online-1128.html";
        const duka = await mumaker.textpro(limk, q);
        
        await conn.sendMessage(from, {
            image: { url: duka.image },
            caption: `\n🗾 *Link - ${limk}* \n\n*Powered by 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐄𝐦𝐩𝐢𝐫𝐞*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply('⛔ *Error !!*' + e);
    }
});

cmd({
    pattern: "glow",
    react: "💫",
    alias: ["textpro5"],
    desc: "Create Glow Text Effect",
    category: "text2img",
    use: '.glow',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) return reply("💫 *Text not found! Please type a text to make art*");

        const limk = "https://textpro.me/glow-text-effect-online-1129.html";
        const duka = await mumaker.textpro(limk, q);
        
        await conn.sendMessage(from, {
            image: { url: duka.image },
            caption: `\n🗾 *Link - ${limk}* \n\n*Powered by 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐄𝐦𝐩𝐢𝐫𝐞*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply('⛔ *Error !!*' + e);
    }
});

cmd({
    pattern: "fire",
    react: "🔥",
    alias: ["textpro6"],
    desc: "Create Fire Text Effect",
    category: "text2img",
    use: '.fire',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) return reply("🔥 *Text not found! Please type a text to make art*");

        const limk = "https://textpro.me/fire-text-effect-online-1130.html";
        const duka = await mumaker.textpro(limk, q);
        
        await conn.sendMessage(from, {
            image: { url: duka.image },
            caption: `\n🗾 *Link - ${limk}* \n\n*Powered by 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐄𝐦𝐩𝐢𝐫𝐞*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply('⛔ *Error !!*' + e);
    }
});

cmd({
    pattern: "lion",
    react: "🦁",
    alias: ["textpro7"],
    desc: "Create Lion Text Effect",
    category: "text2img",
    use: '.lion',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) return reply("🦁 *Text not found! Please type a text to make art*");

        const limk = "https://textpro.me/lion-text-effect-online-1131.html";
        const duka = await mumaker.textpro(limk, q);
        
        await conn.sendMessage(from, {
            image: { url: duka.image },
            caption: `\n🗾 *Link - ${limk}* \n\n*Powered by 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐄𝐦𝐩𝐢𝐫𝐞*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply('⛔ *Error !!*' + e);
    }
});

cmd({
    pattern: "water",
    react: "🌊",
    alias: ["textpro8"],
    desc: "Create Water Text Effect",
    category: "text2img",
    use: '.water',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) return reply("🌊 *Text not found! Please type a text to make art*");

        const limk = "https://textpro.me/water-text-effect-online-1132.html";
        const duka = await mumaker.textpro(limk, q);
        
        await conn.sendMessage(from, {
            image: { url: duka.image },
            caption: `\n🗾 *Link - ${limk}* \n\n*Powered by 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐄𝐦𝐩𝐢𝐫𝐞*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply('⛔ *Error !!*' + e);
    }
});

cmd({
    pattern: "stone",
    react: "🪨",
    alias: ["textpro9"],
    desc: "Create Stone Text Effect",
    category: "text2img",
    use: '.stone',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) return reply("🪨 *Text not found! Please type a text to make art*");

        const limk = "https://textpro.me/stone-text-effect-online-1133.html";
        const duka = await mumaker.textpro(limk, q);
        
        await conn.sendMessage(from, {
            image: { url: duka.image },
            caption: `\n🗾 *Link - ${limk}* \n\n*Powered by 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐄𝐦𝐩𝐢𝐫𝐞*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply('⛔ *Error !!*' + e);
    }
});

cmd({
    pattern: "matrix",
    react: "💻",
    alias: ["textpro10"],
    desc: "Create Matrix Text Effect",
    category: "text2img",
    use: '.matrix',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) return reply("💻 *Text not found! Please type a text to make art*");

        const limk = "https://textpro.me/matrix-style-text-effect-online-1134.html";
        const duka = await mumaker.textpro(limk, q);
        
        await conn.sendMessage(from, {
            image: { url: duka.image },
            caption: `\n🗾 *Link - ${limk}* \n\n*Powered by 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐄𝐦𝐩𝐢𝐫𝐞*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply('⛔ *Error !!*' + e);
    }
});

cmd({
    pattern: "cloud",
    react: "☁️",
    alias: ["textpro11"],
    desc: "Create Cloud Text Effect",
    category: "text2img",
    use: '.cloud',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) return reply("☁️ *Text not found! Please type a text to make art*");

        const limk = "https://textpro.me/cloud-text-effect-online-1135.html";
        const duka = await mumaker.textpro(limk, q);
        
        await conn.sendMessage(from, {
            image: { url: duka.image },
            caption: `\n🗾 *Link - ${limk}* \n\n*Powered by 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐄𝐦𝐩𝐢𝐫𝐞*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply('⛔ *Error !!*' + e);
    }
});

cmd({
    pattern: "neon",
    react: "🌟",
    desc: "Create Neon Text Effect",
    category: "text2img",
    use: '.neon',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) return reply("🌟 *Text not found! Please type a text to make art*");

        const limk = "https://textpro.me/neon-text-effect-online-1124.html";
        const duka = await mumaker.textpro(limk, q);
        
        await conn.sendMessage(from, {
            image: { url: duka.image },
            caption: `\n🗾 *Link - ${limk}* \n\n*Powered by 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐄𝐦𝐩𝐢𝐫𝐞*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply('⛔ *Error !!*' + e);
    }
});

cmd({
    pattern: "horror",
    react: "👹",
    desc: "Create Horror Text Effect",
    category: "text2img",
    use: '.horror',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) return reply("👹 *Text not found! Please type a text to make art*");

        const limk = "https://textpro.me/horror-text-effect-online-1125.html";
        const duka = await mumaker.textpro(limk, q);
        
        await conn.sendMessage(from, {
            image: { url: duka.image },
            caption: `\n🗾 *Link - ${limk}* \n\n*Powered by 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐄𝐦𝐩𝐢𝐫𝐞*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply('⛔ *Error !!*' + e);
    }
});

cmd({
    pattern: "space",
    react: "🌌",
    desc: "Create Space Text Effect",
    category: "text2img",
    use: '.space',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) return reply("🌌 *Text not found! Please type a text to make art*");

        const limk = "https://textpro.me/space-text-effect-online-1126.html";
        const duka = await mumaker.textpro(limk, q);
        
        await conn.sendMessage(from, {
            image: { url: duka.image },
            caption: `\n🗾 *Link - ${limk}* \n\n*Powered by 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐄𝐦𝐩𝐢𝐫𝐞*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply('⛔ *Error !!*' + e);
    }
});

cmd({
    pattern: "candy",
    react: "🍬",
    desc: "Create Candy Text Effect",
    category: "text2img",
    use: '.candy',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) return reply("🍬 *Text not found! Please type a text to make art*");

        const limk = "https://textpro.me/candy-text-effect-online-1127.html";
        const duka = await mumaker.textpro(limk, q);
        
        await conn.sendMessage(from, {
            image: { url: duka.image },
            caption: `\n🗾 *Link - ${limk}* \n\n*Powered by 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐄𝐦𝐩𝐢𝐫𝐞*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply('⛔ *Error !!*' + e);
    }
});