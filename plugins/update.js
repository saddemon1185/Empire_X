const fs = require('fs');
const { exec } = require('child_process');
const { cmd } = require('../command');

cmd({
    pattern: "updatebot",
    react: "🔄",
    desc: "Update folder from GitHub",
    category: "main",
    use: '.update',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const repoUrl = 'https://github.com/efeurhobo/Demon_V1.git'; // GitHub repository link
        const targetFolder = 'plugins'; // Folder to be updated

        // Check if the target folder exists
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder, { recursive: true }); // Create folder if it doesn't exist
        }

        // Determine the git command
        const gitCommand = fs.existsSync(`${targetFolder}/.git`)
            ? `git -C ${targetFolder} pull origin main` // Pull latest changes
            : `git clone ${repoUrl} ${targetFolder}`; // Clone repository if .git does not exist

        // Execute the git command
        await new Promise((resolve, reject) => {
            exec(gitCommand, (err, stdout, stderr) => {
                if (err) {
                    return reject(new Error(`Git command failed: ${stderr || err.message}`));
                }
                resolve(stdout.trim());
            });
        });

        // Send success message
        await conn.sendMessage(from, { text: '*✅ Update completed successfully!*' }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply(`*Error during update:* ${error.message}`);
    }
});
