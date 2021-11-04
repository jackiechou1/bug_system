const webpack = require('webpack')
const chalk = require('chalk')
const { getSettings } = require('../utils/settings-utils.js')

let settings = getSettings()
console.log(chalk.green('当前使用配置：'))
console.log(settings)

module.exports = new webpack.DefinePlugin({
  'SETTINGS': JSON.stringify(settings)
})
