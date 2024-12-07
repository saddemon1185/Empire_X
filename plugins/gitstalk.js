const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
  pattern: 'gitstalk',
  desc: 'Fetch detailed GitHub user profile including profile picture.',
  category: 'other',
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
