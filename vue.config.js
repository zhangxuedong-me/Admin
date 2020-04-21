const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')

module.exports = {

  lintOnSave: false,

  configureWebpack: {

    plugins: [

      // 去除多余的css样式
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './src/assets/css/index.css'),
        ])
      })
    ]
  },
  // gizp压缩开启
  configureWebpack: config => {
    config.plugins.push(new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    }))
  }
}
