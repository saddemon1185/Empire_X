const axios = require("axios");
const config = require("../config");
const { cmd, commands } = require("../command");
const googleTTS = require("google-tts-api");

cmd({
  pattern: "trt",
  alias: ["translate"],
  desc: "🌍 Translate text between languages",
  react: "⚡",
  category: "main",
  filename: __filename,
}, async (_context, _replyContext, args, { from, q, reply }) => {
  try {
    const parts = q.split(" ");
    if (parts.length < 2) return reply("❗ Please provide a language code and text. Usage: .translate [language code] [text]");
    
    const language = parts[0];
    const text = parts.slice(1).join(" ");
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${language}`;
    const response = await axios.get(url);
    const translated = response.data.responseData.translatedText;
    const message = `\n╭┈───────────────•\n│  ◦ 🔤 *Original*: ${text}\n│  ◦ 🔠 *Translated*: ${translated}\n│  ◦ 🌐 *Language*: ${language.toUpperCase()}\n╰┈───────────────•`;
    
    return reply(message);
  } catch (error) {
    console.error(error);
    return reply("⚠️ An error occurred while translating your text. Please try again later🤕");
  }
});

cmd({
  pattern: "tts",
  desc: "download songs",
  category: "download",
  react: "👧",
  filename: __filename,
}, async (_context, _replyContext, args, { from, quoted, q }) => {
  try {
    if (!q) return reply("Need some text.");
    
    const audioUrl = googleTTS.getAudioUrl(q, {
      lang: "hi-IN",
      slow: false,
      host: "https://translate.google.com",
    });
    
    await _context.sendMessage(from, {
      audio: { url: audioUrl },
      mimetype: "audio/mpeg",
      ptt: true,
    }, { quoted });
  } catch (error) {
    console.error(error);
    return reply("⚠️ Error occurred while generating TTS.");
  }
});
