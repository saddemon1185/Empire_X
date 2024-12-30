const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "Bible",
    desc: "Fetch a Bible verse",
    category: "ai",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) {
            return reply("Please provide the Bible verse reference. Example:\n.bible John 3:16");
        }

        let response = await fetchJson(`https://xstro-api1-e3fa63d29cbe.herokuapp.com/api/bible?verse=${encodeURIComponent(q)}`);

        if (response && response.result) {
            return reply(`Here is your Bible verse:\n\n${response.result}`);
        } else {
            return reply("Sorry, I couldn't find the requested Bible verse.");
        }
    } catch (e) {
        console.log(e);
        return reply(`Error: ${e.message}`);
    }
});