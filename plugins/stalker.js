cmd({
    pattern: "telegramstalk",
    desc: "Fetch detailed Telegram user profile including profile picture.",
    category: "search",
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