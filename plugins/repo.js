const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
    pattern: "repo", 
    desc: "Fetch Empire_X repository details",
    category: "main",
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
│* _DEPLOY 𝐄𝐌𝐏𝐈𝐑𝐄_𝑋 NOW_*
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