const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  i18n: {
    locales: ["ru", "en"],
    defaultLocale: "ru",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
})
