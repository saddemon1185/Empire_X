const { cmd, commands } = require('../command');
const config = require('../config');

const prefix = config.PREFIX; // Get the prefix from the config

//antilink command 

cmd({
    pattern: "antilink",
    alias: ["alink"],
    desc: "Enable or disable anti-link feature in groups",
    category: "group",
    react: "🚫",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, pushname, reply }) => {
    // Default value for ANTI_LINK is "false"
    if (args[0] === "true") {
        config.ANTILINK = "true";
        await reply("Anti-link feature is now enabled in this group.");
    } else if (args[0] === "false") {
        config.ANTILINK = "false";
        await reply("Anti-link feature is now disabled in this group.");
    } else {
        await reply(`Invalid input! Use either 'true' or 'false'. Example:\n${prefix}antilink true`);
    }
});

// Join a group
cmd({
    pattern: "join",                // Command pattern
    desc: "Joins a group by link",  // Command description
    category: "group",              // Already group
    filename: __filename,           // Current file reference
}, async (conn, mek, m, { from, quoted, body, args, q, isOwner, reply }) => {
    try {
        // Check if the command is being used by the owner
        if (!isOwner) return reply("𝐓𝐡𝐢𝐬 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐈𝐬 𝐎𝐧𝐥𝐲 𝐅𝐨𝐫 𝐌𝐲 𝐎𝐰𝐧𝐞𝐫 ⚠️");

        // Check if the URL is provided
        if (!args[0]) return reply("Please provide a valid WhatsApp group link.");

        // Validate if the link contains "whatsapp.com"
        const groupLink = args[0];
        if (!groupLink.includes("whatsapp.com")) {
            return reply("Invalid link. Please provide a valid WhatsApp group link.");
        }

        // Extract the invite code from the link
        const inviteCode = groupLink.split("https://chat.whatsapp.com/")[1];
        if (!inviteCode) {
            return reply("Invalid link format. Make sure it's a full WhatsApp invite link.");
        }

        // Attempt to join the group using the extracted invite code
        await conn.groupAcceptInvite(inviteCode)
            .then(() => reply("𝐃𝐨𝐧𝐞 ✓"))
            .catch((err) => {
                console.error("Error joining group:", err);
                reply("❌ Failed to join the group. Please ensure the link is correct or the group is open to invites.");
            });

    } catch (e) {
        console.error("Error in join command:", e);
        reply("An unexpected error occurred while trying to join the group.");
    }
});

cmd({
  pattern: "exit",
  desc: "Leaves the current group",
  category: "group",
}, async (conn, mek, m, { from, reply }) => {
  try {
    // `from` is the group chat ID
    await conn.groupLeave(from);
    reply("Successfully left the group🙂.");
  } catch (error) {
    console.error(error);
    reply("Failed to leave the group.🤦🏽‍♂️");
  }
});


//kick commands 
cmd({
  pattern: "kick",
  desc: "Kicks replied/quoted user from group.",
  category: "group",
  filename: __filename,
  use: "<quote|reply|number>"
}, async (conn, mek, m, { 
  from, quoted, args, isGroup, isBotAdmins, isAdmins, reply 
}) => {
  if (!isGroup) {
    return reply("This command can only be used in groups.");
  }
  
  if (!isAdmins) {
    return reply("Only group admins can use this command.");
  }
  
  if (!isBotAdmins) {
    return reply("I need to be an admin to perform this action.");
  }

  try {
    let users = quoted 
      ? quoted.sender 
      : args[0] 
        ? args[0].includes("@") 
          ? args[0].replace(/[@]/g, "") + "@s.whatsapp.net" 
          : args[0] + "@s.whatsapp.net" 
        : null;

    if (!users) {
      return reply("Please reply to a message or provide a valid number.");
    }

    await conn.groupParticipantsUpdate(from, [users], "remove");
    reply("User has been removed from the group successfully.");
  } catch (error) {
    console.error("Error kicking user:", error);
    reply("Failed to remove the user. Ensure I have the necessary permissions.");
  }
});

