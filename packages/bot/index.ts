
import dotenv from "dotenv";
import { Registry } from "./src/registry";

(async () => {
  dotenv.config();

  const registry = new Registry();
  await registry.serve();
})()
