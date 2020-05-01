const CompressionPlugin = require('compression-webpack-plugin')

const path = require('path')

const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


module.exports = {

  // 是否触发eslint检查
  lintOnSave: false,

  // 是否使用包含运行时编译器的 Vue 构建版本, 但是这会让你的应用额外增加 10kb 左右
  runtimeCompiler: false,

  publicPath: '/',

  // 打包文件的出口
  outputDir: 'dist',

  // 放置生成的css和js和img和fonts的目录
  assetsDir: 'static',

  // 数组存放html的路径
  indexPath: 'static/index.html',

  productionSourceMap: false,

  /*
  
    默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，

    前提是保证index.html是vue cli自动生成的，如果无法保证的话就设置为false
  */
  filenameHashing: true,

  chainWebpack: config => {

    config.plugins.delete('prefetch')

    // ============压缩图片 start============
    config.module.rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit: 10240,
          outputPath: 'static/images'
        })
        .end()
    // ============压缩图片 end============
  },

  configureWebpack: config => {

    return {

      plugins: [

        // 压缩js和css和html
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,
          threshold: 10240,
          deleteOriginalAssets: false
        }),

        // 图形化展示打包后的详情
        new BundleAnalyzer()
      ],

      performance: {
        // 关闭webpack的性能提示
        hints:'warning',
        //入口起点的最大体积
	    	maxEntrypointSize: 50000000,
	    	//生成文件的最大体积
        maxAssetSize: 30000000,
        //只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
	    		return assetFilename.endsWith('.js');
	    	}
      },

      // 指定不打包的第三方包
      externals: {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        "moment": "moment",
        'echarts': 'echarts'
      }
    }
  },

}
