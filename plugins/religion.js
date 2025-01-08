const { cmd, commands } = require('../command');
const axios = require('axios');

// Command: bible
cmd({
    pattern: "bible",
    desc: "Fetch Bible verses by reference.",
    category: "search",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    try {
        
        if (args.length === 0) {
            return reply(`⚠️ *Please provide a Bible reference.*\n\n📝 *Example:*\n.bible John 3:16`);
        }

        const reference = args.join(" ");

        const apiUrl = `https://bible-api.com/${encodeURIComponent(reference)}`;
        const response = await axios.get(apiUrl);

        if (response.status === 200 && response.data.text) {
            const { reference: ref, text, translation_name } = response.data;

            reply(
                `📜 *Bible Verse Found!*\n\n` +
                `📖 *Reference:* ${ref}\n` +
                `📚 *Text:* ${text}\n\n` +
                `🗂️ *Translation:* ${translation_name}`
            );
        } else {
            reply("❌ *Verse not found.* Please check the reference and try again.");
        }
    } catch (error) {
        console.error(error);
        reply("⚠️ *An error occurred while fetching the Bible verse.* Please try again.");
    }
});

// Command: biblelist
cmd({
    pattern: "biblelist",
    alias: ["biblebooks", "listbible", "blist"], // Ajout des alias
    desc: "Get the complete list of books in the Bible.",
    category: "search",
    react: "📜",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    try {
        const bibleList = `
📜 *Old Testament*:
1. Genesis
2. Exodus
3. Leviticus
4. Numbers
5. Deuteronomy
6. Joshua
7. Judges
8. Ruth
9. 1 Samuel
10. 2 Samuel
11. 1 Kings
12. 2 Kings
13. 1 Chronicles
14. 2 Chronicles
15. Ezra
16. Nehemiah
17. Esther
18. Job
19. Psalms
20. Proverbs
21. Ecclesiastes
22. Song of Solomon
23. Isaiah
24. Jeremiah
25. Lamentations
26. Ezekiel
27. Daniel
28. Hosea
29. Joel
30. Amos
31. Obadiah
32. Jonah
33. Micah
34. Nahum
35. Habakkuk
36. Zephaniah
37. Haggai
38. Zechariah
39. Malachi

📖 *New Testament*:
1. Matthew
2. Mark
3. Luke
4. John
5. Acts
6. Romans
7. 1 Corinthians
8. 2 Corinthians
9. Galatians
10. Ephesians
11. Philippians
12. Colossians
13. 1 Thessalonians
14. 2 Thessalonians
15. 1 Timothy
16. 2 Timothy
17. Titus
18. Philemon
19. Hebrews
20. James
21. 1 Peter
22. 2 Peter
23. 1 John
24. 2 John
25. 3 John
26. Jude
27. Revelation

> Empire_X Bible List
`;

        const imageUrl = "https://files.catbox.moe/kx30st.jpeg"; 
        
        if (!m.chat) {
            return reply("❌ *An error occurred: Invalid chat.*");
        }

        // Envoi de la réponse avec l'image et la liste des livres de la Bible
        await conn.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: `📖 *Bible List By Empire_X*:\n\n` +
                     `Here is the complete list of books in the Bible:\n\n` +
                     bibleList.trim() // Ajout du texte des livres de la Bible
        }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply("❌ *An error occurred while fetching the Bible list. Please try again.*");
    }
});

// Surah command - Get Surah info from API
cmd({
    pattern: "surah",
    desc: "Get Surah information",
    category: "religion",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const surahName = m.text.split(" ")[1]; // Example: /surah Al-Fatiha
        const apiUrl = `https://api.quran.com/api/v4/chapters/${surahName}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data) {
            reply(`Surah: ${data.name}\nMeaning: ${data.meaning}\nRevelation Place: ${data.revelation_place}`);
        } else {
            reply('Sorry, could not find Surah information.');
        }
    } catch (error) {
        console.error(error);
        reply('An error occurred while processing the command.');
    }
});

// Ayah command - Get Ayah info from API
cmd({
    pattern: "ayah",
    desc: "Get Ayah information",
    category: "religion",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const ayahId = m.text.split(" ")[1]; // Example: /ayah 2:255
        const apiUrl = `https://api.quran.com/api/v4/ayahs/${ayahId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data) {
            reply(`Ayah: ${data.text}\nSurah: ${data.surah.name}\nRevelation Place: ${data.revelation_place}`);
        } else {
            reply('Sorry, could not find Ayah information.');
        }
    } catch (error) {
        console.error(error);
        reply('An error occurred while processing the command.');
    }
});

// Asma command - Get Asma info (e.g., Names of Allah)
cmd({
    pattern: "asma",
    desc: "Get Asma (Names of Allah) information",
    category: "religion",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const apiUrl = 'https://api.islamicapi.com/v1/names_of_allah'; // Example API endpoint
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data) {
            reply(`Asma: ${data.names_of_allah.join(', ')}`);
        } else {
            reply('Sorry, could not find Asma information.');
        }
    } catch (error) {
        console.error(error);
        reply('An error occurred while processing the command.');
    }
});

// Surah List command - Get list of Surahs
cmd({
    pattern: "surahlist",
    desc: "Get list of all Surahs",
    category: "religion",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const apiUrl = 'https://api.quran.com/api/v4/chapters';
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data && data.chapters) {
            const surahList = data.chapters.map(surah => surah.name).join('\n');
            reply(`List of Surahs:\n${surahList}`);
        } else {
            reply('Sorry, could not fetch the list of Surahs.');
        }
    } catch (error) {
        console.error(error);
        reply('An error occurred while processing the command.');
    }
});
