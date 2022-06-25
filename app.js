import TelegramBot from "node-telegram-bot-api";
import config from "./config.js";
import { writeFileSync } from "fs";
import { VideoCapture } from "camera-capture";

const c = new VideoCapture({
  mime: "image/png",
});

const bot = new TelegramBot(config.YOUR_TELEGRAM_BOT_TOKEN, { polling: true });

(async () => {
  // bot.on('message', (msg) => {
  //   console.log(msg.chat.id);
  // });

  await c.initialize();
  let f = await c.readFrame();
  writeFileSync("capture.png", f.data);
  c.stop();

  for await (const chat of config.CHAT_ID){
    await bot.sendPhoto(chat, "capture.png");
  }

  process.exit();
})();
