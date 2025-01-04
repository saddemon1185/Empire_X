const { cmd, commands } = require('../command');
const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

cmd({
    pattern: "retrive",
    desc: "Copies and forwards view-once messages.",
    category: "group",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Check if the message is a reply
        if (!quoted) {
            return reply("Please reply to a view-once message (image or video).");
        }

        const mime = quoted.mtype;

        // Check if the message is a view-once message
        if (/viewOnce/.test(mime)) {
            const quotedMessage = quoted.message;
            const mtype = Object.keys(quotedMessage)[0];

            // Remove the view-once restriction
            delete quotedMessage[mtype].viewOnce;

            // Create a new message object without the view-once restriction
            const msgContent = proto.Message.fromObject({
                ...quotedMessage,
            });

            // Prepare and send the message
            const prepMessage = generateWAMessageFromContent(from, msgContent, { quoted: mek });
            await conn.relayMessage(from, prepMessage.message, { messageId: prepMessage.key.id });
        } else {
            await reply("Please reply to a view-once message.");
        }
    } catch (err) {
        console.error(err);
        reply("An error occurred while processing the view-once message.");
    }
});