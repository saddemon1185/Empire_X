const axios = require('axios');
const { cmd } = require('../command');

// TikTok Video Downloader Command
cmd({
    pattern: "tiktok",
    desc: "Download TikTok Videos",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) return reply("Please send me the TikTok URL.");

        const tiktokUrl = encodeURIComponent(q.trim());
        if (!/^https?:\/\/www\.tiktok\.com/.test(q)) {
            return reply("Please enter a valid TikTok URL starting with https://www.tiktok.com.");
        }

        // Axios options to fetch the video URL
        const options = {
            method: 'GET',
            url: 'https://tiktok-videos-without-watermark.p.rapidapi.com/getVideo',
            params: { url: tiktokUrl },
            headers: {
                'x-rapidapi-key': 'dc3a3dca06msh47756334a0558a2p102b06jsn201858f0f222',
                'x-rapidapi-host': 'tiktok-videos-without-watermark.p.rapidapi.com'
            }
        };

        // Fetch the video URL
        const response = await axios.request(options);
        const videoUrl = response.data; // The video URL should be returned here

        if (!videoUrl) {
            return reply("Sorry, I couldn't fetch the video. Please check the URL.");
        }

        // Send the TikTok video to the user
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