const config = require('../config');
const { cmd, commands } = require('../command');
const { proto, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { sms } = require('../lib/msg');
const fs = require('fs');

const prefix = config.PREFIX; // Get the prefix from the config
const exampleNumber = '2348078582627'; // Updated example number to exclude from being blocked/unblocked

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

// View-once media resend command
cmd({
    pattern: "vv",
    desc: "Resend view-once media as normal media.",
    category: "owner",
    react: "📸",
    filename: __filename,
}, async (conn, mek, m, { isReply, quoted, reply }) => {
    try {
        if (!isReply || !quoted || !quoted.message) {
            return reply("Please reply to a view-once media message.");
        }

        const quotedMsg = quoted.message;
        if (quotedMsg.viewOnceMessage) {
            const mediaType = quotedMsg.viewOnceMessage.message.imageMessage 
                ? "image" 
                : quotedMsg.viewOnceMessage.message.videoMessage 
                ? "video" 
                : null;

            if (!mediaType) {
                return reply("Unsupported view-once media type.");
            }

            const mediaBuffer = await quoted.download();
            const caption = "Here is the view-once media!";

            if (mediaType === "image") {
                await conn.sendMessage(m.chat, { image: mediaBuffer, caption }, { quoted: mek });
            } else if (mediaType === "video") {
                await conn.sendMessage(m.chat, { video: mediaBuffer, caption }, { quoted: mek });
            }
        } else {
            reply("The replied message is not a view-once media.");
        }
    } catch (err) {
        console.error(err);
        reply("Failed to resend the view-once media.");
    }
});

// Clear chat command
cmd({
    pattern: "clearchats",
    category: "owner",
    desc: "Clear all chats in the current group or chat.",
    react: "🧹",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, reply }) => {
    try {
        if (!isGroup) {
            return reply("❌ This command can only be used in a group chat.");
        }

        // Send a confirmation message before clearing chats
        await conn.sendMessage(from, { text: "Clearing all chats... Please wait..." });

        // Clear chat functionality (you can add more specific actions if needed)
        await conn.updateMessageReadStatus(from, 'clear');
        await conn.sendMessage(from, { text: "✅ All chats have been cleared successfully!" });
    } catch (err) {
        console.error(err);
        reply("❌ Failed to clear the chats.");
    }
});