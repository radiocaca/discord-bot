
import dotenv from "dotenv";
// import { Bot } from "./src/bot";
import { Kyc } from "./src/kyc";
import Web3 from "web3";

(async () => {
  dotenv.config();

  // await Bot.Start();
  const kyc = new Kyc();
  console.log(await kyc.verify("0xdbfd76af2157dc15ee4e57f3f942bb45ba84af24"));
})()
