/**
 * Account registry
 */
import Koa from "koa";
import Bot from "./bot";
import { Kyc } from "./kyc";
import koaBody from "koa-body"
import cors from "@koa/cors";
import Router from "@koa/router";
import { ethers } from "ethers";
import Config from "./config";


export class Registry {
  bot: Bot;
  config: Config;
  kyc: Kyc;

  constructor() {
    this.bot = new Bot();
    this.config = new Config();
    this.kyc = new Kyc();
  }

  /**
   * serve registry
   */
  public async serve() {
    await this.bot.registerCommands();
    await this.bot.login();

    const app = new Koa();
    const router = new Router();

    router.post("/verify", async (ctx) => {
      const sig: string = ctx.request.body.sig;
      const user: string = ctx.request.body.user;
      if (!sig || !user) return;

      try {
        const address = ethers.utils.verifyMessage(String(process.env.KYC_MESSAGE), sig);
        if (!await this.kyc.verify(address)) {
          ctx.body = {
            ok: false,
            err: "verify failed",
            errHelper: "Try to disconnect and connect your wallet and then do the verify stuff"
          }
        }

        if (!await this.bot.updateRole(user)) {
          ctx.body = {
            ok: false,
            err: "Member not exists",
            errHelper: "please click the correct link sent by discord bot"
          }
        } else {
          ctx.body = {
            ok: true,
            err: "",
            errHelper: ""
          }
        }
      } catch (err) {
        console.log(err);
        ctx.body = {
          ok: false,
          err: JSON.stringify(err),
          errHelper: "Please try again later"
        }
      }
    })

    const port = Number(process.env.REGISTRY_PORT);
    console.log(`registry listening at ${port}`)
    app
      .use(cors())
      .use(koaBody())
      .use(router.routes())
      .use(router.allowedMethods())
      .listen(port);
  }
}
