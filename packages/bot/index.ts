
import dotenv from "dotenv";
import { Bot } from "./src/bot";

(async () => {
  dotenv.config();

  await Bot.Start();
})()
