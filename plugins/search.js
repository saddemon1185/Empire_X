const axios = require('axios');
const fg = require('api-dylux');
const config = require('../config');
const { cmd, commands } = require('../command');
const prefix = config.PREFIX; 
const caption = config.CAPTION; 
const axios = require('axios');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions');

const GOOGLE_API_KEY = 'AIzaSyDebFT-uY_f82_An6bnE9WvVcgVbzwDKgU'; // Replace with your Google API key
const GOOGLE_CX = '45b94c5cef39940d1'; // Replace with your Google Custom Search Engine ID


// GitHub Stalker Command

cmd({
    pattern: "githubstalk",
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "search",
    react: "📚",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a GitHub username.");
        }

        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `     👨‍💻*Empire_X GITSTALK*👨‍💻
        
👤 *ᴜꜱᴇʀ ɴᴀᴍᴇ*: ${data.name || data.login}

🔗 *ɢɪᴛʜᴜʙ ᴜʀʟ*:(${data.html_url})

📝 *ʙɪᴏ*: ${data.bio || 'Not available'}

🏙️ *ʟᴏᴄᴀᴛɪᴏɴ*: ${data.location || 'Unknown'}

📊 *ᴘᴜʙʟɪᴄ ʀᴇᴘᴏ*: ${data.public_repos}

👥 *ꜰᴏʟʟᴏᴡᴇʀꜱ*: ${data.followers} | Following: ${data.following}

📅 *ᴄʀᴇᴀᴛʀᴅ ᴅᴀᴛᴇ*: ${new Date(data.created_at).toDateString()}

🔭 *ᴘᴜʙʟɪᴄ ɢɪꜱᴛꜱ*: ${data.public_gists}

*MADE ♥ BY Empire_X*
`;

        await conn.sendMessage(from, { image: { url: data.avatar_url }, caption: userInfo }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching data🤕: ${e.response ? e.response.data.message : e.message}`);
    }
});

//ss commands 
cmd({
    pattern: "ss",
    desc: "Screenshot a website",
    category: "search", // Category updated to 'search'
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) return reply("Please send the website URL to screenshot.");

        const url = q.trim();
        if (!/^https?:\/\//.test(url)) {
            return reply("Please enter a valid URL starting with http:// or https://");
        }

        // Screenshot API endpoint with API key
        const screenshotApi = `https://api.giftedtech.my.id/api/tools/sstab?apikey=gifted&url=${encodeURIComponent(url)}`;

        // Fetch the screenshot
        const webimage = await axios.get(screenshotApi, { responseType: 'arraybuffer' });

        // Send the screenshot as an image without a caption
        await conn.sendMessage(from, {
            image: Buffer.from(webimage.data),
            mimetype: "image/png"
        }, { quoted: mek });

    } catch (e) {
        console.error(e.response?.data || e.message); // Log detailed error
        reply(`An error occurred: ${e.response?.data?.error || e.message}`);
    }
});
// repo commands 

