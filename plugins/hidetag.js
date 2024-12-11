const { cmd, commands } = require('../command');
const config = require('../config'); // Assuming your config file is in the parent directory

const prefix = config.PREFIX; // Get the prefix from the config

cmd({
    pattern: "hidetag",
    category: "group",
    desc: "Tags every person in the group without showing the sender's name.",
    filename: __filename,
}, async (conn, mek, m, { 
    from, 
    quoted, 
    body, 
    isCmd, 
    command, 
    args, 
    q, 
    isGroup, 
    sender, 
    senderNumber, 
    botNumber, 
    pushname, 
    groupMetadata, 
    participants, 
    groupAdmins, 
    isBotAdmins, 
    isAdmins, 
    reply
}) => {
    try {
        if (!isGroup) return reply("📛 *This command can only be used in a group.*");
        if (!isBotAdmins) return reply("📛 *I must be an admin to use this command.*");
        if (!isAdmins) return reply("📛 *You must be an admin to use this command.*");

        // If no message is provided, prompt the user to use the correct format
        if (args.length === 0) {
            return reply(`📜 *Use the command like this:* \n\n${prefix}hidetag <your message>`);
        }

        // Fetch group metadata to ensure participants are up-to-date
        groupMetadata = await conn.groupMetadata(from);
        participants = groupMetadata.participants;

        // Get the message after the command (hidetag)
        const message = args.join(' ');

        // Send the message with mentions
        await conn.sendMessage(from, {
            text: `hidetag ${message}`, // Format the message as "hidetag <message>"
            mentions: participants.map(a => a.id), // Mentions all participants
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply("🚨 *An error occurred while trying to tag all members.*");
    }
});