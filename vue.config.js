const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const UNI_ENV_PREFIX = process.env.UNI_ENV_PREFIX || 'dev'

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@API': resolve('src/api'),
        '@MODEL': resolve('src/modelData'),
        '@PAGES': resolve('src/pages')
      }
    },
    plugins: [
      new (require('webpack').DefinePlugin)({
        'process.env.UNI_ENV_PREFIX': JSON.stringify(UNI_ENV_PREFIX)
      })
    ]
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@API', resolve('src/api'))
      .set('@MODEL', resolve('src/modelData'))
      .set('@PAGES', resolve('src/pages'))
  }
}
