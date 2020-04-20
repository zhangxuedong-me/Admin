import Vue from 'vue'

function capitalizeFirstLetter (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 用来匹配.vue的前缀函数
function validateFileName (str) {
  return /^\S+\.vue$/.test(str) && str.replace(/^\S+\/(\w+)\.vue$/, (res, $1) => capitalizeFirstLetter($1))
}

const requireComponent = require.context('./', true, /\.vue$/)

// 遍历匹配到的文件夹及文件名，并且遍历得到每一个
requireComponent.keys().forEach(filePath => {
  // 得到每一个.vue文件中的属性方法和组件的name值
  const componentConfig = requireComponent(filePath)
  // 得到文件名的前半部分index
  const fileName = validateFileName(filePath)
  // 判断如果是以index开头命名的就返回组件的name值来注册组件，否则就使用文件名来注册
  const componentName = fileName.toLowerCase() === 'index' ? capitalizeFirstLetter(componentConfig.default.name) : fileName
  Vue.component(componentName, componentConfig.default || componentConfig)
})
