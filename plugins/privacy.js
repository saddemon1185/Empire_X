// Set Profile Name
cmd({
    pattern: "profilename",
    desc: "Sets a new profile name.",
    filename: __filename,
    category: 'privacy'
}, async (conn, mek, m, { args, reply }) => {
    try {
        const newName = args.join(" ");
        if (!newName) return reply("Provide a valid name.");

        await conn.updateProfileName(newName);
        return reply(`Profile name updated to "${newName}".`);
    } catch (error) {
        console.error("Error in profilename command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});

// Save Status
cmd({
    pattern: "ssave",
    desc: "Saves the status of a replied message.",
    filename: __filename,
    category: 'privacy'
}, async (conn, mek, m, { quoted, reply }) => {
    try {
        if (!quoted) return reply("Reply to a status to save.");
        await conn.sendMessage(mek.key.remoteJid, { text: "Status saved!" });
    } catch (error) {
        console.error("Error in ssave command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});

// Set Profile Picture
cmd({
    pattern: "pp",
    desc: "Sets a new profile picture.",
    filename: __filename,
    category: 'privacy'
}, async (conn, mek, m, { quoted, reply }) => {
    try {
        if (!quoted || !quoted.message.imageMessage) return reply("Reply to an image to set as profile picture.");

        const media = await conn.downloadMediaMessage(quoted);
        await conn.updateProfilePicture(mek.key.remoteJid, media);
        return reply("Profile picture updated.");
    } catch (error) {
        console.error("Error in pp command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});

// Full Profile Picture
cmd({
    pattern: "fullpp",
    desc: "Displays the full profile picture of a user.",
    filename: __filename,
    category: 'privacy'
}, async (conn, mek, m, { args, reply }) => {
    try {
        const jid = args[0] || mek.key.remoteJid;
        const pictureUrl = await conn.profilePictureUrl(jid, "image");
        return conn.sendMessage(mek.key.remoteJid, { image: { url: pictureUrl } });
    } catch (error) {
        console.error("Error in fullpp command:", error);
        reply("No profile picture found.");
    }
});

// User Bio
cmd({
    pattern: "bio",
    desc: "Displays the user's bio.",
    filename: __filename,
    category: 'privacy'
}, async (conn, mek, m, { args, reply }) => {
    try {
        const jid = args[0] || mek.key.remoteJid;
        const about = await conn.fetchStatus(jid);
        return reply(`User Bio:\n\n${about.status}`);
    } catch (error) {
        console.error("Error in bio command:", error);
        reply("No bio found.");
    }
});

// Picture to Video
cmd({
    pattern: "picturetovideo",
    desc: "Converts a picture to video format.",
    filename: __filename,
    category: 'privacy'
}, async (conn, mek, m, { quoted, reply }) => {
    try {
        if (!quoted || !quoted.message.imageMessage) return reply("Reply to an image to convert.");

        const media = await conn.downloadMediaMessage(quoted);
        await conn.sendMessage(mek.key.remoteJid, { video: media });
        return reply("Picture converted to video.");
    } catch (error) {
        console.error("Error in picturetovideo command:", error);
        reply("An error occurred while converting.");
    }
});

// Save Media
cmd({
    pattern: "save",
    desc: "Saves a media file from the chat.",
    filename: __filename,
    category: 'privacy'
}, async (conn, mek, m, { quoted, reply }) => {
    try {
        if (!quoted) return reply("Reply to a media message to save.");

        const media = await conn.downloadMediaMessage(quoted);
        fs.writeFileSync("./savedMedia", media);
        return reply("Media saved.");
    } catch (error) {
        console.error("Error in save command:", error);
        reply("An error occurred while saving.");
    }
});

// Block List
cmd({
    pattern: "blocklist",
    desc: "Displays the list of blocked users.",
    filename: __filename,
    category: 'privacy'
}, async (conn, mek, m, { reply }) => {
    try {
        const blocklist = conn.blocklist;
        if (blocklist.length === 0) return reply("No users blocked.");

        const list = blocklist.map((jid, index) => `${index + 1}. ${jid}`).join("\n");
        return reply(`Blocked Users:\n\n${list}`);
    } catch (error) {
        console.error("Error in blocklist command:", error);
        reply("An error occurred while fetching blocklist.");
    }
});

// List Personal Chats
cmd({
    pattern: "listpersonalchat",
    desc: "Lists all personal chats.",
    filename: __filename,
    category: 'privacy'
}, async (conn, mek, m, { reply }) => {
    try {
        const chats = Object.keys(conn.chats).filter(jid => !jid.endsWith("@g.us"));
        if (chats.length === 0) return reply("No personal chats found.");

        const list = chats.map((jid, index) => `${index + 1}. ${jid}`).join("\n");
        return reply(`Personal Chats:\n\n${list}`);
    } catch (error) {
        console.error("Error in listpersonalchat command:", error);
        reply("An error occurred while fetching personal chats.");
    }
});

// List Group Chats
cmd({
    pattern: "listgroupchat",
    desc: "Lists all group chats.",
    filename: __filename,
    category: 'privacy'
}, async (conn, mek, m, { reply }) => {
    try {
        const groups = Object.keys(conn.chats).filter(jid => jid.endsWith("@g.us"));
        if (groups.length === 0) return reply("No group chats found.");

        const list = groups.map((jid, index) => `${index + 1}. ${jid}`).join("\n");
        return reply(`Group Chats:\n\n${list}`);
    } catch (error) {
        console.error("Error in listgroupchat command:", error);
        reply("An error occurred while fetching group chats.");
    }
});

// VCard
cmd({
    pattern: "vcard",
    desc: "Sends the owner's VCard.",
    filename: __filename,
    category: 'privacy'
}, async (conn, mek, m, { reply }) => {
    try {
        // Load the owner's number from lib/dev.json
        const devData = require('./lib/dev.json');
        const ownerNumber = devData[0]; // Access the number from the array

        // Set the owner's name and info
        const name = "Only_one_🥇Empire";
        const info = "Empire_X";

        // Create the VCard
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nORG:${info};\nTEL;type=CELL;type=VOICE;waid=${ownerNumber}:${ownerNumber}\nEND:VCARD`;

        // Send the VCard
        return conn.sendMessage(mek.key.remoteJid, { contacts: { displayName: name, contacts: [{ vcard }] } }, { quoted: m });
    } catch (error) {
        console.error("Error in vcard command:", error);
        reply("An error occurred while sending VCard.");
    }
});

// Forward Message
cmd({
    pattern: "forward",
    desc: "Forwards a message.",
    filename: __filename,
    category: 'privacy'
}, async (conn, mek, m, { quoted, args, reply }) => {
    try {
        if (!quoted) return reply("Reply to a message to forward.");
        const to = args[0];
        if (!to) return reply("Provide a chat ID to forward to.");

        await conn.forwardMessage(to, quoted.message);
        return reply("Message forwarded.");
    } catch (error) {
        console.error("Error in forward command:", error);
        reply("An error occurred while forwarding.");
    }
});