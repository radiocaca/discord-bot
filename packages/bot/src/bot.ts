import Web3 from "web3";
import Config from "./config";
import { Kyc } from "./kyc";
import { Client, Intents, Interaction, Guild, GuildMember } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders"
import { REST } from "@discordjs/rest";
import { Routes } from 'discord-api-types/v9';

/**
 * RACA discord bot
 */
export class Bot {
  private config: Config;
  private kyc: Kyc;
  private web3: Web3;
  public client: Client;

  /**
   * new Bot from environment
   */
  static async Start() {
    const bot = new Bot();

    // login and register token
    await bot.registerCommands();
    await bot.login();
  }

  constructor() {
    console.log("Conneting to discord...");
    this.config = new Config();
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    this.kyc = new Kyc();
    this.web3 = new Web3(this.config.infura);
  }

  private async handleVerify(interaction: Interaction) {
    if (!interaction.isCommand()) {
      return;
    }

    const sig = interaction.options.getString('signature');
    try {
      // get user ethreum address
      const address = this.web3.eth.accounts.recover(
        String(this.web3.utils.sha3("raca")),
        String(sig),
      );
      if (!await this.kyc.verify(address)) {
        interaction.reply("verify failed");
      }

      // update role when verified
      (interaction.member as GuildMember).roles.add(String(this.config.verifiedRole));
    } catch (err) {
      console.log(err)
      interaction.reply("verify failed");
    }
  }

  /**
   * login bot
   */
  public async login(): Promise<void> {
    return this.client.login(this.config.token)
      .then(() => console.log('Successfully logged in.')).catch(console.error);
  }

  /**
   * register commands
   */
  public async registerCommands() {
    const commands = [
      new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
      new SlashCommandBuilder().setName('verify').setDescription('Verify address').addStringOption(option =>
        option.setName('signature')
          .setDescription('The signature of "raca" via your ethereum account')
          .setRequired(true)),
    ].map(command => command.toJSON());

    const rest = new REST({
      version: '9'
    }).setToken(this.config.token);

    await rest.put(Routes.applicationGuildCommands(
      this.config.client,
      this.config.guild,
    ), { body: commands })
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
