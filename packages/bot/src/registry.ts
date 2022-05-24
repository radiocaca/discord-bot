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
import { GuildMember } from "discord.js";

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
    const app = new Koa();
    const router = new Router();

    router.post("/verify", async (ctx) => {
      const sig: string = ctx.request.body.signature;
      const user: string = ctx.request.body.user;
      if (!sig || !user) return;

      try {
        // get user ethreum address
        const address = this.web3.eth.accounts.recover(
          String(this.web3.utils.sha3("raca")),
          String(sig),
        );
        if (!await this.kyc.verify(address)) {
          // response verify failed
        }

        await this.bot.updateRole(user);
      } catch (err) {
        // response verify failed
      }
    })

    app
      .use(koaBody())
      .use(router.routes())
      .use(router.allowedMethods())
      .listen(Number(process.env.REGISTRY_PORT));
  }
}
