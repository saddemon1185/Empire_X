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
    exec(text, (err, stdout) => reply(err ? `Error: ${err}` : stdout || 'No output.'));
});

// Eval command: Runs JS code on the server
cmd({
    pattern: "eval",
    category: "owner",
    filename: __filename,
    desc: "Runs JS code on server."
}, async (conn, mek, text, { isOwner, reply }) => {
    if (!isOwner) return reply('🚫 *You must be an Owner to use this command*');
    try {
        let result = await eval(`(async () => { ${text} })()`);
        reply(typeof result === 'object' ? JSON.stringify(result, null, 2) : result.toString());
    } catch (err) {
        reply(`Error: ${err}`);
    }
});