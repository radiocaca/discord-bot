/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    kycMessage: "Verify account ownership",
    registry: "http://localhost:3001",
    discordChannel: "https://discord.com/channels/975242155725582416/975242155725582419",
  }
}
