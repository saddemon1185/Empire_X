const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "about",
    react: "👑",
    desc: "Get owner details",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted }) => {
    try {
        let madeMenu = `╭═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══♡᭄
     │     「 𝗠𝗬 𝗜𝗡𝗧𝗥𝗢 」
     │ Name      : ᴏɴʟʏ_ᴏɴᴇ_🥇ᴇᴍᴘɪʀᴇ
     │ Place      : ʟagos/Nigeria
     │ Gender     : ᴍᴀʟᴇ
     │ Age        : 20
     │ Phone      : wa.me/+2348078582627
     │ Youtube    : Youtube.com/only_one_empire
     │ Status     : Website Developer/Graphics Designer
     ╰═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══♡᭄`;

        await conn.sendMessage(
            from,
            { image: { url: config.ALIVE_IMG }, caption: madeMenu },
            { quoted: mek }
        );
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { text: `${e}` }, { quoted: mek });
    }
});
