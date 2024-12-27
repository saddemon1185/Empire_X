const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const googleTTS = require("google-tts-api");
const axios = require('axios');
const yts = require('yt-search');
const config = require('../config'); // Importing config file

const prefix = config.PREFIX; // Get the prefix from the config

// Song Downloader Command
cmd({
    pattern: "play",
    alias: ["audio"],
    desc: "Download songs",
    category: "download",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, reply }) => {
    try {
        // Check for query
        if (!q) {
            return reply(`Please Enter a Search Query or YouTube link. Usage Example:\n*${config.PREFIX}play Spectre*\n*${config.PREFIX}play https://youtu.be/aGjXa18XCRY?si=-rNZHD-trThO1x4Y*`);
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
    alias: ["mp4", "ytmp4"],
    desc: "Download videos",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, reply }) => {
    try {
        // Check for query
        if (!q) {
            return reply(`Please Enter a Search Query or YouTube link. Usage Example:\n*${config.PREFIX}downloadvideo Spectre*\n*${config.PREFIX}downloadvideo https://youtu.be/aGjXa18XCRY?si=-rNZHD-trThO1x4Y*`);
        }

        // If a YouTube link is provided
        if (q.startsWith("https://youtu")) {
            let downloadUrl;
            try {
                // Send the API request to fetch the download URL for the provided YouTube link (MP4)
                let response = await axios.get(`https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${encodeURIComponent(q)}`);
                downloadUrl = response.data.result.download_url;

                // Download the video
                const buffer = await axios.get(downloadUrl, { responseType: 'arraybuffer' });

                // Send the video to the user
                await conn.sendMessage(from, { video: buffer.data, mimetype: "video/mp4" }, { quoted: mek });
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

        // Fetch the download URL for the found video (MP4)
        let downloadUrl;
        try {
            let response = await axios.get(`https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${encodeURIComponent(videoUrl)}`);
            downloadUrl = response.data.result.download_url;
        } catch (err) {
            console.error("Error fetching download URL:", err);
            return reply("❌ Unable to fetch download URL. Please try again later.");
        }

        // Information Message
        const infoMessage = {
            image: { url: data.thumbnail },
            caption: `> *${config.BOT_NAME} VIDEO DOWNLOADER*  
╭───────────────◆  
│⿻ *Title:* ${data.title}
│⿻ *Quality:* mp4 (720p)
│⿻ *Duration:* ${data.timestamp}
│⿻ *Viewers:* ${data.views}
│⿻ *Uploaded:* ${data.ago}
│⿻ *Artist:* ${data.author.name}
╰────────────────◆  
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

        // Send the video file
        await conn.sendMessage(from, {
            video: { url: downloadUrl },
            fileName: `${data.title}.mp4`,
            mimetype: 'video/mp4',
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    title: data.title,
                    body: 'Powered by Empire_X',
                    thumbnailUrl: data.thumbnail,
                    sourceUrl: config.channelUrl,
                    mediaType: 2, // video
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: mek });

        await m.react("✅");
    } catch (e) {
        console.error("Error in video download command:", e);
        reply(`❌ Error: ${e.message}`);
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
        // Check for query
        if (!q) {
            return reply(`Please enter a TikTok URL. Usage Example:\n*${cconfig.PREFIX}tiktok https://www.tiktok.com/@user/video/1234567890123456789*`);
        }

        // Validate if the provided URL is a valid TikTok URL
        if (!/^https?:\/\/www\.tiktok\.com/.test(q)) {
            return reply("❌ Please enter a valid TikTok URL starting with https://www.tiktok.com.");
        }

        // Encode the TikTok URL for the API request
        const tiktokUrl = encodeURIComponent(q.trim());

        // Send the API request to fetch the download URL for the TikTok video
        let response = await axios.get(`https://api.giftedtech.my.id/api/download/tiktokdlv1?apikey=gifted&url=${tiktokUrl}`);
        
        // Extract necessary data
        const videoUrl = response.data.result.download_url;
        const videoTitle = response.data.result.title || "Untitled Video";
        const videoAuthor = response.data.result.author || "Unknown";
        const videoDuration = response.data.result.duration || "N/A";
        const videoLikes = response.data.stats.likeCount || 0;
        const videoComments = response.data.stats.commentCount || 0;
        const videoShares = response.data.stats.shareCount || 0;
        const videoPlays = response.data.stats.playCount || 0;

        // If the video URL is not found, send an error message
        if (!videoUrl) {
            return reply("❌ Sorry, I couldn't fetch the video. Please check the URL and try again.");
        }

        // Information message for the TikTok video
        const infoMessage = {
            image: { url: response.data.result.thumbnail },
            caption: `> *TikTok Video Downloader*  
╭───────────────◆  
│⿻ *Video Title:* ${videoTitle}
│⿻ *Uploader:* ${videoAuthor}
│⿻ *Duration:* ${videoDuration}s
│⿻ *Likes:* ${videoLikes}
│⿻ *Comments:* ${videoComments}
│⿻ *Shares:* ${videoShares}
│⿻ *Plays:* ${videoPlays}
╰────────────────◆  
⦿ *Direct TikTok Link:* ${q}
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

        // Send the information message
        await conn.sendMessage(from, infoMessage, { quoted: mek });

        // Send the video to the user
        await conn.sendMessage(from, {
            video: { url: videoUrl },
            mimetype: "video/mp4",
            fileName: `${videoTitle}.mp4`,
            caption: "Here is your TikTok video!"
        }, { quoted: mek });

        await m.react("✅");
    } catch (e) {
        console.error(e);
        reply(`❌ An error occurred: ${e.message}`);
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

//Spotify commands 
cmd({
    pattern: "spotify",
    alias: ["spotifydownload", "spotifydl"],
    desc: "Download Spotify audio",
    category: "download",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, reply }) => {
    try {
        // Check for query
        if (!q) {
            return reply(`Please Enter a Spotify Song Link. Usage Example:\n*${config.PREFIX}spotify https://open.spotify.com/track/5n1lXmNIN4pgsYki9kVg1D*`);
        }

        // If a Spotify link is provided
        if (q.startsWith("https://open.spotify.com")) {
            let downloadUrl;
            try {
                // Send the API request to fetch the download URL for the provided Spotify link (MP3 audio)
                let response = await axios.get(`https://api.giftedtech.my.id/api/download/spotifydl?apikey=gifted&url=${encodeURIComponent(q)}`);
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

        // If the query is not a Spotify URL, reply with instructions
        return reply(`❌ Invalid Spotify URL. Please use a valid Spotify track link. Example:\n*${config.PREFIX}spotify https://open.spotify.com/track/5n1lXmNIN4pgsYki9kVg1D*`);
    } catch (e) {
        console.error("Error in Spotify download command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

// Pinterest commands 
cmd({
    pattern: "pinterest",
    desc: "Download media from Pinterest.",
    category: "download",
    react: "📌",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        const pinterestUrl = args[0];
        if (!pinterestUrl) {
            return reply('Please provide the Pinterest media URL.');
        }

        // Using the provided API for Pinterest downloader
        const apiKey = 'gifted';
        const apiUrl = `https://api.giftedtech.my.id/api/download/pinterestdl?apikey=${apiKey}&url=${encodeURIComponent(pinterestUrl)}`;

        const response = await axios.get(apiUrl);
        if (!response.data || !response.data.result || !response.data.result.url) {
            return reply('Unable to fetch the Pinterest media. Please check the URL and try again.');
        }

        const mediaUrl = response.data.result.url;

        await conn.sendMessage(m.from, {
            image: { url: mediaUrl },
            caption: 'Downloaded Pinterest Image',
        });
    } catch (error) {
        reply(`Error downloading from Pinterest: ${error.message}`);
    }
});