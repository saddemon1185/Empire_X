const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "gpt",
    desc: "ai chat.",
    category: "ai",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let data = await fetchJson(`https://chatgptforprabath-md.vercel.app/api/gptv1?q=${q}`)
return reply(`${data.data}`)
}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "gpt-4",
    desc: "ai chat from chat gpt",
    category: "ai",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) {
            
            return reply("Hello! How can I assist you today?");
        }

        
        let data = await fetchJson(`https://api.giftedtech.my.id/api/ai/gpt4?apikey=gifted&q=${encodeURIComponent(q)}`);
        return reply(`${data.result}`);
    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

//blackbox ai

cmd({
    pattern: "blackbox",
    desc: "AI chat using Blackbox AI",
    category: "ai",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) {
            return reply("Please provide a query for Blackbox AI.");
        }

        // Fetch the response from the Blackbox AI API
        let data = await fetchJson(`https://api.giftedtech.my.id/api/ai/blackbox?apikey=gifted&q=${encodeURIComponent(q)}`);
        
        // Reply with the AI's response
        return reply(`${data.result}`);
    } catch (e) {
        console.log(e); // Log any error for debugging
        reply(`Error: ${e.message}`);
    }
});

//letmegpt commands 

cmd({
    pattern: "letmegpt",
    desc: "AI chat using LetMeGPT",
    category: "ai",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) {
            return reply("Please provide a query for LetMeGPT.");
        }

        // Fetch the response from the LetMeGPT API
        let data = await fetchJson(`https://api.giftedtech.my.id/api/ai/letmegpt?apikey=gifted&query=${encodeURIComponent(q)}`);
        
        // Reply with the AI's response
        return reply(`${data.result}`);
    } catch (e) {
        console.log(e); // Log any error for debugging
        reply(`Error: ${e.message}`);
    }
});

//liama commands
cmd({
    pattern: "liama",
    desc: "AI chat using Llama AI",
    category: "ai",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) {
            return reply("Please provide a query for Llama AI.");
        }

        // Fetch the response from the Llama AI API
        let data = await fetchJson(`https://api.giftedtech.my.id/api/ai/llamaai?apikey=gifted&q=${encodeURIComponent(q)}`);
        
        console.log(data); // Log the entire response to inspect its structure
        
        // Check if the response has the expected structure
        if (data && data.result) {
            return reply(`${data.result}`);
        } else {
            return reply("Sorry, I couldn't get a response from Llama AI.");
        }
    } catch (e) {
        console.log(e); // Log any error for debugging
        reply(`Error: ${e.message}`);
    }
});