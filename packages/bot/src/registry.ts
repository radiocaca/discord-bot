/**
 * Account registry
 */
import Koa from "koa";
import Bot from "./bot";
import { Kyc } from "./kyc";
import koaBody from "koa-body"
import Router from "@koa/router";
import Web3 from "web3";
import Config from "./config";

export class Registry {
  bot: Bot;
  config: Config;
  web3: Web3;
  kyc: Kyc;

  constructor() {
    this.bot = new Bot();
    this.config = new Config();
    this.web3 = new Web3(this.config.infura);
    this.kyc = new Kyc();
  }

  /**
   * serve registry
   */
  public serve() {
    const config = new Config;
    const app = new Koa();
    const router = new Router();

    router.post("/verify", async (ctx) => {
      const sig: string = ctx.request.body.signature;
      if (!sig) return;

      // this.bot
    })

    app
      .use(koaBody())
      .use(router.routes())
      .use(router.allowedMethods())
      .listen(Number(process.env.REGISTRY_PORT));
  }
}