cmd({
    pattern: "repo", 
    desc: "Fetch Empire_X repository details",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    const githubRepoURL = 'https://github.com/efeurhobo/Empire_X';

    try {
        // Validate that the URL is in the correct format
        const regexMatch = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!regexMatch) {
            reply("Empire_X says: Invalid GitHub URL format.");
            return;
        }
        
        const [, username, repoName] = regexMatch;
        const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);

        if (response.status === 200) {
            const repoData = response.data;

            // Handle null description and provide fallback
            const description = repoData.description || "No description available";

            // Format the repository information with the desired style
            let formattedInfo = `
╭─────────────❏ *REPOSITORY INFORMATION* ❏
│📂 Repository Name: ${repoData.name}
│📝 Description: ${description}
│👤 Owner: ${repoData.owner.login}
│⭐ Stars: ${repoData.stargazers_count}
│🍴 Forks: ${repoData.forks_count}
│🌐 URL: ${repoData.html_url}
│🏠 Session: https://empire-x-paircode.onrender.com
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━──⊷

╭────❏ *JOIN US* ❏
│📞 Group: https://chat.whatsapp.com/DLrFOwuOnLwDS5VLeCuxHe
│🤖 Channel: https://whatsapp.com/channel/0029VajVvpQIyPtUbYt3Oz0k
╰━━━━━━━━━━━━━━━━━━━━━━━━──⊷

╭────❏ *DEPLOY NOW* ❏
│_DEPLOY 𝐄𝐌𝐏𝐈𝐑𝐄_𝑋 NOW_
╰━━━━━━━━━━━━━━━━━━━━━━━━──⊷
`.trim();

            // Send the formatted information as a message
            await conn.sendMessage(from, { text: formattedInfo }, { quoted: mek });
        } else {
            reply("Empire_X says: Unable to fetch repository information.");
        }
    } catch (error) {
        // Log the full error message for debugging
        console.error("Error fetching repository data:", error.response || error.message || error);
        reply("Empire_X says: An error occurred while fetching repository information.");
    }
});

// Image Downloader Command
cmd({
    pattern: "img",
    desc: "Search and send images from Google.",
    react: "🖼️",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a search query for the image.");

        // Fetch image URLs from Google Custom Search API
        const searchQuery = encodeURIComponent(q);
        const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}&searchType=image&num=5`;
        
        const response = await axios.get(url);
        const data = response.data;

        if (!data.items || data.items.length === 0) {
            return reply("No images found for your query.");
        }

        // Send images
        for (let i = 0; i < data.items.length; i++) {
            const imageUrl = data.items[i].link;

            // Download the image
            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(imageResponse.data, 'binary');

            // Send the image with a footer
            await conn.sendMessage(from, {
                image: buffer,
                caption: `
*💗Image ${i + 1} from your search!💗*

 *Enjoy these images! 👾*

> 🌈*Empire_X`
}, { quoted: mek });
}

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
// Lyrics Downloader Command
cmd({
    pattern: "lyrics",
    desc: "Get lyrics of a song",
    category: "search",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) return reply("Please provide the song name to get the lyrics");

        // Define the search query (e.g., "faded")
        const query = q;

        // Construct the search URL for lyrics API
        const searchUrl = `https://api.giftedtech.my.id/api/search/lyrics?apikey=gifted&query=${query}`;

        // Fetch the lyrics from the API
        const response = await fetch(searchUrl);
        const data = await response.json();

        // Check if lyrics are available
        if (data && data.lyrics) {
            const lyrics = data.lyrics; // Get the lyrics of the song

            // Send the lyrics as a text message
            await conn.sendMessage(from, {
                text: `🎤 *Lyrics for: ${query}* 🎶\n\n${lyrics}`
            }, { quoted: mek });
        } else {
            reply("Sorry, no lyrics found for your query.");
        }

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

// iswa and nowa commands 
cmd({
    pattern: "iswa",
    category: "search",
    desc: "Searches in the given range about a provided number.",
    use: '23480785826xx',
    filename: __filename,
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        if (!m.text) return reply('Provide a number without the "+" sign. Example: .iswa 23480785826xx');
        
        const inputNumber = m.text.split(" ")[0];
        if (!inputNumber.includes('x')) {
            return reply(`*You did not add 'x'*\nExample: iswa 23480785826xx\n${caption}`);
        }

        reply(`*Searching for WhatsApp account in the given range...*\n${caption}`);

        const countInstances = (str, word) => str.split(word).length - 1;
        const numberBase = inputNumber.split('x')[0];
        const numberSuffix = inputNumber.split('x').slice(-1)[0] || '';
        const randomLength = countInstances(inputNumber, 'x');
        const range = [10, 100, 1000][randomLength - 1] || 0;

        let resultsText = `*--『 List of WhatsApp Numbers 』--*\n\n`;
        let noBioText = `\n*Bio:* ||\nHey there! I am using WhatsApp.\n`;
        let noWhatsAppText = `\n*Numbers with no WhatsApp account within the provided range.*\n`;

        for (let i = 0; i < range; i++) {
            const randomDigits = Array.from({ length: randomLength }, () => Math.floor(Math.random() * 10)).join('');
            const currentNumber = `${numberBase}${randomDigits}${numberSuffix}`;
            
            try {
                const waAccount = await conn.onWhatsApp(`${currentNumber}@s.whatsapp.net`);
                if (waAccount.length) {
                    const waStatus = await conn.fetchStatus(waAccount[0].jid).catch(() => null);
                    if (!waStatus || waStatus.status.length === 0) {
                        noBioText += `wa.me/${waAccount[0].jid.split("@")[0]}\n`;
                    } else {
                        resultsText += `🧐 *Number:* wa.me/${waAccount[0].jid.split("@")[0]}\n✨ *Bio:* ${waStatus.status}\n🍁 *Last Update:* ${moment(waStatus.setAt).format('HH:mm:ss DD/MM/YYYY')}\n\n`;
                    }
                } else {
                    noWhatsAppText += ` ≛ ${currentNumber}\n`;
                }
            } catch (e) {
                console.error(`Error checking WhatsApp account for ${currentNumber}:`, e);
                noWhatsAppText += ` ≛ ${currentNumber}\n`;
            }
        }

        return reply(`${resultsText}${noBioText}${noWhatsAppText}${caption}`);
    } catch (e) {
        console.error(e);
        return reply(`Error: ${e.message}`);
    }
});

