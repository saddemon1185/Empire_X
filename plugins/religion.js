const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions'); // Importing fetchJson

cmd({
    pattern: "Bible",
    desc: "Fetch a Bible verse",
    category: "ai",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Ensure the message text exists and extract the verse query
        const q = m.text && m.text.split(' ').slice(1).join(' '); // Get the verse query after the command

        // If no verse is provided
        if (!q) {
            return reply(`Please Use Example: ${prefix}Bible John 3:16`);
        }

        // Fetching the Bible verse using fetchJson
        let response = await fetchJson(`https://xstro-api1-e3fa63d29cbe.herokuapp.com/api/bible?verse=${encodeURIComponent(q)}`);

        // Handling the response
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