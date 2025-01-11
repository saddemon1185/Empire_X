const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  fetchLatestBaileysVersion,
  Browsers
} = require('@whiskeysockets/baileys');

const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions');
const fs = require('fs');
const P = require('pino');
const config = require('./config');
const qrcode = require('qrcode-terminal');
const util = require('util');
const { sms, downloadMediaMessage } = require('./lib/msg');
const axios = require('axios');
const { File } = require('megajs');
const googleTTS = require("google-tts-api");
const prefix = config.PREFIX;
const mode = config.MODE || "private";
const ownerNumber = [config.OWNER_NUMBER];


        function formatUptime(seconds) {
            const days = Math.floor(seconds / (24 * 60 * 60));
            seconds %= 24 * 60 * 60;
            const hours = Math.floor(seconds / (60 * 60));
            seconds %= 60 * 60;
            const minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        const uptime = formatUptime(process.uptime());

//===================SESSION-AUTH============================
if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
  if(!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!');
  const sessdata = config.SESSION_ID;
  const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);
  filer.download((err, data) => {
      if(err) throw err;
      fs.writeFile(__dirname + '/auth_info_baileys/creds.json', data, () => {
          console.log("Checking Session ID ⏳");
      });
  });
}

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

//=============================================

async function connectToWA() {
  console.log("Connecting Bot To WhatsApp 🤖");
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/');
  var { version } = await fetchLatestBaileysVersion();

  const conn = makeWASocket({
      logger: P({ level: 'silent' }),
      printQRInTerminal: false,
      browser: Browsers.macOS("Firefox"),
      syncFullHistory: true,
      auth: state,
      version
  });

  conn.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
connectToWA()
}
} else if (connection === 'open') {
console.log('Whatsapp Login Successfully ✅')
const path = require('path');
fs.readdirSync("./plugins/").forEach((plugin) => {
if (path.extname(plugin).toLowerCase() == ".js") {
require("./plugins/" + plugin);
}
});
console.log('Plugins installed successful 🔁')
console.log('Empire_X connected to whatsapp ✅')

        let up = `╭━━━〔 Empire_X 〕━━━⬤
┃𖠄│ *Prefix*: *[ ${prefix} ]*
┃𖠄│ *Mode*: *${mode}*
┃𖠄│ *Uptime*: *${uptime}*
┃𖠄╰─────────────⬤
╰━━━━━━━━━━━━━━⬤`;

        conn.sendMessage(`${ownerNumber}@s.whatsapp.net`, { 
            image: { url: 'https://raw.githubusercontent.com/efeurhobo/Empire_X/main/lib/assets/empire.jpg'}, 
            caption: up 
        });
}
})
conn.ev.on('creds.update', saveCreds)  

conn.ev.on('messages.upsert', async (mek) => {
    mek = mek.messages[0];
    if (mek.key && mek.key.remoteJid === "status@broadcast") {
        try {
            // Auto view status
            if (config.AUTO_VIEW_STATUS === "true" && mek.key) {
                await conn.readMessages([mek.key]);
            }

            // Auto like status
            if (config.AUTO_LIKE_STATUS === "true") {
                const customEmoji = config.AUTO_LIKE_EMOJI || '💜';
                if (mek.key.remoteJid && mek.key.participant) {
                    await conn.sendMessage(
                        mek.key.remoteJid,
                        { react: { key: mek.key, text: customEmoji } },
                        { statusJidList: [mek.key.participant] }
                    );
                }
            }

            // Auto reply to status
            if (config.AUTO_REPLY_STATUS === "true") {
                const customMessage = config.STATUS_REPLY_MSG || '✅ Status Viewed By Empire_X';
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

    try {
        // Anti-link feature
        const linkRegex = /(https?:\/\/[^\s]+)/gi;
        const containsLink = linkRegex.test(body);

        if (isGroup && containsLink && !isAdmins && config.ANTILINK === "true") {
            // Send warning message
            await conn.sendMessage(
                from,
                {
                    text: `\`\`\`「 Group Link Detected 」\`\`\`\n\n@${sender.split("@")[0]}, please do not share group links in this group.`,
                    contextInfo: { mentionedJid: [sender] },
                },
                { quoted: mek }
            );

            // Delete the message containing the link
            await conn.sendMessage(from, { delete: mek.key });
        }

        // Declarations and variables
        const m = sms(conn, mek);
        const type = getContentType(mek.message);
        const content = JSON.stringify(mek.message);
        const from = mek.key.remoteJid;
        const quoted =
            type == 'extendedTextMessage' &&
            mek.message.extendedTextMessage.contextInfo != null
                ? mek.message.extendedTextMessage.contextInfo.quotedMessage || []
                : [];
        const body = (type === 'conversation')
            ? mek.message.conversation
            : (type === 'extendedTextMessage')
                ? mek.message.extendedTextMessage.text
                : (type == 'imageMessage') && mek.message.imageMessage.caption
                    ? mek.message.imageMessage.caption
                    : (type == 'videoMessage') && mek.message.videoMessage.caption
                        ? mek.message.videoMessage.caption
                        : '';
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const args = body.trim().split(/ +/).slice(1);
        const q = args.join(' ');
        const isGroup = from.endsWith('@g.us');
        const sender = mek.key.fromMe
            ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id)
            : (mek.key.participant || mek.key.remoteJid);
        const senderNumber = sender.split('@')[0];
        const botNumber = conn.user.id.split(':')[0];
        const pushname = mek.pushName || 'Sin Nombre';
        const isMe = botNumber.includes(senderNumber);
        const isOwner = ownerNumber.includes(senderNumber) || isMe;
        const botNumber2 = await jidNormalizedUser(conn.user.id);
        const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : '';
        const groupName = isGroup ? groupMetadata.subject : '';
        const participants = isGroup ? await groupMetadata.participants : '';
        const groupAdmins = isGroup ? await getGroupAdmins(participants) : '';
        const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false;
        const isAdmins = isGroup ? groupAdmins.includes(sender) : false;

        const reply = (teks) => {
            conn.sendMessage(from, { text: teks }, { quoted: mek });
        };
    } catch (error) {
        console.error("Error in anti-link feature:", error);
    }
});

conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
              let mime = '';
              let res = await axios.head(url)
              mime = res.headers['content-type']
              if (mime.split("/")[1] === "gif") {
                return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options })
              }
              let type = mime.split("/")[0] + "Message"
              if (mime === "application/pdf") {
                return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options })
              }
              if (mime.split("/")[0] === "image") {
                return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options })
              }
              if (mime.split("/")[0] === "video") {
                return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options })
              }
              if (mime.split("/")[0] === "audio") {
                return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options })
              }
            }
  

//===================WORKTYPE===============================
if(!isOwner && config.MODE === "private") return
if(!isOwner && isGroup && config.MODE === "inbox") return
if(!isOwner && isGroup && config.MODE === "groups") return
//==================================================


        
const events = require('./command')
const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
if (isCmd) {
const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
if (cmd) {
if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key }})

try {
cmd.function(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply});
} catch (e) {
console.error("[PLUGIN ERROR] " + e);
}
}
}
events.commands.map(async(command) => {
if (body && command.on === "body") {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (mek.q && command.on === "text") {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (
(command.on === "image" || command.on === "photo") &&
mek.type === "imageMessage"
) {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (
command.on === "sticker" &&
mek.type === "stickerMessage"
) {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
}});

}
app.get("/", (req, res) => {
res.send("Empire_X Connected 🔌");
});
app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));
setTimeout(() => {
connectToWA()
}, 4000);