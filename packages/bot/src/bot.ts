import Config from "./config";
import { Client, Intents, Interaction, Guild, GuildMember } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders"
import { REST } from "@discordjs/rest";
import { Routes } from 'discord-api-types/v9';

/**
 * RACA discord bot
 */
export class Bot {
  private config: Config;
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
      new SlashCommandBuilder().setName('verify').setDescription('Verify address'),
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
        case "verify":
          interaction.reply(
            `please verify your account at ${this.config.connectAddress + "?id=" + interaction.user.id}`
          );
        default:
          return;
      }
    })
  }
}

export default Bot;
