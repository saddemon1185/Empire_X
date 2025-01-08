const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');
const prefix = config.PREFIX;

cmd({
    pattern: "loli",
    desc: "Fetch a random anime girl image.",
    category: "anime",
    react: "🐱",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Fetch the image
        const waifud = await axios.get("https://waifu.pics/api/sfw/shinobu");
        
        // Check if the image URL exists
        if (waifud.data && waifud.data.url) {
            var wbutss = [{
                buttonId: `${prefix}loli`,
                buttonText: {
                    displayText: `Next Loli✨`,
                },
                type: 1,
            }];
            
            let buttonsMessage = {
                image: { url: waifud.data.url },
                buttons: wbutss
            };
            
            // Send the message
            await conn.sendMessage(m.chat, buttonsMessage, {
                quoted: m
            });
        } else {
            reply("Sorry, I couldn't fetch an image. Please try again later.");
        }
    } catch (error) {
        console.error(error);
        reply("An error occurred while fetching the image.");
    }
});

cmd({
    pattern: "neko",
    desc: "Fetch a random neko anime image.",
    category: "anime",
    desc: "Sends a Neko Image in chat",
    filename: __filename
},
async (conn, citel, text) => {
    try {
        // Fetch the Neko image
        const nekodds = await axios.get("https://waifu.pics/api/sfw/neko");

        // Check if the image URL exists
        if (nekodds.data && nekodds.data.url) {
            let button4Messagesp = {
                image: {
                    url: nekodds.data.url,
                },
                buttons: [{
                    buttonId: 'next',
                    buttonText: { displayText: 'Next Neko' },
                    type: 1
                }]
            };

            // Send the message
            await conn.sendMessage(citel.chat, button4Messagesp, {
                quoted: citel,
            });
        } else {
            reply("Sorry, I couldn't fetch a Neko image. Please try again later.");
        }
    } catch (error) {
        console.error(error);
        reply("An error occurred while fetching the image.");
    }
});

cmd({
    pattern: "foxgirl",
    category: "anime",
    desc: "Sends image of Fox Girl in current chat.",
    filename: __filename
},
async (conn, citel, text) => {
    try {
        // Fetch the Fox Girl image
        const waifuddfg = await axios.get("https://nekos.life/api/v2/img/fox_girl");

        // Check if the image URL exists
        if (waifuddfg.data && waifuddfg.data.url) {
            let buttonssMessagesss = {
                image: {
                    url: waifuddfg.data.url
                },
                buttons: [{
                    buttonId: 'next',
                    buttonText: { displayText: 'Next Fox Girl' },
                    type: 1
                }]
            };

            // Send the message
            await conn.sendMessage(citel.chat, buttonssMessagesss, {
                quoted: citel,
            });
        } else {
            reply("Sorry, I couldn't fetch a Fox Girl image. Please try again later.");
        }
    } catch (error) {
        console.error(error);
        reply("An error occurred while fetching the image.");
    }
});


cmd({
    pattern: "pokemon",
    category: "anime",
    desc: "Sends info of pokemon in current chat.",
    filename: __filename
},
async (conn, citel, text) => {
    try {
        // Fetch Pokemon data from API
        let { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${text}`);

        // Check if the pokemon exists
        if (!data.name) {
            return citel.reply(`❌ Could not find any Pokemon with the name: ${text}`);
        }

        // Construct the Pokemon info message
        let poinfo = `*• Name: ${data.name}*\n*• Pokedex ID: ${data.id}*\n*• Height: ${data.height}*\n*• Weight: ${data.weight}*\n*• Abilities: ${data.abilities.map(a => a.ability.name).join(', ')}*\n*• Base Experience: ${data.base_experience}*\n*• Type: ${data.types.map(t => t.type.name).join(', ')}*\n*• Base Stat: ${data.stats[0].base_stat}*\n*• Attack: ${data.stats[1].base_stat}*\n*• Defense: ${data.stats[2].base_stat}*\n*• Special Attack: ${data.stats[3].base_stat}*\n*• Special Defense: ${data.stats[4].base_stat}*\n*• Speed: ${data.stats[5].base_stat}*\n`;

        // Send the Pokemon info and image
        let buttonMessage = {
            image: { url: data.sprites.front_default },
            caption: poinfo,
            buttons: [{
                buttonId: 'next',
                buttonText: { displayText: 'Next Pokémon' },
                type: 1
            }]
        };

        await conn.sendMessage(citel.chat, buttonMessage, {
            quoted: citel,
        });

    } catch (err) {
        console.error(err);
        citel.reply("Ahh, couldn't find any Pokémon.");
    }
});