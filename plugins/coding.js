const { cmd, commands } = require('../command');
const axios = require('axios'); // Import axios
const deobfuscator = require('deobfuscator');

cmd({
    pattern: "obfuscate",
    desc: "Obfuscate your code using the given input.",
    category: "fun",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        // Check if the user provided code to obfuscate
        const code = args.join(" ");
        if (!code) {
            return reply("Please provide the code you want to obfuscate.");
        }

        // Send the API request to obfuscate the code
        const response = await axios.get(`https://api.giftedtech.my.id/api/tools/encrypt?apikey=gifted&code=${encodeURIComponent(code)}`);
        
        const encryptedCode = response.data.encrypted_code;

        if (!encryptedCode) {
            return reply("❌ Unable to obfuscate the code. Please try again.");
        }

        // Send the obfuscated (encrypted) code to the user
        return reply(`Here is your obfuscated code:\n\`\`\`javascript\n${encryptedCode}\n\`\`\``);
    } catch (err) {
        console.error("Error obfuscating the code:", err);
        return reply("❌ An error occurred while obfuscating the code. Please try again later.");
    }
});

cmd({
    pattern: "deobfuscate",
    desc: "Deobfuscate your code using the given input.",
    category: "fun",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        // Check if the user provided code to deobfuscate
        const code = args.join(" ");
        if (!code) {
            return reply("Please provide the code you want to deobfuscate.");
        }

        // Deobfuscate the code
        const deobfuscatedCode = deobfuscator.deobfuscate(code);

        if (!deobfuscatedCode) {
            return reply("❌ Unable to deobfuscate the code. Please try again.");
        }

        // Send the deobfuscated code to the user
        return reply(`Here is your deobfuscated code:\n\`\`\`javascript\n${deobfuscatedCode}\n\`\`\``);
    } catch (err) {
        console.error("Error deobfuscating the code:", err);
        return reply("❌ An error occurred while deobfuscating the code. Please try again later.");
    }
});
