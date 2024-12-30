const { cmd, commands } = require('../command'); 
const axios = require('axios');  // Importing Axios for HTTP requests

// TempNumber command - Fetch temporary numbers for a given country code
cmd({
    pattern: "tempnumber",
    desc: "Get temporary numbers for a given country code",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, text, prefix }) => {
    try {
        // Ensure the 'text' (country code) is provided
        if (!text) {
            return reply(`Please provide a country code, e.g., '${prefix}tempnumber us'.`);
        }

        let countryCode = text.trim().toLowerCase(); // Country code input (e.g., "us")
        
        // Fetching temporary numbers using Axios (GET request)
        const response = await axios.get(`https://api.nexoracle.com/misc/temp-number?apikey=MepwBcqIM0jYN0okD&q=${countryCode}`);
        
        // Check if the response contains valid data (JSON response)
        if (response.data && response.data.result && response.data.result.length > 0) {
            // Extract phone numbers from the response and format them
            let numbers = response.data.result.map(item => `${item.phoneNumber} (${item.country})`).join("\n");
            return reply(`Temporary numbers for ${countryCode.toUpperCase()}:\n${numbers}`);
        } else {
            return reply(`No temporary numbers found for ${countryCode.toUpperCase()}. Please try another country code.`);
        }
    } catch (e) {
        console.log(e);
        return reply(`Error: ${e.message}`);
    }
});

// TempNumberMessages command - Fetch messages for a specific temporary number
cmd({
    pattern: "tempnumbermessage",
    desc: "Get messages for a specific temporary number",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply, text, prefix }) => {
    try {
        // Ensure the 'text' (number) is provided
        if (!text) {
            return reply(`Please provide a temporary number, e.g., '${prefix}tempnumbermessage +44792938627'.`);
        }

        let number = text.trim(); // Temporary number input (e.g., "+44792938627")
        
        // Fetching messages for the specified temporary number using Axios (GET request)
        const response = await axios.get(`https://api.nexoracle.com/misc/temp-number-messages?apikey=MepwBcqIM0jYN0okD&number=${number}`);
        
        // Check if the response contains valid data (JSON response)
        if (response.data && response.data.result && response.data.result.length > 0) {
            // Format and send messages for the number
            let messages = response.data.result.map(msg => `[${msg.from}] ${msg.content}`).join("\n\n");
            return reply(`Messages for ${number}:\n\n${messages}`);
        } else {
            return reply(`No messages found for ${number}.`);
        }
    } catch (e) {
        console.log(e);
        return reply(`Error: ${e.message}`);
    }
});