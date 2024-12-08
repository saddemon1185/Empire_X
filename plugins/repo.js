const axios = require('axios');
const { cmd } = require('../command');

cmd({
  pattern: "repo",
  desc: "Fetch information about a GitHub repository",
  category: "main",
  react: "😊",
  filename: __filename,
}, async (conn, mek, m, { from, reply, args, bot }) => {
  try {
    // Default repository (your repository)
    const defaultRepo = 'efeurhobo/Demon_V1';

    // Use the provided repo or fallback to the default repo
    const repo = args && args[0] ? args[0] : defaultRepo;

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

    // Send the response message
    await bot.sendMessage(from, { text: info }, { quoted: mek });
  } catch (error) {
    console.error(error);
    reply(`Error fetching repository data: ${error.response?.data?.message || error.message}`);
  }
});
