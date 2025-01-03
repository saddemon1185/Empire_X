const config = require('../config');
const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');

cmd({
    pattern: "upbio",
    react: "🥏",
    desc: "Change the Bot number Bio",
    category: "owner",
    use: '.upbio',
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) return reply('🚫 *You must be an Owner to use this command*');
        if (!q) return reply('❓ *Enter the New Bio*');
        if (q.length > 139) return reply('❗ *Sorry! Character limit exceeded*');
        await conn.updateProfileStatus(q);
        await conn.sendMessage(from, { text: "✔️ *New Bio Added Successfully*" }, { quoted: mek });
    } catch (e) {
        reply('🚫 *An error occurred!*\n\n' + e);
        l(e);
    }
});

cmd({
    pattern: "getprivacy",
    react: "🥏",
    desc: "Get the bot Number Privacy Setting Updates",
    category: "owner",
    use: '.getprivacy',
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) return reply('🚫 *You must be an Owner to use this command*');
        const duka = await conn.fetchPrivacySettings(true);
        let puka = `🛠️  *Empire_X ᴡʜᴀᴛꜱᴀᴘᴘ ᴘʀɪᴠᴀᴄʏ ꜱᴇᴛᴛɪɴɢꜱ*  ⚙️

⚙️▕  *Read Receipt* - ${duka.readreceipts}
⚙️▕  *Profile Picture* - ${duka.profile}
⚙️▕  *Status*  - ${duka.status}
⚙️▕  *Online* - ${duka.online}
⚙️▕  *Last Seen* - ${duka.last}
⚙️▕  *Group Privacy* - ${duka.groupadd}
⚙️▕  *Call Privacy* - ${duka.calladd}

⚠️ *_This will not cause any trouble to you, and you can only check the privacy status of the bot. This will not harm your privacy in any way._* 🕊️‼️

*Empire_X ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ*`;
        await conn.sendMessage(from, { text: puka }, { quoted: mek });
    } catch (e) {
        reply('🚫 *An error occurred!*\n\n' + e);
        l(e);
    }
});

cmd({
    pattern: "removepp",
    react: "🥏",
    desc: "Remove the botNumber PP",
    category: "owner",
    use: '.removepp',
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) return reply('🚫 *You must be an Owner to use this command*');
        await conn.removeProfilePicture(botNumber2);
        await conn.sendMessage(from, { text: "✔️ *Profile Pic Successfully removed*" }, { quoted: mek });
    } catch (e) {
        reply('🚫 *An error occurred!*\n\n' + e);
        l(e);
    }
});