const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { cmd } = require('../command');
const { getRandom } = require('../lib/functions');

const imgmsg = 'Reply to a photo for sticker!'; // Default message when no image or sticker is found.

const descg = 'It converts your replied photo to a sticker.'; // Description of the command.

cmd({
    pattern: "sticker",
    alias: ["s"],
    desc: "change image to sticker.",
    category: "owner",
    use: ".sticker <Reply to image>",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCmd, command, args, q, isGroup, pushname }) => {
    try {
        const isQuotedImage = m.quoted && (m.quoted.type === 'imageMessage' || (m.quoted.type === 'viewOnceMessage' && m.quoted.msg.type === 'imageMessage'));
        const isQuotedSticker = m.quoted && m.quoted.type === 'stickerMessage';

        if ((m.type === 'imageMessage') || isQuotedImage) {
            const nameJpg = getRandom('.jpg');
            const imageBuffer = isQuotedImage ? await m.quoted.download() : await m.download();
            await require('fs').promises.writeFile(nameJpg, imageBuffer);

            let sticker = new Sticker(nameJpg, {
                pack: 'Empire_X', // Sticker pack name
                author: pushname || 'Hacker Only_🥇Empire', // Author name, fallback to 'Hacker Only_🥇Empire'
                type: q.includes('--crop') || q.includes('-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                categories: ['🤩', '🎉'], // Sticker categories
                id: '12345', // Sticker id
                quality: 75, // Quality of the sticker
                background: 'transparent', // Transparent background for full stickers
            });

            const buffer = await sticker.toBuffer();
            return conn.sendMessage(from, { sticker: buffer }, { quoted: mek });
        } else if (isQuotedSticker) {
            const nameWebp = getRandom('.webp');
            const stickerBuffer = await m.quoted.download();
            await require('fs').promises.writeFile(nameWebp, stickerBuffer);

            let sticker = new Sticker(nameWebp, {
                pack: 'Empire_X', // Sticker pack name
                author: pushname || 'Hacker Only_🥇Empire', // Author name, fallback to 'Hacker Only_🥇Empire'
                type: q.includes('--crop') || q.includes('-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                categories: ['🤩', '🎉'], // Sticker categories
                id: '12345', // Sticker id
                quality: 75, // Quality of the sticker
                background: 'transparent', // Transparent background for full stickers
            });

            const buffer = await sticker.toBuffer();
            return conn.sendMessage(from, { sticker: buffer }, { quoted: mek });
        } else {
            return await reply(imgmsg); // Return the default message if no image or sticker is found.
        }
    } catch (e) {
        reply('Error !!');
        console.error(e);
    }
});


cmd({
    pattern: "circle",
    alias: ["cs"],
    desc: "Makes sticker of replied image/video.",
    category: "sticker",
    filename: __filename,
    use: "<reply to any image>",
},
async (conn, mek, m, { from, reply, pushname, quoted }) => {
    if (!quoted) return reply(`*Reply to an image or sticker, please.*`);

    try {
        const mime = quoted.mimetype || "";
        if (!mime.startsWith("image/") && !mime.startsWith("video/")) {
            return reply("*Please reply to a valid image or video.*");
        }

        // Download the media
        const media = await conn.downloadMediaMessage(quoted);

        // Create the sticker
        const sticker = new Sticker(media, {
            pack: "Empire_X", // Pack name
            author: pushname || "Unknown", // Author name
            type: StickerTypes.CIRCLE, // Circle sticker type
            categories: ["🤩", "🎉"], // Sticker categories
            id: "12345", // Sticker ID
            quality: 75, // Output quality
        });

        const buffer = await sticker.toBuffer();
        await conn.sendMessage(from, { sticker: buffer }, { quoted: m });
    } catch (e) {
        console.error(e);
        return reply("An error occurred while processing your request. Please try again.");
    }
});