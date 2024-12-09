const axios = require('axios');
const fg = require('api-dylux');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
  pattern: 'gitstalk',
  desc: 'Fetch detailed GitHub user profile including profile picture.',
  category: 'main',
  react: '📚',
  filename: __filename
}, async (message, chat, pluginData, {
  from: userId,
  quoted,
  body,
  isCmd,
  command,
  args,
  reply
}) => {
  try {
    const username = args[0];
    if (!username) {
      return reply('Please provide a GitHub username.');
    }

    const url = `https://api.github.com/users/${username}`;
    const response = await axios.get(url);
    const user = response.data;

    let userDetails = `
      *│  ◦*🔗 *GitHub URL*: (${user.html_url})
      *│  ◦*📝 *Bio*: ${user.bio || 'Not available'}
      *│  ◦*🏙️ *Location*: ${user.location || 'Not available'}
      *│  ◦*👥 *Followers*: ${user.followers}
      *│  ◦*📊 *Public Repos*: ${user.public_repos}
      *│  ◦*🔭 *Public Gists*: ${user.public_gists}
      *│  ◦*📅 *Created At*: ${new Date(user.created_at).toDateString()}
      *│  ◦*Following: ${user.following}
      
      *Made with ❤️ by Demon_V1*
    `;

    await message.sendMessage(userId, {
      image: { url: user.avatar_url },
      caption: userDetails
    }, { quoted });

  } catch (error) {
    console.log(error);
    reply('Error fetching data 🤕: ' + (error.response ? error.response.data.message : error.message));
  }
});

//gitclone codes 
cmd({
    pattern: "gitclone",
    desc: "Clone GitHub Repositories",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Send me the GitHub repository URL");
        
        const repoUrl = q;
        const apiUrl = `https://api.giftedtech.my.id/api/download/gitclone?apikey=gifted&url=${repoUrl}`;

        // Send a message with repository information
        let desc = `
🌟 *Empire_X GITHUB CLONER* 🌟

Cloning Repository: ${repoUrl}
        `;
        await conn.sendMessage(from, { text: desc }, { quoted: mek });

        // Download and send the cloned repository
        await conn.sendMessage(from, {
            document: { url: apiUrl },
            mimetype: "application/zip",
            fileName: `${repoUrl.split("/").pop()}.zip`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
