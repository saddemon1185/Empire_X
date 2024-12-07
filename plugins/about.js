const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "about",
    react: "👑",
    desc: "get owner dec",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let madeMenu = `╭═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══♡᭄
     │     「 𝗠𝗬 𝗜𝗡𝗧𝗥𝗢 」
     │ Name      : ᴏɴʟʏ_ᴏɴᴇ_🥇ᴇᴍᴘɪʀᴇ
     │ Place      : ʟagos/Nigeria
     │ Gender    :  ᴍᴀʟᴇ
     │ Age       : 20_
     │ Phone     : wa.me/+2348078582627
     │ Youtube   : Youtube.com/only_one_empire
     │ Status     : Website Developer & Graphic Designer 🔥💫
     ╰═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══♡᭄
`

await conn.sendMessage(from,{image:{url:config.ALIVE_IMG},caption:madeMenu},{quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})
  
