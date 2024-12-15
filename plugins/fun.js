const { cmd, commands } = require('../command');
const { sleep } = require('../lib/functions');
const msg = require('../lib/msg');

cmd({
    pattern: "hack",
    desc: "Hacking prank",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Prank messages
        const messages = [
            "HAKI Injecting Malware",
            " █ 10%",
            " █ █ 20%",
            " █ █ █ 30%",
            " █ █ █ █ 40%",
            " █ █ █ █ █ 50%",
            " █ █ █ █ █ █ 60%",
            " █ █ █ █ █ █ █ 70%",
            " █ █ █ █ █ █ █ █ 80%",
            " █ █ █ █ █ █ █ █ █ 90%",
            "System hijacking on process.. \\n Connecting to Server error to find 404 ",
            "Device successfully connected... \\n Receiving data...",
            "Data hijacked from device 100% completed \\n Killing all evidence, killing all malware...",
            "HACKING COMPLETED",
            "SENDING LOG DOCUMENTS...",
            "SUCCESSFULLY SENT DATA AND Connection disconnected",
            "BACKLOGS CLEARED"
        ];

        let editedMessage;
        for (const message of messages) {
            editedMessage = await conn.sendMessage(from, { text: message }, { quoted: mek });
            await new Promise(resolve => setTimeout(resolve, 1000)); // Delay between messages
            await conn.sendMessage(from, { text: message }, { quoted: mek, edit: editedMessage.key });
        }

    } catch (e) {
        console.log(e);
        await reply(`❌ An error occurred: ${e}`);
    }
});

//rizz command's 
cmd({
    pattern: "rizz",
    desc: "Get a random pickup line",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Fetch a random pickup line from the API
        let data = await fetchJson(`https://api.giftedtech.my.id/api/fun/pickupline?apikey=gifted`);
        
        // Reply with the pickup line
        return reply(`${data.result}`);
    } catch (e) {
        console.log(e); // Log any error for debugging
        reply(`Error: ${e.message}`);
    }
});

// motivational commands

cmd({
    pattern: "motivation",
    desc: "Get a motivational quote",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Fetch a motivational quote from the API
        let data = await fetchJson(`https://api.giftedtech.my.id/api/fun/motivation?apikey=gifted`);
        
        // Reply with the motivational quote
        return reply(`${data.result}`);
    } catch (e) {
        console.log(e); // Log any error for debugging
        reply(`Error: ${e.message}`);
    }
});

//jokes commands 
cmd({
    pattern: "jokes",
    desc: "Get a random joke",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Fetch a random joke from the API
        let data = await fetchJson(`https://api.giftedtech.my.id/api/fun/jokes?apikey=gifted`);
        
        // Reply with the joke
        return reply(`${data.result}`);
    } catch (e) {
        console.log(e); // Log any error for debugging
        reply(`Error: ${e.message}`);
    }
});