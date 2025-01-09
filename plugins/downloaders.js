const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const googleTTS = require("google-tts-api");
const axios = require('axios');
const yts = require('yt-search');
const config = require('../config'); // Importing config file
const url = require('url'); // Importing url module

const prefix = config.PREFIX; // Get the prefix from the config



// TikTok Downloader Command
cmd({
    pattern: "tiktok",
    desc: "Download a TikTok video without watermark.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide the TikTok video URL.");

        // Fetch TikTok video details from the NexOracle API
        const tiktokUrl = encodeURIComponent(q);
        const apiUrl = `https://api.nexoracle.com/downloader/tiktok-nowm?apikey=MepwBcqIM0jYN0okD&url=${tiktokUrl}`;
        
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status !== 200 || !data.result) {
            return reply("Unable to fetch TikTok video. Please check the URL.");
        }

        const videoDetails = data.result;
        const videoUrl = videoDetails.url;
        const title = videoDetails.title;
        const authorName = videoDetails.author.nickname;
        const thumbnailUrl = videoDetails.thumbnail;

        // Send video details
        await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: `
╭─────❏ *EMPIRE_X DOWNLOADER* ❏
│ 𝙷𝙴𝙻𝙻𝙾 ${pushname || "User"}
│───────────────────
│ *Title*: ${title}
│ *Author*: ${authorName}
│ *Duration*: ${videoDetails.duration}s
│ > Made By 𝐄𝐦𝐩𝐢𝐫𝐞 𝐓𝐞𝐜𝐡 [ 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫 ]
╰━━━━━━━━━━━━━━━━━━━──⊷``
        }, { quoted: mek });

        // Optionally, send the thumbnail as well
        await conn.sendMessage(from, {
            image: { url: thumbnailUrl },
            caption: `Thumbnail for *${title}*`
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});