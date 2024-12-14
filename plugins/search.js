const axios = require('axios');
const fg = require('api-dylux');
const config = require('../config');
const { cmd, commands } = require('../command');

// GitHub Stalker Command
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
      
      *Made with ❤️ by Empire_X*
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

// GitHub Cloner Command
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

// Screenshot Command
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
                text: `🌟 *By Empire_X`
            }, { quoted: mek });
        }, 2000); // Delay of 2 seconds

    } catch (e) {
        console.error(e.response?.data || e.message); // Log detailed error
        reply(`An error occurred: ${e.response?.data?.error || e.message}`);
    }
});
