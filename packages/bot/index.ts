
import dotenv from "dotenv";
import { Bot } from "./src/bot";
import { Registry } from "./src/registry";

(async () => {
  dotenv.config();

  const bot = new Bot();
  // await Bot.Start();
  const registry = new Registry(bot);
  registry.serve();
})()
