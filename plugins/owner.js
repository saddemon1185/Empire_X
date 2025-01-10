const config = require('../config');
const { cmd, commands } = require('../command');
const { proto, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { sms } = require('../lib/msg');
const fs = require('fs');
const path = require('path');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions');

const prefix = config.PREFIX;
const exampleNumber = '2348078582627';

const loadMessages = async (conn, chatId, limit) => {
    try {
        const messages = await conn.fetchMessages(chatId, { limit });
        return messages;
    } catch (error) {
        console.error("Error loading messages:", error);
        return [];
    }
};

cmd({
    pattern: "owner",
    desc: "Sends the owner's VCard.",
    category: "owner",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    try {
        const number = config.OWNER_NUMBER || '+2348078582627';
        const name = config.OWNER_NAME || "Only_one_🥇Empire";
        const info = config.BOT_NAME || "Empire_X";

        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nORG:${info};\nTEL;type=CELL;type=VOICE;waid=${number.replace('+', '')}:${number}\nEND:VCARD`;

        // Sending only the vCard
        await conn.sendMessage(
            m.chat, 
            { 
                contacts: { 
                    displayName: name, 
                    contacts: [{ vcard }] 
                } 
            }
        );
    } catch (error) {
        console.error("Error in vcard command:", error);
        reply("An error occurred while sending the VCard.");
    }
});

// Delete quoted message command
cmd({
    pattern: "delete",
    react: "❌",
    alias: ["del"],
    desc: "Delete a quoted message.",
    category: "owner",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, isOwner, isAdmins, reply }) => {
    try {
        if (!isOwner && !isAdmins) return reply("❌ You are not authorized to use this command.");
        if (!quoted) return reply("❌ Please reply to the message you want to delete.");
        
        const key = {
            remoteJid: from,
            fromMe: quoted.fromMe,
            id: quoted.id,
            participant: quoted.sender,
        };

        await conn.sendMessage(from, { delete: key });
    } catch (e) {
        console.log(e);
        reply("❌ Error deleting the message.");
    }
});

// Block number command
cmd({
    pattern: "block",
    category: "owner",
    desc: "Block a number in the group or chat.",
    react: "🚫",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, body, sender, pushname }) => {
    try {
        const numberToBlock = body.split(" ")[1];
        if (!numberToBlock) {
            await conn.sendMessage(from, { text: `Use ${prefix}block 2348078582627` }, { quoted: mek });
            return;
        }
        if (numberToBlock === exampleNumber) {
            await conn.sendMessage(from, { text: `You Can't Block The Developer ${exampleNumber}` }, { quoted: mek });
            return;
        }

        const userId = `${numberToBlock}@s.whatsapp.net`;
        try {
            await conn.updateBlockStatus(userId, 'block');
            await conn.sendMessage(from, { text: `𝐃𝐨𝐧𝐞 ✓ ${numberToBlock} has been blocked successfully.` }, { quoted: mek });
        } catch (err) {
            console.error(err);
            await conn.sendMessage(from, { text: `Failed to block the number: ${err.message}` }, { quoted: mek });
        }
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { text: `An error occurred while blocking the number. Please try again.` }, { quoted: mek });
    }
});

// Unblock number command
cmd({
    pattern: "unblock",
    category: "owner",
    desc: "Unblock a number in the group or chat.",
    react: "✅",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, body, sender, pushname }) => {
    try {
        const numberToUnblock = body.split(" ")[1];
        if (!numberToUnblock) {
            await conn.sendMessage(from, { text: `Use ${prefix}unblock 2348078582627` }, { quoted: mek });
            return;
        }
        if (numberToUnblock === exampleNumber) {
            await conn.sendMessage(from, { text: `You Can't Unblock The Developer ${exampleNumber}` }, { quoted: mek });
            return;
        }

        const userId = `${numberToUnblock}@s.whatsapp.net`;
        try {
            await conn.updateBlockStatus(userId, 'unblock');
            await conn.sendMessage(from, { text: `𝐃𝐨𝐧𝐞 ✓ ${numberToUnblock} has been unblocked successfully.` }, { quoted: mek });
        } catch (err) {
            console.error(err);
            await conn.sendMessage(from, { text: `Failed to unblock the number: ${err.message}` }, { quoted: mek });
        }
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { text: `An error occurred while unblocking the number. Please try again.` }, { quoted: mek });
    }
});

