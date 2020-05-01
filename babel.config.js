module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],

    /*
    
      把es6转换成es5的时候，babel会需要一些辅助函数，如果多个源码文件都依赖这些辅助函数

      那么这些辅助函数会出现很多次，造成代码的沉余，为了不让这些辅助函数的代码重复注销

      是 babel-plugin-transform-runtime插件可以做到让他们只出现一次，将这些辅助函数帮到

      一个单独的模块 babel-runtime 中，这样做能减小项目文件的大小。
    
    */
    "@babel/plugin-transform-runtime"
  ]
}
