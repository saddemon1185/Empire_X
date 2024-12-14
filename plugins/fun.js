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
