const config = require('../config');
const { cmd, commands } = require('../command');
const { proto, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { sms } = require('../lib/msg');
const fs = require('fs');
const path = require('path');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions');


const prefix = config.PREFIX; // Get the prefix from the config
const exampleNumber = '2348078582627'; // Updated example number to exclude from being blocked/unblocked

cmd({
    pattern: "owner",
    react: "👑",
    desc: "Get owner number",
    category: "owner",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        // Fetch owner details from config
        const ownerNumber = config.OWNER_NUMBER || '+2348078582627'; // Default fallback number
        const ownerName = config.OWNER_NAME || 'Only_one_🥇Empire; // Name in the image
        const botName = config.BOT_NAME || 'Empire_X'; // Bot name fallback

        // Create a vCard (contact card) for the owner
        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  // Full Name
                      `ORG:${botName};\n` +  // Organization (Bot Name)
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` +  // WhatsApp ID and number
                      'END:VCARD';

        // Send the vCard
        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        }, { quoted: mek });

        // Follow up with "Message" as plain text
        await conn.sendMessage(from, { text: "Message" }, { quoted: mek });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { text: 'Sorry, there was an error fetching the owner contact.' }, { quoted: mek });
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

// View-once media resend command
cmd({
    pattern: "vv",
    desc: "Resend view-once media as normal media.",
    category: "owner",
    react: "📸",
    filename: __filename,
}, async (conn, mek, m, { isReply, quoted, reply }) => {
    try {
        // Check if the message is a reply to a quoted message
        if (!isReply || !quoted || !quoted.message) {
            return reply("Please reply to a view-once media message.");
        }

        console.log("Quoted Message: ", quoted.message);  // Log the quoted message for debugging

        const quotedMsg = quoted.message;

        // Check if the quoted message contains view-once media
        if (quotedMsg.viewOnceMessage) {
            const viewOnceMessage = quotedMsg.viewOnceMessage.message;
            let mediaType = null;

            // Check for the type of media (image or video)
            if (viewOnceMessage.imageMessage) {
                mediaType = "image";
            } else if (viewOnceMessage.videoMessage) {
                mediaType = "video";
            }

            if (!mediaType) {
                return reply("Unsupported view-once media type.");
            }

            // Download the media buffer
            const mediaBuffer = await quoted.download();

            // Ensure media is not already seen (viewed)
            if (!mediaBuffer) {
                return reply("Unable to download the view-once media. It might have already been viewed.");
            }

            const caption = "Here is the view-once media!";

            // Send the appropriate media type (image or video)
            if (mediaType === "image") {
                await conn.sendMessage(m.chat, { image: mediaBuffer, caption }, { quoted: mek });
            } else if (mediaType === "video") {
                await conn.sendMessage(m.chat, { video: mediaBuffer, caption }, { quoted: mek });
            }
        } else {
            return reply("The replied message is not a view-once media.");
        }
    } catch (err) {
        console.error(err);
        reply("Failed to resend the view-once media.");
    }
});

// clear commands 
cmd({
    pattern: "clear",
    category: "owner",
    desc: "Clear all chats in the current group or chat.",
    react: "🧹",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, reply }) => {
    try {
        // Check if it's a group or individual chat
        if (!isGroup && from !== m.key.remoteJid) {
            return reply("❌ This command can only be used in a group chat or in an individual chat.");
        }

        // Send a confirmation message before clearing chats
        await conn.sendMessage(from, { text: "Clearing all chats... Please wait..." });

        // Fetch all messages in the chat (group or individual) and delete them
        const messages = await conn.loadMessages(from, 500);  // Load the last 500 messages
        for (let message of messages) {
            try {
                // Deleting message using Baileys format
                await conn.sendMessage(from, { delete: { remoteJid: from, id: message.id } });
            } catch (err) {
                console.error("Failed to delete message:", err);
            }
        }

        await conn.sendMessage(from, { text: "✅ All chats have been cleared successfully!" });
    } catch (err) {
        console.error("Error clearing chats:", err);
        reply("❌ Failed to clear the chats.");
    }
});
//pair commands 
cmd({
    pattern: "pair",
    alias: ["link"],
    react: "🔢",
    desc: "Pair a phone number with the bot",
    category: "download",
    use: ".pair +2348078582627",
    filename: __filename
}, async (message, _1, _2, { from, prefix, quoted, q, reply }) => {
    try {
        if (!q) return await reply("*Example - :* .pair +2348078582627");
        const response = await fetchJson("https://empire-x-paircode.onrender.com/code?number=" + q);
        const successMessage = "PAIR SUCCESSFUL...✅";
        const pairedNumber = response.code;
        reply(pairedNumber + "\n\n" + successMessage);
    } catch (error) {
        console.log(error);
        reply(error);
    }
});

cmd({
    pattern: "save",
    react: "📁",
    alias: ["store"],
    desc: "Save and send back a media file (image, video, or audio).",
    category: "media",
    use: ".save <caption>",
    filename: __filename,
},
async (conn, mek, m, { quoted, q, reply }) => {
    try {
        if (!quoted) {
            return reply("❌ Reply to a media message (video, image, or audio) with the `.save` command.");
        }

        const messageType = quoted.mtype;
        let mediaType;

        // Determine the type of media
        if (/video/.test(messageType)) {
            mediaType = "video";
        } else if (/image/.test(messageType)) {
            mediaType = "image";
        } else if (/audio/.test(messageType)) {
            mediaType = "audio";
        } else {
            return reply("❌ Only video, image, or audio messages are supported.");
        }

        // Download and save the media file
        const mediaPath = await conn.downloadAndSaveMediaMessage(quoted);
        const filePath = path.resolve(mediaPath);

        // Send the saved media back
        const mediaMessage = {
            caption: q || '',
        };
        mediaMessage[mediaType] = { url: `file://${filePath}` };

        await conn.sendMessage(m.sender, mediaMessage, { quoted: mek });
        await reply("✅ Successfully saved and sent the media file.");
    } catch (error) {
        console.error(error);
        reply("❌ Failed to save and send the media. Please try again.");
    }
});