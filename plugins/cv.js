const { cmd, commands } = require('../command');
const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

cmd({
    pattern: "cv",
    desc: "Copies and forwards view-once messages.",
    category: "group",
    filename: __filename,
    use: '<reply to a view-once message>',
}, 
async (m) => {
    if (!m.quoted) {
        return m.reply("Please reply to a view-once message (image or video).");
    }

    const mime = m.quoted.mtype;
    if (/viewOnce/.test(mime)) {
        const quotedMessage = m.quoted.message;
        const mtype = Object.keys(quotedMessage)[0];

        delete quotedMessage[mtype].viewOnce;

        const msgContent = proto.Message.fromObject({
            ...quotedMessage,
        });

        const prepMessage = generateWAMessageFromContent(m.chat, msgContent, { quoted: m });
        await m.client.relayMessage(m.chat, prepMessage.message, { messageId: prepMessage.key.id });
    } else {
        await m.reply("Please reply to a view-once message.");
    }
});