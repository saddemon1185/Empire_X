const fs = require('fs');

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2348078582627",
    SESSION_ID: process.env.SESSION_ID || "eeZVUAbBY#oqvSuDmQAAlDe6xticb1640rWkB0TXADuPNXFWp0Z1Y",
    AUTO_READ_STATUS: convertToBool(process.env.AUTO_READ_STATUS, 'false'),
    MODE: process.env.MODE || "private",
    ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/efeurhobo/Empire_X/main/lib/assets/empire.jpg",
    ALIVE_MSG: process.env.ALIVE_MSG || "HI DEAR EMPIRE_V1 IS ONLINE",
    PREFIX: process.env.PREFIX || ".",
    OWNER_REACT: convertToBool(process.env.OWNER_REACT, 'true'),
    AUTO_REACT: convertToBool(process.env.AUTO_REACT, 'true'),
    OWNER_NAME: process.env.OWNER_NAME || "𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞",
    BOT_NAME: process.env.BOT_NAME || "Empire_X",
};
