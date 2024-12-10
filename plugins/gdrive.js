const axios = require('axios');
const { cmd, commands } = require('../command');

// Google Drive Downloader Command
cmd({
    pattern: "gdrive",
    desc: "Download Google Drive Files",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        // If no URL is provided, ask for it
        if (!q) {
            return reply("Please send me the Google Drive link.");
        }

        // If URL is provided, fetch the file data from the API
        const url = q.trim();
        const apiUrl = `https://api.nexoracle.com/downloader/gdrive?apikey=ae1fa2a45a76baba7d&url=${encodeURIComponent(url)}`;

        // Fetch Google Drive file data from the API
        const response = await axios.get(apiUrl);

        if (!response.data || !response.data.result || !response.data.result.downloadUrl) {
            return reply("Sorry, I couldn't fetch the file. Make sure the link is valid.");
        }

        const fileData = response.data.result;

        // Send the Google Drive file
        await conn.sendMessage(from, {
            document: { url: fileData.downloadUrl },
            mimetype: fileData.mimetype,
            fileName: fileData.fileName,
        }, { quoted: mek });

        // Optionally, send the confirmation message after the file is sent
        setTimeout(async () => {
            await conn.sendMessage(from, { text: "Here is your Google file made by Empire_X" }, { quoted: mek });
        }, 5000); // Wait for 5 seconds before sending the message

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message || e.response?.data?.error || e}`);
    }
});