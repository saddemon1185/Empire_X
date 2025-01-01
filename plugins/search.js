const axios = require('axios');
const fg = require('api-dylux');
const config = require('../config');
const { cmd, commands } = require('../command');
const prefix = config.PREFIX; 
const caption = config.CAPTION; 
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions');
const TIMEZONE = "Africa/Lagos";  // Define the timezone constant timezone

const GOOGLE_API_KEY = 'AIzaSyDebFT-uY_f82_An6bnE9WvVcgVbzwDKgU'; // Replace with your Google API key
const GOOGLE_CX = '45b94c5cef39940d1'; // Replace with your Google Custom Search Engine ID


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

// GitHub Stalker Command

cmd({
    pattern: "gitstalk",
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
        // Validate the URL format
        const regexMatch = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!regexMatch) {
            reply("Empire_X says: Invalid GitHub URL format.");
            return;
        }
        
        const [, username, repoName] = regexMatch;
        const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);

        if (response.status === 200) {
            const repoData = response.data;

            // Fallback description
            const description = repoData.description || "No description available";

            // Format the repository information
            const repoInfo = {
                caption: `
╭━━━▻〔 *Empire_X REPOSITORY DETAILS* 〕━━━━⬤
┃𖠄╭────────────────────·๏
┃𖠄┃• *Repository Name:* ${repoData.name}
┃𖠄┃• *Description:* ${description}
┃𖠄┃• *Owner:* ${repoData.owner.login}
┃𖠄┃• *Stars:* ${repoData.stargazers_count}
┃𖠄┃• *Forks:* ${repoData.forks_count}
┃𖠄┃• *URL:* ${repoData.html_url}
┃𖠄└────────────────────·๏
┃𖠄╭────────────────────·๏
┃𖠄┃ *Session:* https://empire-x-paircode.onrender.com
┃𖠄┃ *Join Us:*
┃𖠄┃ - Group: https://chat.whatsapp.com/HnrCOlPdtH1AvhxIroMH90
┃𖠄┃ - Channel: https://whatsapp.com/channel/0029VajVvpQIyPtUbYt3Oz0k
┃𖠄┃ *Deploy:* _Deploy Empire_x Now_
┃𖠄└────────────────────·๏
╰━━━━━━━━━━━━━━━━━━━━━⬤
                `.trim()

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


cmd({
   pattern: "iswa",
   category: "search",
   desc: "Searches in given range about given number.",
   use: "23480785826xx",
   filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
   const text = m.text; // Get the command text from the message
   const inputnumber = text.split(" ")[0];
   if (!inputnumber.includes("x")) return reply("You did not add x\nExample: iswa 23480785826xx");

   reply("Searching for WhatsApp account in given range...");

   const countInstances = (string, word) => string.split(word).length - 1;
   const [number0, number1] = inputnumber.split("x");
   const randomLength = countInstances(inputnumber, "x");

   let randomxx;
   if (randomLength === 1) randomxx = 10;
   else if (randomLength === 2) randomxx = 100;
   else if (randomLength === 3) randomxx = 1000;

   let textOutput = `*--『 List of Whatsapp Numbers 』--*\n\n`;
   let noBio = `\n*Bio:* || \nHey there! I am using WhatsApp.\n`;
   let noWhatsapp = `\n*Numbers with no WhatsApp account within provided range.*\n`;

   for (let i = 0; i < randomxx; i++) {
     const nu = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
     const status1 = nu[Math.floor(Math.random() * nu.length)];
     const status2 = nu[Math.floor(Math.random() * nu.length)];
     const status3 = nu[Math.floor(Math.random() * nu.length)];
     const random = randomLength === 1 ? `${status1}` : randomLength === 2 ? `${status1}${status2}` : `${status1}${status2}${status3}`;

     const anu = await conn.onWhatsApp(`${number0}${i}${number1}@s.whatsapp.net`);
     if (anu.length !== 0) {
       const anu1 = await conn.fetchStatus(anu[0].jid).catch(() => "401");
       if (anu1 === "401" || !anu1.status) {
         noBio += `wa.me/${anu[0].jid.split("@")[0]}\n`;
       } else {
         textOutput += `🧐 *Number:* wa.me/${anu[0].jid.split("@")[0]}\n ✨*Bio:* ${anu1.status}\n🍁*Last update:* ${moment(anu1.setAt).tz(TIMEZONE).format("HH:mm:ss DD/MM/YYYY")}\n\n`;
       }
     } else {
       noWhatsapp += `${number0}${i}${number1}\n`;
     }
   }

   return reply(`${textOutput}${noBio}${noWhatsapp}`);
});