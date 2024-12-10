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

        // Check if the target folder exists, if not create it
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder, { recursive: true });
        }

        // Determine the git command
        const gitCommand = fs.existsSync(`${targetFolder}/.git`)
            ? `git -C ${targetFolder} pull origin main` // Pull latest changes if repo exists
            : `git clone ${repoUrl} ${targetFolder}`; // Clone repository if not

        // Execute the git command
        await new Promise((resolve, reject) => {
            exec(gitCommand, (err, stdout, stderr) => {
                if (err || stderr) {
                    return reject(new Error(`Git command failed: ${stderr || err.message}`));
                }
                resolve(stdout.trim());
            });
        });

        // Send success message
        await conn.sendMessage(from, { text: '*✅ Update completed successfully!*' }, { quoted: mek });

    } catch (error) {
        console.error("Error during update:", error);
        reply(`*Error during update:* ${error.message}`);
    }
});