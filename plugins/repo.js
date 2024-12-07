const axios = require('axios');
const { cmd } = require('../command');

cmd({
  pattern: 'repo',
  desc: 'Fetch information about a GitHub repository.',
  category: 'other',
  react: '🍃',
  filename: __filename,
}, async (bot, message, args, extra) => {
  const { reply, from } = extra;

  try {
    // Default repository
    const defaultRepo = 'efeurhobo/Demon_V1';

    // Use the provided repo or fallback to the default repo
    const repo = args[0] || defaultRepo;

    // GitHub API URL
    const apiUrl = `https://api.github.com/repos/${repo}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    const info = `
📁 *GITHUB REPOSITORY INFO*
📌 *Name:* ${data.name}
📝 *Description:* ${data.description || 'No description available'}
⭐ *Stars:* ${data.stargazers_count}
🍴 *Forks:* ${data.forks_count}
🔗 *URL:* ${data.html_url}
    `.trim();

    await bot.sendMessage(from, { text: info }, { quoted: message });
  } catch (error) {
    console.error(error);
    reply(`Error fetching repository data: ${error.message}`);
  }
});
