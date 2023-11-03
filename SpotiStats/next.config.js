/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    URL: "mongodb+srv://danielsantosbarbara:bLvMHsQFTeCceFAp@cluster0.hu9a4ao.mongodb.net/?retryWrites=true&w=majority"
  }
}
