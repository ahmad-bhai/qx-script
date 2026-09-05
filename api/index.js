const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// In-memory state store
const botState = {};

// Root test route (Check karne ke liye ki server active hai)
app.get("/", (req, res) => {
  res.send("Bot Server is Running!");
});

// Telegram Webhook
app.post("/api/webhook", async (req, res) => {
  try {
    const { message } = req.body;

    if (message && message.text && message.text.startsWith("/start")) {
      const chatId = message.chat.id;
      const webPage = "https://t.me/MAGIC_SCRIPTS_REACTIONS_BOT/Create";

      // Note: Telegram token bot environment variables ya direct use kar sakte hain
      const BOT_TOKEN = process.env.BOT_TOKEN || "8917649270:AAGh1VBCNxzhxi_97Th6xBgPLsSyyVdYa0E";

      // Agar bot status OFF hai toh reply na karein
      if (botState[BOT_TOKEN] === false) {
        return res.status(200).send("Bot is OFF");
      }

      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        chat_id: chatId,
        photo: "https://i.ibb.co/NgFGZSps/file-0000000023308208b1e8edcd2a46d40d.png",
        caption:
          "⚡️ *Welcome to Magic Scripts | Reaction Bot Manager* ⚡️\n\n" +
          "*Click the Create Free Bots button to open the Mini App.*\n\n" +
          "*Inside the Mini App, you can easily create your own reaction bot without coding!*",
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🚀 Create Free Bots",
                url: webPage
              }
            ]
          ]
        }
      });
    }

    return res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook Error:", error?.response?.data || error.message);
    return res.status(200).send("Error handled"); // Telegram ko hamesha 200 return karein taake retry loops na banein
  }
});

// ON / OFF API Route
app.get("/api/token=:token/:status", (req, res) => {
  const { token, status } = req.params;

  if (status !== "true" && status !== "false") {
    return res.status(400).json({
      success: false,
      message: "Invalid status. Use 'true' or 'false'."
    });
  }

  const isEnabled = status === "true";
  botState[token] = isEnabled;

  return res.status(200).json({
    success: true,
    token: token,
    active: isEnabled,
    message: `Bot status for token successfully set to ${isEnabled ? "ON" : "OFF"}`
  });
});

module.exports = app;
