const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    configureWebpack: config => {

        config.plugins.push(new CompressionWebpackPlugin({
            algorithm: 'gzip',
        　　test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        　　threshold: 10240,
        　　minRatio: 0.8
        }))
    }
}
  