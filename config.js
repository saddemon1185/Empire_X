const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "bBtSGRBY#96BHMKyRqhg0x4gkDT5HlhOWKz25Xf0iegdXjF13q60",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254757959246",
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "true",
    MODE: process.env.MODE || "private",
    ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/r4decc.jpg",
    PREFIX: process.env.PREFIX || ".",
    OWNER_REACT: process.env.OWNER_REACT || "false",
    AUTO_REACT: process.env.AUTO_REACT || "false",
    OWNER_NAME: process.env.OWNER_NAME || "𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞",
    BOT_NAME: process.env.BOT_NAME || "Empire_X",
    CAPTION: process.env.CAPTION || "Made By 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞",
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "true",
    AUTO_REPLY_STATUS: process.env.AUTO_REPLY_STATUS || "true",
    STATUS_REPLY_MSG: process.env.STATUS_REPLY_MSG || "✅ i Reincarnated uchiha viewed your status and damn sad demon was right you are areal Gem i loved what i saw",
    AUTO_LIKE_EMOJI: process.env.AUTO_LIKE_EMOJI || "💜",
    ANTILINK: process.env.ANTILINK || "false",
};
