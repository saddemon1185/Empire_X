const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "autoreadstatus",
    alias: ["ars"],
    desc: "Enable or disable auto-read for status updates.",
    category: "automation",
    react: "👁️",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    try {
        if (!args[0]) return reply("❌ Please specify `true` or `false`. Example: `autoreadstatus true`");
        config.AUTO_VIEW_STATUS = args[0].toLowerCase() === "true" ? "true" : "false";
        reply(`✅ Auto Read Status is now ${config.AUTO_VIEW_STATUS === "true" ? "enabled" : "disabled (default)."}`);
    } catch (e) {
        console.error("Error in autoreadstatus command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

cmd({
    pattern: "autolikestatus",
    alias: ["als"],
    desc: "Enable or disable auto-like for status updates.",
    category: "automation",
    react: "💜",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    try {
        if (!args[0]) return reply("❌ Please specify `true` or `false`. Example: `autolikestatus true`");
        if (args[0].toLowerCase() === "true") {
            config.AUTO_LIKE_STATUS = "true";
            config.AUTO_LIKE_EMOJI = config.AUTO_LIKE_EMOJI || '💜';
            reply(`✅ Auto Like Status is now enabled with the emoji: ${config.AUTO_LIKE_EMOJI}.`);
        } else {
            config.AUTO_LIKE_STATUS = "false";
            reply("✅ Auto Like Status is now disabled (default).");
        }
    } catch (e) {
        console.error("Error in autolikestatus command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

cmd({
    pattern: "autolikeemoji",
    alias: ["ale"],
    desc: "Customize the emoji for auto-like on status updates.",
    category: "automation",
    react: "🛠️",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    try {
        if (!args[0]) return reply("❌ Please specify the emoji. Example: `autolikeemoji ❤️`");
        config.AUTO_LIKE_EMOJI = args[0];
        reply(`✅ Auto Like Emoji is now set to: ${config.AUTO_LIKE_EMOJI}`);
    } catch (e) {
        console.error("Error in autolikeemoji command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

cmd({
    pattern: "autoreplystatus",
    alias: ["ars"],
    desc: "Enable, disable, or customize auto-reply for status updates.",
    category: "automation",
    react: "💬",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    try {
        if (!args[0]) return reply("❌ Please specify `true`, `false`, or a custom message. Example: `autoreplystatus true` or `autoreplystatus Status viewed by Empire`");
        if (args[0].toLowerCase() === "true") {
            config.AUTO_REPLY_STATUS = "true";
            config.STATUS_REPLY_MSG = config.STATUS_REPLY_MSG || '✅ Status Viewed By Empire_X';
            reply(`✅ Auto Reply Status is now enabled with the default message: "${config.STATUS_REPLY_MSG}".`);
        } else if (args[0].toLowerCase() === "false") {
            config.AUTO_REPLY_STATUS = "false";
            reply("✅ Auto Reply Status is now disabled (default).");
        } else {
            config.AUTO_REPLY_STATUS = "true";
            config.STATUS_REPLY_MSG = args.join(" ");
            reply(`✅ Auto Reply Status is now enabled with the custom message: "${config.STATUS_REPLY_MSG}".`);
        }
    } catch (e) {
        console.error("Error in autoreplystatus command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

async function handleStatusActions(conn, mek) {
    try {
        const customEmoji = config.AUTO_LIKE_EMOJI || '💜';
        const customMessage = config.STATUS_REPLY_MSG || '✅ Status Viewed By Empire_X';

        if (config.AUTO_VIEW_STATUS === "true" && mek.key && mek.key.remoteJid === "status@broadcast") {
            await conn.readMessages([mek.key]);
        }

        if (config.AUTO_LIKE_STATUS === "true" && mek.key && mek.key.remoteJid === "status@broadcast") {
            if (mek.key.remoteJid && mek.key.participant) {
                await conn.sendMessage(
                    mek.key.remoteJid,
                    { react: { key: mek.key, text: customEmoji } },
                    { statusJidList: [mek.key.participant] }
                );
            }
        }

        if (config.AUTO_REPLY_STATUS === "true" && mek.key && mek.key.remoteJid === "status@broadcast") {
            if (mek.key.remoteJid) {
                await conn.sendMessage(
                    mek.key.remoteJid,
                    { text: customMessage },
                    { quoted: mek }
                );
            }
        }
    } catch (error) {
        console.error("Error processing status actions:", error);
    }
}