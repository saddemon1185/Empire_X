const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const googleTTS = require("google-tts-api");
const axios = require('axios');
const yts = require('yt-search');
const config = require('../config'); // Importing config file
const url = require('url'); // Importing url module

const prefix = config.PREFIX; // Get the prefix from the config

cmd({
    pattern: "play",
    alias: ["audio"],
    desc: "Download songs",
    category: "download",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, pushname, args, q, reply }) => {
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
            let response = await axios.get(`https://api.giftedtech.web.id/api/download/dlmp3?apikey=gifted&url=${encodeURIComponent(videoUrl)}`);
            downloadUrl = response.data.result.download_url;
        } catch (err) {
            console.error("Error fetching download URL:", err);
            return reply("❌ Unable to fetch download URL. Please try again later.");
        }

        // Information Message
        const infoMessage = {
            image: { url: data.thumbnail },
            caption: `
╭──────❏ *EMPIRE_X DOWNLOADER* ❏
│ 𝙷𝙴𝙻𝙻𝙾 ${pushname || "User"}
│❏──────────────────────────────❏
│ *Title:* ${data.title}
│ *Quality:* mp3 (128kbps)
│ *Duration:* ${data.timestamp}
│ *Viewers:* ${data.views}
│ *Uploaded:* ${data.ago}
│ *Artist:* ${data.author.name}
│❏──────────────────────────────❏
│⦿ *Direct Yt Link:* ${videoUrl}
│❏──────────────────────────────❏
│ >Made By 𝐄𝐦𝐩𝐢𝐫𝐞 𝐓𝐞𝐜𝐡 [ 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫 ]
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⊷`,
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
                    body: 'Made By  𝐄𝐦𝐩𝐢𝐫𝐞 𝐓𝐞𝐜𝐡 [ 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫 ]',
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

//ytmp3doc commands 
cmd({
    pattern: "ytmp3doc",
    alias: ["ytmdoc"],
    desc: "Download songs as documents",
    category: "download",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, reply }) => {
    try {
        // Check for query
        if (!q) {
            return reply(`Please Enter a Search Query or YouTube link. Usage Example:\n*${config.PREFIX}ytmp4doc Spectre*\n*${config.PREFIX}ytmp4doc https://youtu.be/aGjXa18XCRY?si=-rNZHD-trThO1x4Y*`);
        }

        // If a YouTube link is provided
        if (q.startsWith("https://youtu")) {
            let downloadUrl;
            try {
                // Send the API request to fetch the download URL for the provided YouTube link
                let response = await axios.get(`https://api.giftedtech.web.id/api/download/dlmp3?apikey=gifted&url=${encodeURIComponent(q)}`);
                downloadUrl = response.data.result.download_url;

                // Download the audio
                const buffer = await axios.get(downloadUrl, { responseType: 'arraybuffer' });

                // Send the audio to the user as a document
                await conn.sendMessage(from, { 
                    document: buffer.data, 
                    mimetype: "audio/mp3", 
                    fileName: "song.mp3", 
                    contextInfo: {
                        forwardingScore: 5,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "120363337275149306@newsletter",
                            newsletterName: "Empire_X",
                            serverMessageId: 143
                        }
                    }
                }, { quoted: mek });
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
            let response = await axios.get(`https://api.giftedtech.web.id/api/download/dlmp3?apikey=gifted&url=${encodeURIComponent(videoUrl)}`);
            downloadUrl = response.data.result.download_url;
        } catch (err) {
            console.error("Error fetching download URL:", err);
            return reply("❌ Unable to fetch download URL. Please try again later.");
        }

         // Information Message
        const infoMessage = {
            image: { url: data.thumbnail },
            caption: `
╭──────❏ *EMPIRE_X DOWNLOADER* ❏
│ 𝙷𝙴𝙻𝙻𝙾 ${pushname || "User"}
│❏──────────────────────────────❏
│ *Title:* ${data.title}
│ *Quality:* mp3 (128kbps)
│ *Duration:* ${data.timestamp}
│ *Viewers:* ${data.views}
│ *Uploaded:* ${data.ago}
│ *Artist:* ${data.author.name}
│❏──────────────────────────────❏
│⦿ *Direct Yt Link:* ${videoUrl}
│❏──────────────────────────────❏
│ >Made By 𝐄𝐦𝐩𝐢𝐫𝐞 𝐓𝐞𝐜𝐡 [ 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫 ]
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⊷`,
            contextInfo: {
                mentionedJid: [mek.sender],
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363337275149306@newsletter",
                    newsletterName: "Empire_X",
                    serverMessageId: 143
                }
            }
        };

        await conn.sendMessage(from, infoMessage, { quoted: mek });

        // Send the audio file as a document
        await conn.sendMessage(from, {
            document: { url: downloadUrl },
            fileName: `${data.title}.mp3`,
            mimetype: "audio/mpeg",
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    title: data.title,
                    body: "Powered by Empire_X",
                    thumbnailUrl: data.thumbnail,
                    sourceUrl: config.channelUrl,
                    mediaType: 1,
                    renderLargerThumbnail: false
                },
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363337275149306@newsletter",
                    newsletterName: "Empire_X",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        await m.react("✅");
    } catch (e) {
        console.error("Error in ytmp4doc command:", e);
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
                let response = await axios.get(`https://api.giftedtech.web.id/api/download/dlmp4?apikey=gifted&url=${encodeURIComponent(q)}`);
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
            let response = await axios.get(`https://api.giftedtech.web.id/api/download/dlmp4?apikey=gifted&url=${encodeURIComponent(videoUrl)}`);
            downloadUrl = response.data.result.download_url;
        } catch (err) {
            console.error("Error fetching download URL:", err);
            return reply("❌ Unable to fetch download URL. Please try again later.");
        }

        // Information Message
        const infoMessage = {
            image: { url: data.thumbnail },
            caption: `
╭──────❏ *EMPIRE_X DOWNLOADER* ❏
│ 𝙷𝙴𝙻𝙻𝙾 ${pushname || "User"}
│❏──────────────────────────────❏
│ *Title:* ${data.title}
│ *Quality:* mp4 (720p)
│ *Duration:* ${data.timestamp}
│ *Viewers:* ${data.views}
│ *Uploaded:* ${data.ago}
│ *Artist:* ${data.author.name}
│❏──────────────────────────────❏
│⦿ *Direct Yt Link:* ${videoUrl}
│❏──────────────────────────────❏
│ >Made By 𝐄𝐦𝐩𝐢𝐫𝐞 𝐓𝐞𝐜𝐡 [ 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫 ]
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⊷`,
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
                    body: 'Made By  𝐄𝐦𝐩𝐢𝐫𝐞 𝐓𝐞𝐜𝐡 [ 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫 ]',
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

//ytmp4doc commands 
cmd({
    pattern: "ytmp4doc",
    alias: ["mp4doc"],
    desc: "Download videos and send as document",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, reply }) => {
    try {
        // Check for query
        if (!q) {
            return reply(`Please Enter a Search Query or YouTube link. Usage Example:\n*${config.PREFIX}ytmp4doc Spectre*\n*${config.PREFIX}ytmp4doc https://youtu.be/aGjXa18XCRY?si=-rNZHD-trThO1x4Y*`);
        }

        // If a YouTube link is provided
        if (q.startsWith("https://youtu")) {
            let downloadUrl;
            try {
                // Send the API request to fetch the download URL for the provided YouTube link (MP4)
                let response = await axios.get(`https://api.giftedtech.web.id/api/download/dlmp4?apikey=gifted&url=${encodeURIComponent(q)}`);
                downloadUrl = response.data.result.download_url;

                // Download the video
                const buffer = await axios.get(downloadUrl, { responseType: "arraybuffer" });

                // Send the video to the user as a document
                await conn.sendMessage(from, {
                    document: buffer.data,
                    mimetype: "video/mp4",
                    fileName: "video.mp4",
                    contextInfo: {
                        forwardingScore: 5,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "120363337275149306@newsletter",
                            newsletterName: "Empire_X",
                            serverMessageId: 143
                        }
                    }
                }, { quoted: mek });
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
            caption: `
╭──────❏ *EMPIRE_X DOWNLOADER* ❏
│ 𝙷𝙴𝙻𝙻𝙾 ${pushname || "User"}
│❏──────────────────────────────❏
│ *Title:* ${data.title}
│ *Quality:* mp4 (720p)
│ *Duration:* ${data.timestamp}
│ *Viewers:* ${data.views}
│ *Uploaded:* ${data.ago}
│ *Artist:* ${data.author.name}
│❏──────────────────────────────❏
│⦿ *Direct Yt Link:* ${videoUrl}
│❏──────────────────────────────❏
│ >Made By 𝐄𝐦𝐩𝐢𝐫𝐞 𝐓𝐞𝐜𝐡 [ 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫 ]
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⊷`,
            contextInfo: {
                mentionedJid: [mek.sender],
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363337275149306@newsletter",
                    newsletterName: "Empire_X",
                    serverMessageId: 143
                }
            }
        };

        await conn.sendMessage(from, infoMessage, { quoted: mek });

        // Send the video file as a document
        await conn.sendMessage(from, {
            document: { url: downloadUrl },
            fileName: `${data.title}.mp4`,
            mimetype: "video/mp4",
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    title: data.title,
                    body: "Powered by Empire_X",
                    thumbnailUrl: data.thumbnail,
                    sourceUrl: config.channelUrl,
                    mediaType: 2, // video
                    renderLargerThumbnail: false
                },
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363337275149306@newsletter",
                    newsletterName: "Empire_X",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        await m.react("✅");
    } catch (e) {
        console.error("Error in ytmp4doc command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

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
╭──❏ *EMPIRE_X DOWNLOADER* ❏
│ 𝙷𝙴𝙻𝙻𝙾 ${pushname || "User"}
│❏────────────────────❏
│ *Title*: ${title}
│ **Author*: ${authorName}
│ *Duration*: ${videoDetails.duration}s
│❏────────────────────❏
│>Made By 𝐄𝐦𝐩𝐢𝐫𝐞 𝐓𝐞𝐜𝐡 [ 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫 ]
╰━━━━━━━━━━━━━━━━━━━━⊷`
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

// Pinterest commands 
cmd({
    pattern: "pinterest",
    desc: "Download media from Pinterest.",
    category: "download",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        const pinterestUrl = args[0];
        if (!pinterestUrl) {
            return reply("Please provide the Pinterest media URL.");
        }

        // Send the API request to fetch the download URL
        const response = await axios.get(`https://api.giftedtech.web.id/api/download/pinterestdl?apikey=gifted&url=${encodeURIComponent(pinterestUrl)}`);
        const downloadUrl = response.data.result.url;

        if (!downloadUrl) {
            return reply("❌ Unable to fetch the Pinterest media. Please check the URL and try again.");
        }

        // Send the media to the user
        await conn.sendMessage(m.from, {
            image: { url: downloadUrl },
            caption: "Downloaded Pinterest Image",
        });
        await m.react("✅");
    } catch (err) {
        console.error("Error fetching Pinterest media URL:", err);
        return reply("❌ Unable to fetch Pinterest media. Please try again later.");
    }
});
