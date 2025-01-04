const { cmd } = require('../command');
const { exec } = require("child_process");

cmd({
    pattern: "eval",
    category: "owner",
    desc: "Runs JavaScript code on the node server.",
    filename: __filename,
},
async (conn, mek, m, { text, isOwner, reply }) => {
    if (!isOwner) return reply('🚫 *You must be an Owner to use this command*');
    try {
        // Evaluate the provided JavaScript code
        let resultTest = await eval(`(async () => { ${text} })()`);
        
        // Send result back to the user
        if (typeof resultTest === "object") {
            return reply(JSON.stringify(resultTest, null, 2));
        } else {
            return reply(resultTest.toString());
        }
    } catch (err) {
        return reply(`Error: ${err.message}`);
    }
});

cmd({
    pattern: "shell",
    category: "owner",
    desc: "Runs commands in the server shell.",
    filename: __filename,
},
async (conn, mek, m, { text, isOwner, reply }) => {
    if (!isOwner) return reply('🚫 *You must be an Owner to use this command*');
    
    if (!text) return reply("Please provide a shell command to execute.");
    
    exec(text, (err, stdout, stderr) => {
        if (err) {
            return reply(`Error:\n${err.message}`);
        }
        if (stderr) {
            return reply(`Stderr:\n${stderr}`);
        }
        if (stdout) {
            return reply(`Output:\n${stdout}`);
        }
    });
});