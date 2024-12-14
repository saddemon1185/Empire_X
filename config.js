const fs = require('fs');

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

module.exports = {
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2348078582627",
    SESSION_ID: process.env.SESSION_ID || "rUdBmZ4S#sM6PDtcmrPBkw1VZir_UYT2Zp8Yilf-_sZdQcvS99Hg",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "false",
    MODE: process.env.MODE || "private",
    ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/efeurhobo/Empire_X/main/lib/assets/empire.jpg",
    ALIVE_MSG: process.env.ALIVE_MSG || "HI DEAR EMPIRE_V1 IS ONLINE",
    PREFIX: process.env.PREFIX || ".",
    OWNER_REACT: process.env.OWNER_REACT || "true",
    AUTO_REACT: process.env.AUTO_REACT || "false",
    OWNER_NAME: process.env.OWNER_NAME || "𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞",
    BOT_NAME: process.env.BOT_NAME || "Empire_X",
};