const settingsPlugin = require('./settings/plugin/settings-plugin')
const { isProduction } = require('./utils/env-util')
const path = require('path')
const webpack = require('webpack')
const ExtractElementUIPlugin = require('extract-elementui-plugin')
const { getSettings } = require('./settings/utils/settings-utils.js')
const getArgv = require('./utils/cmd-utils').getArgv

let settingsName = getArgv('settings')
let publicPath = '/train-web/'

// 如果是 准线上环境、生产环境
if (settingsName === 'test' || settingsName === 'prod') {
  publicPath = '/train-web/'
}

let buildSourceMap = true
// 如果是生产环境，关闭sourcemap
if (settingsName === 'prod') {
  buildSourceMap = false
}

const localSettings = getSettings()
// 组装反向代理配置
const proxy = {}
Object.keys(localSettings.proxy).forEach(key => {
  proxy[key] = {
    target: localSettings.proxy[key],
    changeOrigin: true,
    pathRewrite: {
      [key]: '',
    },
  }
})

module.exports = {
  publicPath: isProduction() ? publicPath : '/',
  productionSourceMap: buildSourceMap,
  devServer: {
    port: 8000,
    compress: true,
    overlay: {
      errors: true,
      warnings: true,
    },
    // 开发时，使用local配置，反向代理
    proxy,
  },
  configureWebpack: {
    plugins: [
      settingsPlugin,
      // moment只引入中文
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
      new ExtractElementUIPlugin({
        src: path.resolve(__dirname, 'src'),
        dist: path.resolve(__dirname, './src/init-ui.js'),
      }),
    ],
  },
  chainWebpack: config => {
    mergeAlias(config)

    if (isProduction()) {
      // let cacheGroups = config.optimization.get('splitChunks').cacheGroups
      // cacheGroups.vendors.chunks = 'async'
      // cacheGroups.styles = {
      //   name: 'styles',
      //   test: /\.css$/,
      //   chunks: 'all',
      //   enforce: true,
      // }
      // config.plugin('extract-css').tap(([options]) => {
      //   options = { filename: options.filename }
      //   return [options]
      // })
    }
  },
}

function resolveAlias(dir, baseDir = 'src') {
  return path.resolve(__dirname, baseDir, dir)
}

function mergeAlias(config) {
  let alias = config.resolve.alias

  // 设置src下目录的别名
  // const aliasDirs = [
  //   'apis',
  //   'assets',
  //   'components',
  //   'router',
  //   'store',
  //   'views'
  // ]
  // aliasDirs.forEach(dir => {
  //   alias.set(dir, resolveAlias(dir))
  // })

  // 设置 settings/config 目录的别名 config
  alias.set('config', resolveAlias('config', 'settings'))
}
