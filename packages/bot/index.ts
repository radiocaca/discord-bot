import dotenv from "dotenv";
import Web3 from "web3";
import { Client, Intents, Interaction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders"
import { REST } from "@discordjs/rest";
import { Routes } from 'discord-api-types/v9';

/**
 * RACA discord bot
 */
export class Bot {
  public client: Client;

  /**
   * new Bot from environment
   */
  static async Start() {
    const token = String(process.env.BOT_TOKEN);
    const guild = String(process.env.GUILD_ID);
    const client = String(process.env.CLIENT_ID);
    const infura = String(process.env.INFURA);
    const bot = new Bot();

    // login and register token
    await bot.registerCommands(client, guild, token);
    await bot.login(token);
  }

  constructor() {
    console.log("Conneting to discord...");
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
  }

  private async handleVerify(interaction: Interaction) {
    if (!interaction.isCommand()) {
      return;
    }

    const sig = interaction.options.getString('signature');
    const web3 = new Web3(String(process.env.INFURA))
    try {
      const address = web3.eth.accounts.recover(String(web3.utils.sha3("raca")), String(sig));
      interaction.reply("Your ethereum address is: " + String(address));
    } catch (err) {
      console.log(err)
      interaction.reply("verify failed");
    }
  }

  /**
   * login bot
   *
   * @param token {string} - the token of discord bot
   */
  public async login(token: string): Promise<void> {
    return this.client.login(token).then(() => console.log('Successfully logged in.')).catch(console.error);
  }

  /**
   * register commands
   *
   * @param client {string} - client id
   * @param guild {string} - guild id
   * @param token {string} - bot token
   */
  public async registerCommands(client: string, guild: string, token: string) {
    const commands = [
      new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
      new SlashCommandBuilder().setName('verify').setDescription('Verify address').addStringOption(option =>
        option.setName('signature')
          .setDescription('The signature of "raca" via your ethereum account')
          .setRequired(true)),
    ].map(command => command.toJSON());

    const rest = new REST({
      version: '9'
    }).setToken(token);

    await rest.put(Routes.applicationGuildCommands(client, guild), { body: commands })
      .then(() => console.log('Successfully registered application commands.'))
      .catch(console.error);

    this.client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      const { commandName } = interaction;

      switch (commandName) {
        case "ping":
          await interaction.reply("pong");
        case "verify":
          await this.handleVerify(interaction);
        default:
          return;
      }
    })
  }
}

(async () => {
  dotenv.config();

  await Bot.Start();
})()
