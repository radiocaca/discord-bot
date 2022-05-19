export default class Config {
  public client: string;
  public token: string;
  public guild: string;
  public infura: string;
  public verifiedRole: string;

  constructor () {
    this.client = String(process.env.CLIENT_ID);
    this.token = String(process.env.BOT_TOKEN);
    this.guild = String(process.env.GUILD_ID);
    this.infura = String(process.env.INFURA);
    this.verifiedRole = String(process.env.VERIFIED_ROLE);
  }
}
