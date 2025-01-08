cmd({
    pattern: "tgstalker",
    desc: "Fetch detailed Telegram user profile including profile picture.",
    category: "stalker",
    react: "📚",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a Telegram username.");
        }

        const apiUrl = `https://api.nexoracle.com/stalking/telegram-user?apikey=MepwBcqIM0jYN0okD&user=${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data.result;

        let userInfo = `     👨‍💻*Empire_X TELEGRAM STALK*👨‍💻
        
👤 *ᴜꜱᴇʀɴᴀᴍᴇ*: ${data.name}

📝 *ʙɪᴏ*: ${data.bio || 'Not available'}

📱 *ᴜsᴇʀɴᴀᴍᴇ*: ${data.username}

📅 *ᴅᴀᴛᴇ ᴊᴏɪɴᴇᴅ*: ${new Date().toDateString()}

*MADE ♥ BY Empire_X*
`;

        await conn.sendMessage(from, { image: { url: data.photo }, caption: userInfo }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching data🤕: ${e.response ? e.response.data.message : e.message}`);
    }
});

cmd({
    pattern: "whatsappstalker",
    desc: "Fetch detailed WhatsApp channel profile including profile picture.",
    category: "stalker",
    react: "📚",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const url = args[0];
        if (!url) {
            return reply("Please provide a WhatsApp channel URL.");
        }

        const apiUrl = `https://api.nexoracle.com/stalking/whatsapp-channel?apikey=MepwBcqIM0jYN0okD&url=${url}`;
        const response = await axios.get(apiUrl);
        const data = response.data.result;

        let channelInfo = `     👨‍💻*Empire_X WHATSAPP STALK*👨‍💻
        
📢 *Channel Title*: ${data.title}

📝 *Description*: ${data.description || 'No description available'}

👥 *Followers*: ${data.followers}

🔗 *Channel URL*: ${url}

*MADE ♥ BY Empire_X*
`;

        await conn.sendMessage(from, { image: { url: data.img }, caption: channelInfo }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching data🤕: ${e.response ? e.response.data.message : e.message}`);
    }
});

cmd({
    pattern: "tiktokstalk",
    desc: "Fetch detailed TikTok user profile including profile picture.",
    category: "stalker",
    react: "📚",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a TikTok username.");
        }

        const apiUrl = `https://api.nexoracle.com/stalking/tiktok-user2?apikey=MepwBcqIM0jYN0okD&user=${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data.result;

        let userInfo = `     👨‍💻*Empire_X TIKTOK STALK*👨‍💻
        
👤 *Nickname*: ${data.nickname || 'Not available'}

🔗 *TikTok Username*: ${data.username}

🎥 *Videos Posted*: ${data.videoCount}

👥 *Followers*: ${data.followerCount} | Following: ${data.followingCount}

💖 *Hearts*: ${data.heartCount}

🔐 *TikTok User ID*: ${data.id}

*MADE ♥ BY Empire_X*
`;

        await conn.sendMessage(from, { image: { url: data.avatarLarger }, caption: userInfo }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching data🤕: ${e.response ? e.response.data.message : e.message}`);
    }
});