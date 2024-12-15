const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const googleTTS = require("google-tts-api");
const axios = require('axios');
const yts = require('yt-search');
const config = require('../config'); // Importing config file
// Song Downloader Command
cmd({
    pattern: "play",
    alias: ["music", "ytmp3", "audio"],
    desc: "Download songs",
    category: "download",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, reply }) => {
    try {
        // Check for query
        if (!q) {
            return reply(`Please Enter a Search Query or YouTube link. Usage Example:\n*${config.prefix}play Spectre*\n*${config.prefix}play https://youtu.be/aGjXa18XCRY?si=-rNZHD-trThO1x4Y*`);
        }

        // If a YouTube link is provided
        if (q.startsWith("https://youtu")) {
            let downloadUrl;
            try {
                // Send the API request to fetch the download URL for the provided YouTube link
                let response = await axios.get(`https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted&url=${encodeURIComponent(q)}`);
                downloadUrl = response.data.result.download_url;

                // Download the audio
                const buffer = await axios.get(downloadUrl, { responseType: 'arraybuffer' });

                // Send the audio to the user
                await conn.sendMessage(from, { audio: buffer.data, mimetype: "audio/mp3" }, { quoted: mek });
                await m.react("✅");
                return;
            } catch (err) {
                console.error("Error fetching download URL:", err);
                return reply("❌ Unable to fetch download URL. Please try again later.");
            }
        }

        // If no link, perform a search for the video
        const search = await yts(q);
        const data = search.videos[0];
        const videoUrl = data.url;

        // Fetch the download URL for the found video
        let downloadUrl;
        try {
            let response = await axios.get(`https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted&url=${encodeURIComponent(videoUrl)}`);
            downloadUrl = response.data.result.download_url;
        } catch (err) {
            console.error("Error fetching download URL:", err);
            return reply("❌ Unable to fetch download URL. Please try again later.");
        }

        // Information Message
        const infoMessage = {
            image: { url: data.thumbnail },
            caption: `> *${config.BOT_NAME} SONG DOWNLOADER*  
╭───────────────◆  
│⿻ *Title:* ${data.title}
│⿻ *Quality:* mp3 (128kbps)
│⿻ *Duration:* ${data.timestamp}
│⿻ *Viewers:* ${data.views}
│⿻ *Uploaded:* ${data.ago}
│⿻ *Artist:* ${data.author.name}
╰────────────────◆  
⦿ *Direct Yt Link:* ${videoUrl}
╭────────────────◆  
│ Powered by Empire_X
╰─────────────────◆`,
            contextInfo: {
                mentionedJid: [mek.sender],
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363337275149306@newsletter',
                    newsletterName: "Empire_X",
                    serverMessageId: 143
                }
            }
        };

        await conn.sendMessage(from, infoMessage, { quoted: mek });

        // Send the audio file
        await conn.sendMessage(from, {
            audio: { url: downloadUrl },
            fileName: `${data.title}.mp3`,
            mimetype: 'audio/mpeg',
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    title: data.title,
                    body: 'Powered by Empire_X',
                    thumbnailUrl: data.thumbnail,
                    sourceUrl: config.channelUrl,
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: mek });

        await m.react("✅");
    } catch (e) {
        console.error("Error in play command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

// Video Downloader Command
cmd({
    pattern: "video",
    desc: "Download Videos",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) return reply("Send me URL or title name");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
🌟 *𝐄𝐦𝐩𝐢𝐫𝐞_𝐕𝟏 VIDEO DOWNLOADER* 🌟
  
Title: ${data.title}
Description: ${data.description}
Duration: ${data.timestamp}
Uploaded: ${data.ago}
Views: ${data.views}

MADE BY 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞
        `;
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        await conn.sendMessage(from, {
            video: { url: `https://api.giftedtech.my.id/api/download/ytmp4?apikey=gifted&url=${url}` },
            mimetype: "video/mp4",
            caption: "MADE BY 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞",
            fileName: `${data.title}.mp4`
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// TikTok Video Downloader Command
cmd({
    pattern: "tiktok",
    desc: "Download TikTok Videos",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) return reply("Please send me the TikTok URL.");

        const tiktokUrl = encodeURIComponent(q.trim());
        if (!/^https?:\/\/www\.tiktok\.com/.test(q)) {
            return reply("Please enter a valid TikTok URL starting with https://www.tiktok.com.");
        }

        const options = {
            method: 'GET',
            url: 'https://tiktok-videos-without-watermark.p.rapidapi.com/getVideo',
            params: { url: tiktokUrl },
            headers: {
                'x-rapidapi-key': 'dc3a3dca06msh47756334a0558a2p102b06jsn201858f0f222',
                'x-rapidapi-host': 'tiktok-videos-without-watermark.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        const videoUrl = response.data;

        if (!videoUrl) {
            return reply("Sorry, I couldn't fetch the video. Please check the URL.");
        }

        await conn.sendMessage(from, {
            video: { url: videoUrl },
            mimetype: "video/mp4",
            caption: "Here is your TikTok video!"
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});

// Google Drive Downloader Command
cmd({
    pattern: "gdrive",
    desc: "Download Google Drive Files",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) {
            return reply("Please send me the Google Drive link.");
        }

        const url = q.trim();
        const apiUrl = `https://api.nexoracle.com/downloader/gdrive?apikey=ae1fa2a45a76baba7d&url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);

        if (!response.data || !response.data.result || !response.data.result.downloadUrl) {
            return reply("Sorry, I couldn't fetch the file. Make sure the link is valid.");
        }

        const fileData = response.data.result;
        await conn.sendMessage(from, {
            document: { url: fileData.downloadUrl },
            mimetype: fileData.mimetype,
            fileName: fileData.fileName,
        }, { quoted: mek });

        setTimeout(async () => {
            await conn.sendMessage(from, { text: "Here is your Google file made by Empire_X" }, { quoted: mek });
        }, 5000);
    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message || e.response?.data?.error || e}`);
    }
});