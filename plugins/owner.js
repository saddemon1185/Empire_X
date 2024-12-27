const config = require('../config');
const { cmd, commands } = require('../command');
const { proto, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { sms } = require('../lib/msg');
const fs = require('fs');


const prefix = config.PREFIX; // Get the prefix from the config
const exampleNumber = '2348078582627'; // Updated example number to exclude from being blocked/unblocked

cmd({
    pattern: "delete",
    react: "❌",
    alias: ["del"],
    desc: "Delete a quoted message.",
    category: "owner",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, isOwner, isAdmins, reply }) => {
    try {
        // Check if the user is the owner or an admin
        if (!isOwner && !isAdmins) return reply("❌ You are not authorized to use this command.");

        // Ensure there's a quoted message to delete
        if (!quoted) return reply("❌ Please reply to the message you want to delete.");

        // Prepare the key for message deletion
        const key = {
            remoteJid: from,
            fromMe: quoted.fromMe,
            id: quoted.id,
            participant: quoted.sender,
        };

        // Delete the quoted message
        await conn.sendMessage(from, { delete: key });
        // The success message has been removed
    } catch (e) {
        console.log(e);
        reply("❌ Error deleting the message.");
    }
});

//block and unblock commands 
cmd({
    pattern: "block",
    category: "owner",
    desc: "Block a number in the group or chat.",
    react: "🚫", // React emoji for block
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, body, sender, pushname }) => {
    try {
        const numberToBlock = body.split(" ")[1];

        // If no number is provided
        if (!numberToBlock) {
            await conn.sendMessage(from, {
                text: `Use ${prefix}block 2348078582627`,
            }, { quoted: mek });
            return;
        }

        // Skip blocking the example number
        if (numberToBlock === exampleNumber) {
            await conn.sendMessage(from, {
                text: `You Can't Block The Developer ${exampleNumber}`,
            }, { quoted: mek });
            return;
        }

        // If it's a group, ask for the number if not provided
        if (isGroup) {
            const userId = `${numberToBlock}@s.whatsapp.net`;

            try {
                await conn.updateBlockStatus(userId, 'block');
                await conn.sendMessage(from, {
                    text: `𝐃𝐨𝐧𝐞 ✓ ${numberToBlock} has been blocked successfully.`,
                }, { quoted: mek });
            } catch (err) {
                console.error(err);
                await conn.sendMessage(from, {
                    text: `Failed to block the number: ${err.message}`,
                }, { quoted: mek });
            }
        } else {
            const userId = `${numberToBlock}@s.whatsapp.net`;

            try {
                await conn.updateBlockStatus(userId, 'block');
                await conn.sendMessage(from, {
                    text: `𝐃𝐨𝐧𝐞 ✓ ${numberToBlock} has been blocked successfully.`,
                }, { quoted: mek });
            } catch (err) {
                console.error(err);
                await conn.sendMessage(from, {
                    text: `Failed to block the number: ${err.message}`,
                }, { quoted: mek });
            }
        }
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, {
            text: `An error occurred while blocking the number. Please try again.`,
        }, { quoted: mek });
    }
});

cmd({
    pattern: "unblock",
    category: "owner",
    desc: "Unblock a number in the group or chat.",
    react: "✅", // React emoji for unblock
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, body, sender, pushname }) => {
    try {
        const numberToUnblock = body.split(" ")[1];

        // If no number is provided
        if (!numberToUnblock) {
            await conn.sendMessage(from, {
                text: `Use ${prefix}unblock 2348078582627`,
            }, { quoted: mek });
            return;
        }

        // Skip unblocking the example number
        if (numberToUnblock === exampleNumber) {
            await conn.sendMessage(from, {
                text: `You Can't Block The Developer ${exampleNumber}`,
            }, { quoted: mek });
            return;
        }

        // If it's a group, ask for the number if not provided
        if (isGroup) {
            const userId = `${numberToUnblock}@s.whatsapp.net`;

            try {
                await conn.updateBlockStatus(userId, 'unblock');
                await conn.sendMessage(from, {
                    text: `𝐃𝐨𝐧𝐞 ✓${numberToUnblock} has been unblocked successfully.`,
                }, { quoted: mek });
            } catch (err) {
                console.error(err);
                await conn.sendMessage(from, {
                    text: `Failed to unblock the number: ${err.message}`,
                }, { quoted: mek });
            }
        } else {
            const userId = `${numberToUnblock}@s.whatsapp.net`;

            try {
                await conn.updateBlockStatus(userId, 'unblock');
                await conn.sendMessage(from, {
                    text: `𝐃𝐨𝐧𝐞 ✓ ${numberToUnblock} has been unblocked successfully.`,
                }, { quoted: mek });
            } catch (err) {
                console.error(err);
                await conn.sendMessage(from, {
                    text: `Failed to unblock the number: ${err.message}`,
                }, { quoted: mek });
            }
        }
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, {
            text: `An error occurred while unblocking the number. Please try again.`,
        }, { quoted: mek });
    }
});

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

        await conn.sendMessage(
            from,
            { 
                image: { 
                    url: "https://raw.githubusercontent.com/efeurhobo/Empire_X/main/lib/assets/donate.jpg" // Raw image URL
                }, 
                caption: madeMenu 
            },
            { quoted: mek }
        );
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { text: `${e}` }, { quoted: mek });
    }
});

//vv commands 
cmd({
    pattern: "vv",
    desc: "Resend view-once media as normal media.",
    category: "owner",
    react: "📸",
    filename: __filename,
}, async (conn, mek, m, { isReply, quoted, reply }) => {
    try {
        // Check if the command is a reply to a message
        if (!isReply || !quoted || !quoted.message) {
            return reply("Please reply to a view-once media message.");
        }

        // Ensure the replied message is a view-once message
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

            // Download the view-once media
            const mediaBuffer = await quoted.download();
            const caption = "Here is the view-once media!";

            // Resend the media based on its type
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