// Owner details (Donation command)
cmd({
    pattern: "aza",
    react: "💵",
    alias: ["donate"],
    desc: "Get owner details",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { from, quoted }) => {
    try {
        let madeMenu = `
╭━━━〔 Empire_X 〕━━━⬤
┃𖠄│ Name: Efeurhobo Bullish
┃𖠄│ Acc: 8078582627
┃𖠄│ Bank: Opay
┃𖠄│ Note: Send a screenshot after payment 💸
┃𖠄╰──────────────⬤
╰━━━━━━━━━━━━━━━⬤`;

        await conn.sendMessage(from, { 
            image: { 
                url: "https://raw.githubusercontent.com/efeurhobo/Empire_X/main/lib/assets/donate.jpg"
            }, 
            caption: madeMenu 
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { text: `${e}` }, { quoted: mek });
    }
});

//pair commands 

cmd({
    pattern: "wa",
    desc: "Generates a wa.me link for the mentioned or quoted user.",
    category: "owner",
    filename: __filename,
}, async (conn, m, { quoted, text, args }) => {
    try {
        let user;
        if (m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]) {
            // For mentioned user
            user = m.message.extendedTextMessage.contextInfo.mentionedJid[0].split('@')[0];
        } else if (quoted) {
            // For quoted message
            user = quoted.sender.split('@')[0];
        } else if (text) {
            // For direct input text
            user = text.replace('@', '');
        } else {
            return conn.sendMessage(m.key.remoteJid, { text: "Please mention a user, quote a message, or provide a number." }, { quoted: m });
        }

        // Reply with the wa.me link
        return conn.sendMessage(m.key.remoteJid, { text: `https://wa.me/${user}` }, { quoted: m });
    } catch (error) {
        console.error(error);
        return conn.sendMessage(m.key.remoteJid, { text: "An error occurred while processing your request." }, { quoted: m });
    }
});

cmd({
    pattern: "clearchats",
    desc: "Clear all chats from the bot.",
    category: "owner",
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        const chats = Object.keys(conn.chats);
        for (const chatId of chats) {
            await conn.modifyChat(chatId, 'delete');
        }
        reply("🧹 All chats cleared successfully!");
    } catch (error) {
        console.error("Error clearing chats:", error);
        reply(`❌ Error clearing chats: ${error.message}`);
    }
});


//2. Broadcast Message to All Groups
cmd({
    pattern: "broadcast",
    desc: "Broadcast a message to all groups.",
    category: "owner",
    react: "📢",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, args, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (args.length === 0) return reply("📢 Please provide a message to broadcast.");
    const message = args.join(' ');
    const groups = Object.keys(await conn.groupFetchAllParticipating());
    for (const groupId of groups) {
        await conn.sendMessage(groupId, { text: message }, { quoted: mek });
    }
    reply("📢 Message broadcasted to all groups.");
});

cmd({
    pattern: "setpp",
    desc: "Set bot profile picture.",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted || !quoted.message.imageMessage) return reply("❌ Please reply to an image.");
    try {
        const stream = await downloadContentFromMessage(quoted.message.imageMessage, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        const mediaPath = path.join(__dirname, `${Date.now()}.jpg`);
        fs.writeFileSync(mediaPath, buffer);
        await conn.updateProfilePicture(conn.user.jid, { url: `file://${mediaPath}` });
        reply("🖼️ Profile picture updated successfully!");
    } catch (error) {
        console.error("Error updating profile picture:", error);
        reply(`❌ Error updating profile picture: ${error.message}`);
    }
});


cmd({
    pattern: "vv",
    desc: "Get view once.",
    category: "owner",
    react: "👀",
    filename: __filename
}, async (conn, mek, m, { isReply, quoted, reply }) => {
    try {
        // Check if the message is a view once message
        if (m.message && m.message.viewOnceMessageV2) {
            const message = m.message.viewOnceMessageV2;  // Get the view once message

            // Download the media content from the view once message
            const mediaBuffer = await downloadMediaMessage(m, 'viewOnceMessageV2');
            let caption = '';

            // Set the appropriate caption based on the message type
            if (message.type === 'imageMessage') {
                caption = 'Here is your image';
            } else if (message.type === 'videoMessage') {
                caption = 'Here is your video';
            }

            // Forward the message to the user
            await conn.sendMessage(m.chat, { forward: { key: m.key } }, { quoted: m });

            // Send the media content to the user
            if (message.type === 'imageMessage') {
                await conn.sendMessage(m.chat, { image: mediaBuffer, caption }, { quoted: m });
            } else if (message.type === 'videoMessage') {
                await conn.sendMessage(m.chat, { video: mediaBuffer, caption }, { quoted: m });
            }
        }
    } catch (error) {
        console.error(error);
        reply('_An error occurred while processing the view once message._');
    }
});



