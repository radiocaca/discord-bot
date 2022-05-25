/** @type {import('next').NextConfig} */
require('dotenv').config()

module.exports = {
  reactStrictMode: true,
  env: {
    kycMessage: "Verify account ownership",
    registry: process.env.REGISTRY,
    discordChannel: process.env.DISCORD_CHANNEL,
  }
}
