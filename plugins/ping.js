const config = require('../config');
const fs = require('fs');
const os = require('os');
const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');

// Command to check the bot's speed
cmd({
    pattern: 'speed',
    react: '🤖',
    alias: ['speed'],
    desc: 'Check bot\'s ping',
    category: 'main',
    use: '.speed',
    filename: __filename
}, async (client, message, args, { from, reply, quoted }) => {
    try {
        const start = new Date().getTime();
        let sentMessage = await client.sendMessage(from, { text: '🪄 Pinging...' }, { quoted });
        const end = new Date().getTime();

        // Calculate the ping time
        const ping = end - start;

        // Delete the temporary "pinging" message and send the ping result
        await client.sendMessage(from, { delete: sentMessage.key.id });
        await client.sendMessage(from, { text: `♻️ Speed...: ${ping}ms` }, { quoted });
    } catch (error) {
        console.log(error);
        reply('*Error !!*');
    }
});

// Command to ping the bot and check response time
cmd({
    pattern: 'ping',
    react: '♻️',
    alias: ['ping'],
    desc: 'Check bot\'s ping',
    category: 'main',
    use: '.ping',
    filename: __filename
}, async (client, message, args, { from, reply, quoted }) => {
    try {
        const start = new Date().getTime();
        let sentMessage = await client.sendMessage(from, { text: '*🪄Pinging...*' }, { quoted });
        const end = new Date().getTime();

        // Calculate the ping time
        const ping = end - start;

        // Delete the temporary "pinging" message and send the ping result
        await client.sendMessage(from, { delete: sentMessage.key.id });
        await client.sendMessage(from, { text: `*_♻️ Speed...: ${ping}ms_*` }, { quoted });
    } catch (error) {
        console.log(error);
        reply('' + error);
    }
});