cmd({
    pattern: "nowa",
    category: "search",
    desc: "Searches for WhatsApp accounts in the given range.",
    use: '23480785826xx',
    filename: __filename,
},
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        if (!m.text) return reply('Provide a number without the "+" sign. Example: .nowa 23480785826xx');
        
        const inputNumber = m.text.split(" ")[0];
        if (!inputNumber.includes('x')) {
            return reply(`*You did not add 'x' in the number.*\nExample: ${prefix}nowa 23480785826xx\n${caption}`);
        }

        reply(`*Searching for WhatsApp account in the given range...*\n${caption}`);

        const countInstances = (str, word) => str.split(word).length - 1;
        const numberBase = inputNumber.split('x')[0];
        const numberSuffix = inputNumber.split('x').slice(-1)[0] || '';
        const randomLength = countInstances(inputNumber, 'x');
        const range = [10, 100, 1000][randomLength - 1] || 0;

        let noBioText = `\n*『 WhatsApp Account With No Bio 』*\n`;
        let noWhatsAppText = `*『 Numbers With No WhatsApp Account 』*\n\n`;

        for (let i = 0; i < range; i++) {
            const randomDigits = Array.from({ length: randomLength }, () => Math.floor(Math.random() * 10)).join('');
            const currentNumber = `${numberBase}${randomDigits}${numberSuffix}`;

            try {
                const waAccount = await conn.onWhatsApp(`${currentNumber}@s.whatsapp.net`);
                if (waAccount.length) {
                    const waStatus = await conn.fetchStatus(waAccount[0].jid).catch(() => null);
                    if (!waStatus || waStatus.status.length === 0) {
                        noBioText += `wa.me/${waAccount[0].jid.split("@")[0]}\n`;
                    }
                } else {
                    noWhatsAppText += ` ≛ ${currentNumber}\n`;
                }
            } catch (e) {
                console.error(`Error checking WhatsApp account for ${currentNumber}:`, e);
                noWhatsAppText += ` ≛ ${currentNumber}\n`;
            }
        }

        return reply(`${noBioText}${noWhatsAppText}${caption}`);
    } catch (e) {
        console.error(e);
        return reply(`Error: ${e.message}`);
    }
});
