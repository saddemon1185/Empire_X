const { exec } = require('child_process');
const { cmd } = require('../command');

// Shell command: Runs command in the server shell
cmd({
    pattern: "shell",
    category: "owner",
    filename: __filename,
    desc: "Runs command in server shell."
}, async (conn, mek, text, { isOwner, reply }) => {
    if (!isOwner) return reply('🚫 *You must be an Owner to use this command*');
    exec(text, (err, stdout, stderr) => {
        if (err) {
            return reply(`Error: ${err.message}`);
        }
        if (stderr) {
            return reply(`Stderr: ${stderr}`);
        }
        return reply(stdout || 'No output.');
    });
});

cmd({
    pattern: "eval",
    category: "owner",
    filename: __filename,
    desc: "Evaluate JavaScript code.",
}, async (conn, mek, text, { isOwner, reply }) => {
    if (!isOwner) return reply('🚫 *You must be an Owner to use this command*');
    try {
        let result = await eval(`(async () => { ${text} })()`);
        reply(typeof result === 'object' ? JSON.stringify(result, null, 2) : result.toString());
    } catch (err) {
        reply(`Error: ${err.message}`);
    }
});