//add commands 
cmd({
    pattern: "add",
    desc: "Adds a user to the group.",
    category: "group",
    filename: __filename,
    use: '<number>',
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply("This command is only for groups.");

        // Check if the bot has admin privileges
        if (!isBotAdmins) return reply("I need admin privileges to add users.");

        // Ensure an argument (phone number) is provided
        if (!q || isNaN(q)) return reply("Please provide a valid phone number to add.");

        const userToAdd = `${q}@s.whatsapp.net`;  // Format the phone number

        // Check if the user is already in the group
        if (participants.some(participant => participant.id === userToAdd)) {
            return reply("The user is already in the group.");
        }

        // Add the user to the group
        await conn.groupParticipantsUpdate(from, [userToAdd], "add");

        // Confirm the addition
        reply(`Successfully added user: ${q}`);
    } catch (e) {
        console.error('Error adding user:', e);
        reply('An error occurred while adding the user. Please make sure the number is correct and they are not already in the group.');
    }
});

//mute commands 
cmd({
    pattern: "mute",
    alias: ["silence"],
    desc: "Mute all group members.",
    category: "group", // Already group
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, args, q, isGroup, sender, reply }) => {
    try {
        // Ensure this is being used in a group
        if (!isGroup) return reply("𝐓𝐡𝐢𝐬 𝐅𝐞𝐚𝐭𝐮𝐫𝐞 𝐈𝐬 𝐎𝐧𝐥𝐲 𝐅𝐨𝐫 𝐆𝐫𝐨𝐮𝐩❗");

        // Get the sender's number
        const senderNumber = sender.split('@')[0];
        const botNumber = conn.user.id.split(':')[0];

        // Check if the bot is an admin
        const groupMetadata = isGroup ? await conn.groupMetadata(from) : '';
        const groupAdmins = groupMetadata ? groupMetadata.participants.filter(member => member.admin) : [];
        const isBotAdmins = isGroup ? groupAdmins.some(admin => admin.id === botNumber + '@s.whatsapp.net') : false;

        if (!isBotAdmins) return reply("𝐏𝐥𝐞𝐚𝐬𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐌𝐞 𝐀𝐝𝐦𝐢𝐧 𝐑𝐨𝐥𝐞 ❗");

        // Check if the sender is an admin
        const isAdmins = isGroup ? groupAdmins.some(admin => admin.id === sender) : false;
        if (!isAdmins) return reply("𝐏𝐥𝐞𝐚𝐬𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐌𝐞 𝐀𝐝𝐦𝐢𝐧 𝐑𝐨𝐥𝐞 ❗");

        // Mute all participants
        await conn.groupSettingUpdate(from, 'announcement');  // This mutes the group (only admins can send messages)

        // Send confirmation reply
        return reply("All members have been muted successfully.");

    } catch (error) {
        console.error("Error in mute command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});

//unmute commands 
cmd({
    pattern: "unmute",
    alias: ["unsilence"],
    desc: "Unmute all group members.",
    category: "group", // Already group
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, args, q, isGroup, sender, reply }) => {
    try {
        // Ensure this is being used in a group
        if (!isGroup) return reply("𝐓𝐡𝐢𝐬 𝐅𝐞𝐚𝐭𝐮𝐫𝐞 𝐈𝐬 𝐎𝐧𝐥𝐲 𝐅𝐨𝐫 𝐆𝐫𝐨𝐮𝐩❗");

        // Get the sender's number
        const senderNumber = sender.split('@')[0];
        const botNumber = conn.user.id.split(':')[0];

        // Check if the bot is an admin
        const groupMetadata = isGroup ? await conn.groupMetadata(from) : '';
        const groupAdmins = groupMetadata ? groupMetadata.participants.filter(member => member.admin) : [];
        const isBotAdmins = isGroup ? groupAdmins.some(admin => admin.id === botNumber + '@s.whatsapp.net') : false;

        if (!isBotAdmins) return reply("𝐏𝐥𝐞𝐚𝐬𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐌𝐞 𝐀𝐝𝐦𝐢𝐧 𝐑𝐨𝐥𝐞 ❗");

        // Check if the sender is an admin
        const isAdmins = isGroup ? groupAdmins.some(admin => admin.id === sender) : false;
        if (!isAdmins) return reply("𝐏𝐥𝐞𝐚𝐬𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐌𝐞 𝐀𝐝𝐦𝐢𝐧 𝐑𝐨𝐥𝐞 ❗");

        // Unmute all participants
        await conn.groupSettingUpdate(from, 'not_announcement');  // This unmutes the group (everyone can send messages)

        // Send confirmation reply
        return reply("All members have been unmuted successfully.");

    } catch (error) {
        console.error("Error in unmute command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});

//promote commands 
cmd({
  pattern: "promote",
  desc: "Provides admin role to replied/quoted user",
  category: "group",
  filename: __filename,
  use: "<quote|reply|number>"
}, async (conn, mek, m, { 
  from, quoted, args, isGroup, sender, botNumber, groupAdmins, isBotAdmins, isAdmins, reply 
}) => {
  if (!isGroup) {
    return reply("This command can only be used in groups.");
  }
  
  if (!isAdmins) {
    return reply("Only group admins can use this command.");
  }
  
  if (!isBotAdmins) {
    return reply("I need to be an admin to perform this action.");
  }

  try {
    let users = quoted 
      ? quoted.sender 
      : args[0] 
        ? args[0].includes("@") 
          ? args[0].replace(/[@]/g, "") + "@s.whatsapp.net" 
          : args[0] + "@s.whatsapp.net" 
        : null;

    if (!users) {
      return reply("Please reply to a message or provide a valid number.");
    }

    await conn.groupParticipantsUpdate(from, [users], "promote");
    reply("User has been promoted to admin successfully.");
  } catch (error) {
    console.error("Error promoting user:", error);
    reply("Failed to promote the user. Ensure I have the necessary permissions.");
  }
});

//demote commands 
cmd({
  pattern: "demote",
  desc: "Demotes replied/quoted user from admin role in the group.",
  category: "group",
  filename: __filename,
  use: "<quote|reply|number>"
}, async (conn, mek, m, { 
  from, quoted, args, isGroup, sender, botNumber, groupAdmins, isBotAdmins, isAdmins, reply 
}) => {

  if (!isGroup) {
    return reply("This command can only be used in groups.");
  }

  if (!isAdmins) {
    return reply("Only group admins can use this command.");
  }

  if (!isBotAdmins) {
    return reply("I need to be an admin to perform this action.");
  }

  try {
    let users = quoted 
      ? quoted.sender 
      : args[0] 
        ? args[0].includes("@") 
          ? args[0].replace(/[@]/g, "") + "@s.whatsapp.net" 
          : args[0] + "@s.whatsapp.net" 
        : null;

    if (!users) {
      return reply("Please reply to a message or provide a valid number.");
    }

    await conn.groupParticipantsUpdate(from, [users], "demote");
    reply("User has been demoted from admin successfully.");
  } catch (error) {
    console.error("Error demoting user:", error);
    reply("Failed to demote the user. Ensure I have the necessary permissions.");
  }
});

//tag commands 
cmd({
    pattern: "tag",
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
        if (!isGroup) return reply("𝐓𝐡𝐢𝐬 𝐅𝐞𝐚𝐭𝐮𝐫𝐞 𝐈𝐬 𝐎𝐧𝐥𝐲 𝐅𝐨𝐫 𝐆𝐫𝐨𝐮𝐩❗");

        // If no message is provided, prompt the user to use the correct format
        if (args.length === 0) {
            return reply(`📜 *Use:* \n\n${prefix}hidetag <your message>`);
        }

        // Fetch group metadata to ensure participants are up-to-date
        groupMetadata = await conn.groupMetadata(from);
        participants = groupMetadata.participants;

        // Get the message after the command (hidetag)
        const message = args.join(' ');

        // Send the message with mentions
        await conn.sendMessage(from, {
            text: `${message}`, // Send the message to tag everyone
            mentions: participants.map(a => a.id), // Mentions all participants
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply("🚨 *An error occurred while trying to tag all members.*");
    }
});

// tagall commands 
cmd({
    pattern: "tagall",
    category: "group", // Already group
    desc: "Tags every person in the group.",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, groupMetadata, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply("𝐓𝐡𝐢𝐬 𝐅𝐞𝐚𝐭𝐮𝐫𝐞 𝐈𝐬 𝐎𝐧𝐥𝐲 𝐅𝐨𝐫 𝐆𝐫𝐨𝐮𝐩❗");
        
        // Fetch group metadata to get participants
        groupMetadata = await conn.groupMetadata(from);
        participants = groupMetadata.participants;

        let textt = `
◐╤╤✪〘 *Tag All* 〙✪╤╤◑

➲ *Message:* ${args.join(' ') || "blank"}\n\n
➲ *Author:* ${pushname}
        `;
        
        // Loop through participants and tag each member
        for (let mem of participants) {
            textt += `📌 @${mem.id.split('@')[0]}\n`;
        }

        // Send the tagged message
        await conn.sendMessage(from, {
            text: textt,
            mentions: participants.map(a => a.id),
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("An error occurred while trying to tag all members.");
    }
});

//hidetag commands

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
        if (!isGroup) return reply("𝐓𝐡𝐢𝐬 𝐅𝐞𝐚𝐭𝐮𝐫𝐞 𝐈𝐬 𝐎𝐧𝐥𝐲 𝐅𝐨𝐫 𝐆𝐫𝐨𝐮𝐩❗");

        // If no message is provided, prompt the user to use the correct format
        if (args.length === 0) {
            return reply(`📜 *Use:* \n\n${prefix}hidetag <your message>`);
        }

        // Fetch group metadata to ensure participants are up-to-date
        groupMetadata = await conn.groupMetadata(from);
        participants = groupMetadata.participants;

        // Get the message after the command (hidetag)
        const message = args.join(' ');

        // Send the message with mentions
        await conn.sendMessage(from, {
            text: `${message}`, // Send the message to tag everyone
            mentions: participants.map(a => a.id), // Mentions all participants
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply("🚨 *An error occurred while trying to tag all members.*");
    }
});

//tag admin commands 

cmd({
    pattern: "tagadmin",
    category: "group", // Already group
    desc: "Tags every admin in the group.",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, groupMetadata, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply("𝐓𝐡𝐢𝐬 𝐅𝐞𝐚𝐭𝐮𝐫𝐞 𝐈𝐬 𝐎𝐧𝐥𝐲 𝐅𝐨𝐫 𝐆𝐫𝐨𝐮𝐩❗");

        // Fetch group metadata to get participants
        groupMetadata = await conn.groupMetadata(from);
        participants = groupMetadata.participants;

        // Filter out non-admins
        let adminParticipants = participants.filter(mem => groupAdmins.includes(mem.id));

        if (adminParticipants.length === 0) {
            return reply("No admins found to tag.");
        }

        let textt = `
◐╤╤✪〘 *Tag All Admins* 〙✪╤╤◑

➲ *Message:* ${args.join(' ') || "blank"}\n\n
➲ *Author:* ${pushname}
        `;

        // Loop through admin participants and tag each admin
        for (let mem of adminParticipants) {
            textt += `📌 @${mem.id.split('@')[0]}\n`;
        }

        // Send the tagged message
        await conn.sendMessage(from, {
            text: textt,
            mentions: adminParticipants.map(a => a.id),
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("An error occurred while trying to tag the admins.");
    }
});

// Get group link
cmd({
    pattern: "invite",
    alias: ["glink"],
    desc: "Get group invite link.",
    category: "group", // Already group
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, args, q, isGroup, sender, reply }) => {
    try {
        // Ensure this is being used in a group
        if (!isGroup) return reply("𝐓𝐡𝐢𝐬 𝐅𝐞𝐚𝐭𝐮𝐫𝐞 𝐈𝐬 𝐎𝐧𝐥𝐲 𝐅𝐨𝐫 𝐆𝐫𝐨𝐮𝐩❗");

        // Get the sender's number
        const senderNumber = sender.split('@')[0];
        const botNumber = conn.user.id.split(':')[0];
        
        // Check if the bot is an admin
        const groupMetadata = isGroup ? await conn.groupMetadata(from) : '';
        const groupAdmins = groupMetadata ? groupMetadata.participants.filter(member => member.admin) : [];
        const isBotAdmins = isGroup ? groupAdmins.some(admin => admin.id === botNumber + '@s.whatsapp.net') : false;
        
        if (!isBotAdmins) return reply("𝐏𝐥𝐞𝐚𝐬𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐌𝐞 𝐀𝐝𝐦𝐢𝐧 𝐑𝐨𝐥𝐞 ❗");

        // Check if the sender is an admin
        const isAdmins = isGroup ? groupAdmins.some(admin => admin.id === sender) : false;
        if (!isAdmins) return reply("𝐏𝐥𝐞𝐚𝐬𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐌𝐞 𝐀𝐝𝐦𝐢𝐧 𝐑𝐨𝐥𝐞 ❗");

        // Get the invite code and generate the link
        const inviteCode = await conn.groupInviteCode(from);
        if (!inviteCode) return reply("Failed to retrieve the invite code.");

        const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;

        // Reply with the invite link
        return reply(`*Here is your group invite link:*\n${inviteLink}`);
        
    } catch (error) {
        console.error("Error in invite command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});

//gid commands 
cmd({
    pattern: "gjid",
    desc: "Get the list of JIDs and names for all groups the bot is part of.",
    category: "group",
    react: "📝",
    filename: __filename,
}, async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("𝐓𝐡𝐢𝐬 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐈𝐬 𝐎𝐧𝐥𝐲 𝐅𝐨𝐫 𝐌𝐲 𝐎𝐰𝐧𝐞𝐫 ⚠️");

    try {
        // Fetch all groups the bot is part of
        const groups = await conn.groupFetchAllParticipating();

        if (!Object.keys(groups).length) {
            return reply("I am not part of any groups yet.");
        }

        // Prepare the list of groups with names and JIDs
        let groupList = "📝 *Group Names and JIDs:*\n\n";
        for (const jid in groups) {
            const group = groups[jid];
            groupList += `📌 *Name:* ${group.subject}\n🆔 *JID:* ${jid}\n\n`;
        }

        // Send the formatted group list
        reply(groupList);
    } catch (err) {
        console.error(err);
        reply("An error occurred while fetching group information.");
    }
});

//update group name command 
cmd({
    pattern: "updategname",
    react: "🔓",
    alias: ["upgname","gname"],
    desc: "To Change the group name",
    category: "group",
    use: '.updategname',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins , isAdmins, reply}) => {
try{

if (!isGroup) return reply('This command can only be used in a group.')
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.')
        if (!isAdmins) return reply('You must be an admin to use this command.')

if (!q) return reply("🖊️ *Please write the new Group Subject*")
await conn.groupUpdateSubject(from, q )
 await conn.sendMessage(from , { text: `✔️ *Group name Updated*` }, { quoted: mek } )
} catch (e) {
reply('*Error !!*')
l(e)
}
});

cmd({
    pattern: "updategdesc",
    react: "🔓",
    alias: ["upgdesc", "gdesc"],
    desc: "To change the group description",
    category: "group",
    use: ".updategdesc",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, isGroup, sender, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) {
            return reply("🚫 *This is a group-only command*");
        }
        if (!isBotAdmins) {
            return reply("🚫 *Bot must be an admin first*");
        }
        if (!isAdmins) {
            return reply("🚫 *You must be an admin to use this command*");
        }
        if (!q) {
            return reply("🖊️ *Please provide the new group description*");
        }

        await conn.groupUpdateDescription(from, q);
        await conn.sendMessage(from, { text: `✔️ *Group description updated successfully!*` }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply("*Error: Unable to update group description!*");
    }
});

cmd({
    pattern: "revoke",
    react: "🖇️",
    alias: ["resetglink"],
    desc: "To reset the group link",
    category: "group",
    use: ".revoke",
    filename: __filename
}, async (conn, mek, m, { from, quoted, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) {
            return reply("🚫 *This is a group-only command*");
        }
        if (!isBotAdmins) {
            return reply("🚫 *Bot must be an admin first*");
        }
        if (!isAdmins) {
            return reply("🚫 *You must be an admin to use this command*");
        }

        // Revoke the group invite link
        await conn.groupRevokeInvite(from);
        await conn.sendMessage(from, { text: `⛔ *Group link has been reset successfully!*` }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply("*Error: Unable to reset the group link!*");
    }
});

cmd({
    pattern: "ginfo",
    react: "🥏",
    alias: ["groupinfo"],
    desc: "Get group information.",
    category: "group",
    use: ".ginfo",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) {
            return reply("⛔ *This command can only be used in groups*");
        }
        if (!isBotAdmins) {
            return reply("⛔ *Bot must be an admin first*");
        }
        if (!isAdmins) {
            return reply("🚫 *You must be an admin to use this command*");
        }

        const metadata = await conn.groupMetadata(from);
        const ppUrl = await conn.profilePictureUrl(from, "image").catch(() => null); // Handle missing profile picture
        const gdata = `
*📋 Group Information:*

🖋️ *Group Name:* ${metadata.subject}
🔑 *Group ID:* ${metadata.id}
👥 *Participants:* ${metadata.size}
👑 *Group Creator:* ${metadata.owner || "Unknown"}
📄 *Description:* ${metadata.desc || "No description set"}

> By Empire_X`;

        // Send group info with group profile picture
        await conn.sendMessage(from, {
            image: ppUrl ? { url: ppUrl } : undefined,
            caption: gdata
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`⛔ *An error occurred!*\n\n${e.message}`);
    }
});