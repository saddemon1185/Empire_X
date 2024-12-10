const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ss",
    desc: "Screenshot a website",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) return reply("Please send the website URL to screenshot.");
        
        const url = q.trim();
        if (!/^https?:\/\//.test(url)) {
            return reply("Please enter a valid URL starting with http:// or https://");
        }

        // Screenshot API endpoint with API key, ensuring light mode
        const screenshotApi = `https://shot.screenshotapi.net/screenshot?token=JX5MFN7-S9AM3HB-HBFEQ00-6BPYHR6&full_page=true&url=${encodeURIComponent(url)}&fresh=true&output=image&file_type=png&dark_mode=false&wait_for_event=load&delay=2000`;

        // Fetch the screenshot
        const webimage = await axios.get(screenshotApi, { responseType: 'arraybuffer' });

        // Send the screenshot as an image first
        await conn.sendMessage(from, {
            image: Buffer.from(webimage.data),
            mimetype: "image/png"
        }, { quoted: mek });

        // Wait for 2 seconds and send the caption
        setTimeout(async () => {
            await conn.sendMessage(from, {
                text: `🌟 *Website Screenshot* 🌟\n\n©️By Empire_X`
            }, { quoted: mek });
        }, 2000); // Delay of 2 seconds

    } catch (e) {
        console.error(e.response?.data || e.message); // Log detailed error
        reply(`An error occurred: ${e.response?.data?.error || e.message}`);
    }
});