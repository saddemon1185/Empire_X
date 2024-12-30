const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions'); // Assuming fetchJson is a wrapper around axios

cmd({
    pattern: "Bible",
    desc: "Fetch a Bible verse",
    category: "ai",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) {
            return reply(`Please provide a Bible verse to fetch. Example: ${prefix}Bible John 3:16`);
        }

        // Fetching data from the API using fetchJson
        let response = await fetchJson(`https://xstro-api1-e3fa63d29cbe.herokuapp.com/api/bible?verse=${encodeURIComponent(q)}`);

        // Pretty-printing the text from the response
        if (response && response.success) {
            return reply(`Here is your Bible verse:\n\n${response.text.trim()}`);
        } else {
            return reply("Sorry, I couldn't find the requested Bible verse.");
        }
    } catch (e) {
        console.log(e);
        return reply(`Error: ${e.message}`);
    }
});