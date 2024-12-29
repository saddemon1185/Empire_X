const { cmd, commands } = require('../command');
const config = require('../config');

const prefix = config.PREFIX; // Get the prefix from the config

cmd({
  pattern: "warn",
  desc: "Warns user in Group.",
  category: "group",
  filename: __filename,
  use: "<quote|reply|number>"
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, groupMetadata, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  if (!isGroup) {
    return reply("This command is only for groups.");
  }
  
  if (!isAdmins) {
    return reply("This command is only for admins.");
  }

  if (!quoted) {
    return reply("Please quote a user to warn.");
  }

  try {
    const metadata = groupMetadata;  // Get group metadata
    await new warndb({
      id: quoted.sender.split("@")[0] + "warn",
      reason: body,
      group: metadata.subject,
      warnedby: pushname,
    }).save();
    
    conn.sendMessage(m.chat, {
      text: `*----Warn----*\nUser: @${quoted.sender.split("@")[0]}\nWith Reason: ${body}\nWarned by: ${pushname}`,
      mentions: [quoted.sender]
    }, {
      quoted: m
    });

    let h = await warndb.find({
      id: quoted.sender.split("@")[0] + "warn"
    });
    
    if (h.length > Config.WARN_COUNT) {
      let teskd = "Removing User because Warn limit exceeded\n\n*All Warnings.*\n";
      h.forEach((warn, index) => {
        teskd += `*${index + 1}*\n╭─────────────◆\n│ *🍁In Group:* ${warn.group}\n`;
        teskd += `│ *⚠️Warned by:* ${warn.warnedby}\n`;
        teskd += `│ _📍Reason: ${warn.reason}_\n╰─────────────◆\n\n`;
      });

      reply(teskd);
      await conn.groupParticipantsUpdate(m.chat, [quoted.sender], "remove");  // Remove user from group
    }
  } catch (e) {
    console.log(e);
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
// Tag All
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

//kick commands 
cmd({
    pattern: "kick",
    alias: ["remove"],
    desc: "Kick a member from the group.",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        // Ensure the command is used in a group
        if (!from.endsWith('@g.us')) return reply("𝐓𝐡𝐢𝐬 𝐅𝐞𝐚𝐭𝐮𝐫𝐞 𝐈𝐬 𝐎𝐧𝐥𝐲 𝐅𝐨𝐫 𝐆𝐫𝐨𝐮𝐩𝐬❗");

        // Fetch group metadata
        const groupMetadata = await conn.groupMetadata(from);
        const participants = groupMetadata.participants;
        const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net';
        const groupAdmins = participants.filter(member => member.admin).map(admin => admin.id);
        const sender = mek.key.fromMe
            ? conn.user.id.split(':')[0] + '@s.whatsapp.net'
            : mek.key.participant || mek.key.remoteJid;

        // Check if bot is an admin
        if (!groupAdmins.includes(botNumber)) return reply("𝐏𝐥𝐞𝐚𝐬𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐌𝐞 𝐀𝐝𝐦𝐢𝐧 𝐑𝐨𝐥𝐞❗");

        // Check if the sender is an admin
        if (!groupAdmins.includes(sender)) return reply("𝐘𝐨𝐮 𝐍𝐞𝐞𝐝 𝐓𝐨 𝐁𝐞 𝐀𝐧 𝐀𝐝𝐦𝐢𝐧 𝐓𝐨 𝐔𝐬𝐞 𝐓𝐡𝐢𝐬 𝐂𝐨𝐦𝐦𝐚𝐧𝐝❗");

        // Ensure a valid number is provided
        if (!args[0] || isNaN(args[0])) return reply("𝐏𝐥𝐞𝐚𝐬𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐀 𝐕𝐚𝐥𝐢𝐝 𝐏𝐡𝐨𝐧𝐞 𝐍𝐮𝐦𝐛𝐞𝐫 𝐓𝐨 𝐊𝐢𝐜𝐤.");

        // Format the phone number
        const numberToKick = `${args[0]}@s.whatsapp.net`;

        // Check if the user is in the group
        if (!participants.some(participant => participant.id === numberToKick)) {
            return reply("𝐓𝐡𝐞 𝐔𝐬𝐞𝐫 𝐈𝐬 𝐍𝐨𝐭 𝐈𝐧 𝐓𝐡𝐞 𝐆𝐫𝐨𝐮𝐩❗");
        }

        // Attempt to kick the user
        await conn.groupParticipantsUpdate(from, [numberToKick], "remove");
        reply(`𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐑𝐞𝐦𝐨𝐯𝐞𝐝 𝐔𝐬𝐞𝐫: ${args[0]}`);
    } catch (error) {
        console.error("Error in kick command:", error);
        reply(`𝐀𝐧 𝐄𝐫𝐫𝐨𝐫 𝐎𝐜𝐜𝐮𝐫𝐫𝐞𝐝: ${error.message || "𝐔𝐧𝐤𝐧𝐨𝐰𝐧 𝐄𝐫𝐫𝐨𝐫"}`);
    }
});

//add commands 

cmd({
    pattern: "add",
    react: "➕",
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

//poll commands 
cmd({
    pattern: "poll",
    desc: "Makes a poll in the group.",
    category: "group",
    filename: __filename,
    use: `question: option1, option2, option3.....`,
}, async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("This command is only for the owner.");

    let [poll, opt] = m.body.split(":");
    if (!poll || !opt) {
        return reply(`${prefix}poll question: option1, option2, option3.....`);
    }

    let options = opt.split(',').map(option => option.trim());  // Split options by commas and trim extra spaces

    try {
        await conn.sendMessage(m.chat, {
            poll: {
                name: poll.trim(),  // Ensure the question is trimmed of extra spaces
                values: options
            }
        });
    } catch (error) {
        console.error(error);
        reply("Error creating poll. Please try again.");
    }
});

//promote commands 
cmd({
    pattern: "promote",
    alias: ["addadmin"],
    desc: "Promote a member to admin.",
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

        // Ensure a valid member is specified
        const mentioned = quoted ? [quoted.sender] : args.length > 0 ? args[0] : null;
        if (!mentioned || mentioned.length < 1) return reply("Please mention a member to promote.");

        // Promote the member to admin
        await conn.groupParticipantsUpdate(from, [mentioned], 'promote');

        // Send confirmation reply
        return reply(`Successfully promoted the member.`);

    } catch (error) {
        console.error("Error in promote command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});

//demote commands 
cmd({
    pattern: "demote",
    alias: ["removeadmin"],
    desc: "Demote a member from admin.",
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

        // Ensure a valid member is specified
        const mentioned = quoted ? [quoted.sender] : args.length > 0 ? args[0] : null;
        if (!mentioned || mentioned.length < 1) return reply("Please mention a member to demote.");

        // Demote the member from admin
        await conn.groupParticipantsUpdate(from, [mentioned], 'demote');

        // Send confirmation reply
        return reply(`Successfully demoted the member.`);

    } catch (error) {
        console.error("Error in demote command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});