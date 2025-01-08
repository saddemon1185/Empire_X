const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { cmd } = require('../command');
const axios = require('axios');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions');

const imgmsg = 'Reply to a photo for sticker!'; // Default message when no image or sticker is found.

const descg = 'It converts your replied photo to a sticker.'; // Description of the command.

cmd({
    pattern: "sticker",
    alias: ["s"],
    desc: "change image to sticker.",
    category: "converter",
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
    pattern: "st2img",
    category: "converter",
    desc: "Convert sticker to image.",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCmd, command, args, q, isGroup, pushname }) => {
    try {
        // Check if the message is a sticker or if it's a quoted sticker
        const isQuotedSticker = m.quoted && m.quoted.type === 'stickerMessage';

        if (m.type === 'stickerMessage' || isQuotedSticker) {
            // Download the sticker using downloadMediaMessage function
            const stickerBuffer = isQuotedSticker ? await m.quoted.download() : await m.download();

            // Generate a random file name
            const nameWebp = getRandom('.webp');

            // Save the sticker to a file
            await require('fs').promises.writeFile(nameWebp, stickerBuffer);

            // Convert the sticker to an image
            const imageBuffer = await convertStickerToImage(nameWebp);  // You need to implement this function

            // Send the converted image back to the user
            await conn.sendMessage(from, { image: imageBuffer }, { caption: args.join(' ') || '*_Here is your image_*' });
        } else {
            return reply('_Please reply to a sticker to convert it to an image._');
        }
    } catch (e) {
        console.error(e);
        reply('_An error occurred while converting the sticker._');
    }
});

cmd({
    pattern: "tiny",
    desc: "Makes URL tiny.",
    category: "converter",
    use: "<url>",
    react: "✅",
    filename: __filename,
},
async (conn, mek, m, { from, quoted, isOwner, isAdmins, reply, args }) => {
    if (!args[0]) return reply("Provide me a link");

    try {
        const link = args[0];
        const response = await axios.get(`https://tinyurl.com/api-create.php?url=${link}`);
        const shortenedUrl = response.data;

        return reply(`*🛡️Your Shortened URL*\n\n${shortenedUrl}`);
    } catch (e) {
        console.error(e);
        return reply("An error occurred while shortening the URL. Please try again.");
    }
});
