const GlobalizePlugin = require('globalize-webpack-plugin')

module.exports = {
  webpack: (config) => {
    config.plugins.push(new GlobalizePlugin({
      production: false,
      developmentLocale: 'en',
      supportedLocales: [ 'en', 'es' ],
      messages: 'locales/[locale].json'
    }))
    return config
  }
}
