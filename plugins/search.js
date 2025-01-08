const axios = require('axios');
const fg = require('api-dylux');
const config = require('../config');
const { cmd, commands } = require('../command');
const prefix = config.PREFIX; 
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions');

// Wallpaper Command
cmd({
    pattern: "wallpaper",
    desc: "Search and send wallpapers based on a query.",
    react: "🖼️",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a search query for the wallpaper.");

        // Fetch wallpaper URLs from the NexOracle API
        const searchQuery = encodeURIComponent(q);
        const url = `https://api.nexoracle.com/search/wallpaper?apikey=MepwBcqIM0jYN0okD&q=${searchQuery}`;
        
        const response = await axios.get(url);
        const data = response.data;

        if (data.status !== 200 || !data.result || data.result.length === 0) {
            return reply("No wallpapers found for your query.");
        }

        // Send wallpapers
        for (let i = 0; i < data.result.length; i++) {
            const wallpaper = data.result[i];
            const wallpaperUrl = wallpaper.image;
            const source = wallpaper.source;
            const type = wallpaper.type;

            // Download the wallpaper image
            const imageResponse = await axios.get(wallpaperUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(imageResponse.data, 'binary');

            // Send the wallpaper with a caption
            await conn.sendMessage(from, {
                image: buffer,
                caption: `
*💗Wallpaper ${i + 1} from your search!💗*

*Type*: ${type}
*Source*: [${source}](${source})

> 🌈*Empire_X*`
            }, { quoted: mek });
        }

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
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
    pattern: "weather",
    desc: "🌤 Get weather information for a location",
    react: "🌤",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❗ Please provide a city name. Usage: .weather [city name]");
        const apiKey = '2d61a72574c11c4f36173b627f8cb177'; 
        const city = q;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;
        const weather = `
🌍 *Weather Information for ${data.name}, ${data.sys.country}* 🌍
🌡️ *Temperature*: ${data.main.temp}°C
🌡️ *Feels Like*: ${data.main.feels_like}°C
🌡️ *Min Temp*: ${data.main.temp_min}°C
🌡️ *Max Temp*: ${data.main.temp_max}°C
💧 *Humidity*: ${data.main.humidity}%
☁️ *Weather*: ${data.weather[0].main}
🌫️ *Description*: ${data.weather[0].description}
💨 *Wind Speed*: ${data.wind.speed} m/s
🔽 *Pressure*: ${data.main.pressure} hPa

*Made By Only_one_🥇Empire*
`;
        return reply(weather);
    } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 City not found. Please check the spelling and try again.");
        }
        return reply("⚠️ An error occurred while fetching the weather information. Please try again later.");
    }
});

cmd({
    pattern: "dictionary",
    desc: "📚 Get the definition of a word",
    react: "🔍",
    category: "search",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) {
            return reply("❗ Please provide a word to define. Usage: .dictionary [word]");
        }

        const word = q.trim();
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

        const response = await axios.get(url);
        const definitionData = response.data[0];

        const definition = definitionData.meanings[0].definitions[0].definition || "No definition available";
        const example = definitionData.meanings[0].definitions[0].example || "No example available";
        const synonyms = definitionData.meanings[0].definitions[0].synonyms?.join(', ') || "No synonyms available";

        const wordInfo = `
📚 *Word*: ${definitionData.word}
🔍 *Definition*: ${definition}
📝 *Example*: ${example}
🔗 *Synonyms*: ${synonyms}

*MADE By 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐄𝐦𝐩𝐢𝐫𝐞*`;

        return reply(wordInfo);
    } catch (e) {
        console.error(e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 Word not found. Please check the spelling and try again.");
        }
        return reply("⚠️ An error occurred while fetching the definition. Please try again later.");
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

        // Fetch image URLs from the new API
        const searchQuery = encodeURIComponent(q);
        const url = `https://api.nexoracle.com/search/google-image?apikey=MepwBcqIM0jYN0okD&q=${searchQuery}`;
        
        const response = await axios.get(url);
        const data = response.data;

        if (data.status !== 200 || !data.result || data.result.length === 0) {
            return reply("No images found for your query.");
        }

        // Send images
        for (let i = 0; i < data.result.length; i++) {
            const imageUrl = data.result[i];

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