const { exec } = require('child_process');
const { cmd } = require('../command');

cmd({
    pattern: "updatebot",
    react: "🔄",
    desc: "Update the bot from the GitHub repository",
    category: "main",
    use: '.update',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const repoUrl = 'https://github.com/efeurhobo/Demon_V1.git'; // GitHub repository link
        const targetFolder = 'bot'; // Folder for your bot to be updated

        // Check if the target folder exists and contains a git repository
        const gitCommand = `git -C ${targetFolder} pull origin main`; // Command to pull updates

        // Execute the git pull command
        exec(gitCommand, (err, stdout, stderr) => {
            if (err) {
                return reply(`*Error during update:* ${err.message}`); // Handle command execution errors
            }
            if (stderr) {
                return reply(`*Git error:* ${stderr}`); // Handle errors returned by Git
            }

            // If everything goes well, send the update confirmation message
            conn.sendMessage(from, { text: '*✅ Bot updated successfully from the repository!*' }, { quoted: mek });
        });
    } catch (error) {
        console.error("Error during bot update:", error);
        reply(`*Error during bot update:* ${error.message}`);
    }
});