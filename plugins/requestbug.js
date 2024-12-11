const fs = require('fs');
const { cmd, commands } = require('../command');
const config = require('../config');

const prefix = config.PREFIX; // Ensure this is set in config.js

cmd({
    pattern: "requestbug",
    category: "misc",
    react: "🤕",
    desc: "Allows users to report a bug with a description.",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, body, sender, pushname, groupMetadata }) => {
    try {
        // Check if a bug description is provided
        const bugDescription = body.split(" ").slice(1).join(" "); // Get the bug description from the message (fix split index)

        if (!bugDescription) {
            // If no description is provided, send a prompt
            await conn.sendMessage(from, {
                text: `Use ${prefix}requestbug :\nExample: ${prefix}requestbug this command is not working.`,
            }, { quoted: mek });
            return;
        }

        // Read the developer's number from dev.json
        const devsData = fs.readFileSync('./lib/dev.json', 'utf8'); // Ensure to specify 'utf8' for string output
        const devsNumber = JSON.parse(devsData)[0]; // Access the first number in the array

        // Format the message to send to the devs, using the required output format
        const requestMessage = `
➲ *Need user requested:* @${sender.split('@')[0]}
➲ *Sent by:* ${pushname}
➲ *Report:* ${bugDescription}
`;

        // Send the bug report to the devs' number (set in dev.json)
        await conn.sendMessage(devsNumber + "@s.whatsapp.net", {
            text: requestMessage
        });

        // Confirm to the user that their bug report has been sent
        await conn.sendMessage(from, {
            text: `Thank you! Your bug report has been sent to the devs for review.`,
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, {
            text: `An error occurred while submitting the bug report. Please try again.`,
        }, { quoted: mek });
    }
});