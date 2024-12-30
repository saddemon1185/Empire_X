const { cmd, commands } = require('../command');
const msg = require('../lib/msg');
const axios = require('axios'); // Import axios

// Helper function to fetch data from the API using axios
async function get(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`HTTP error! status: ${error.response ? error.response.status : error.message}`);
    }
}

cmd({
    pattern: "insult",
    desc: "Get a random insult",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Fetching random insult using axios
        let data = await get(`https://api.nexoracle.com/misc/insult-lines?apikey=MepwBcqIM0jYN0okD`);

        // Handling the response
        if (data && data.insult) {
            return reply(`${data.insult}`);
        } else {
            return reply("Sorry, I couldn't fetch an insult at the moment.");
        }
    } catch (e) {
        console.log(e);
        return reply(`Error: ${e.message}`);
    }
});

// rizz command
cmd({
    pattern: "rizz",
    desc: "Get a random flirt line",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Fetching random flirt line using axios
        let data = await get(`https://api.nexoracle.com/misc/flirt-lines?apikey=MepwBcqIM0jYN0okD`);

        // Handling the response
        if (data && data.flirt) {
            return reply(`${data.flirt}`);
        } else {
            return reply("Sorry, I couldn't fetch a flirt line at the moment.");
        }
    } catch (e) {
        console.log(e);
        return reply(`Error: ${e.message}`);
    }
});

// Jokes command
cmd({
    pattern: "jokes",
    desc: "Get a random joke",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        let data = await get(`https://api.giftedtech.my.id/api/fun/jokes?apikey=gifted`);
        return reply(`${data.result}`);  // Ensure the result is a string.
    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

// Advice command
cmd({
    pattern: "advice",
    desc: "Get a random piece of advice",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        let data = await get(`https://api.giftedtech.my.id/api/fun/advice?apikey=gifted`);
        return reply(`${data.result}`);
    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});