const { Client, GatewayIntentBits, Message } = require("discord.js");

const { keepAlive } = require("./server");

require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.on("ready", () => {
  console.log("bot is connected");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (
    message.content.includes("@here") ||
    message.content.includes("@everyone") ||
    message.type == "REPLY"
  )
    return false;
  if (message.content.startsWith("@")) {
    async function run() {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(message.content);
      const messageToSend = result.response.text();
      await message.reply(messageToSend);
    }
    run();
  }
});

keepAlive();
client.login(process.env.TOKEN);
