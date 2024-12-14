const config = require('../config');
const { cmd, commands } = require('../command');

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
                text: `The number ${exampleNumber} cannot be blocked.`,
            }, { quoted: mek });
            return;
        }

        // If it's a group, ask for the number if not provided
        if (isGroup) {
            const userId = `${numberToBlock}@s.whatsapp.net`;

            try {
                await conn.updateBlockStatus(userId, 'block');
                await conn.sendMessage(from, {
                    text: `Number ${numberToBlock} has been blocked successfully.`,
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
                    text: `Number ${numberToBlock} has been blocked successfully.`,
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
                text: `The number ${exampleNumber} cannot be unblocked.`,
            }, { quoted: mek });
            return;
        }

        // If it's a group, ask for the number if not provided
        if (isGroup) {
            const userId = `${numberToUnblock}@s.whatsapp.net`;

            try {
                await conn.updateBlockStatus(userId, 'unblock');
                await conn.sendMessage(from, {
                    text: `Number ${numberToUnblock} has been unblocked successfully.`,
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
                    text: `Number ${numberToUnblock} has been unblocked successfully.`,
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

// about command's
cmd({
    pattern: "about",
    react: "👑",
    desc: "Get owner details",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { from, quoted }) => {
    try {
        let madeMenu = `╭═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══♡᭄
     │     「 𝗠𝗬 𝗜𝗡𝗧𝗥𝗢 」
     │ Name      : ᴏɴʟʏ_ᴏɴᴇ_🥇ᴇᴍᴘɪʀᴇ
     │ Place      : ʟagos/Nigeria
     │ Gender     : ᴍᴀʟᴇ
     │ Age        : 20
     │ Phone      : wa.me/+2348078582627
     │ Youtube    : Youtube.com/only_one_empire
     │ Status     : Website Developer/Graphics Designer
     ╰═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══♡᭄`;

        await conn.sendMessage(
            from,
            { image: { url: config.ALIVE_IMG }, caption: madeMenu },
            { quoted: mek }
        );
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { text: `${e}` }, { quoted: mek });
    }
});
