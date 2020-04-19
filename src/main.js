import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入中央事件总线
import './utils/event'

// 引入滚动条的样式文件
import 'nprogress/nprogress.css'

// 自定义样式
import './assets/css/font.css'

// 引入全局路由导航拦截
import './permission/index'

// 动态加载组件
import './components/cptsRegister'

// 引入自定义样式文件
import './assets/css/index.less'

// 引入样式初始化文件
import 'normalize.css/normalize.css'

// 引入注册的组件库
import './utils/registerElement'

import 'element-ui/lib/theme-chalk/index.css'

// 全局注册所有的过滤器
import filterRegister from './utils/filterRegister'
for (let key in filterRegister) {
  Vue.filter(key, filterRegister[key])
}

// 引入图片懒加载
import VueLazyload from 'vue-lazyload'

// 图片的懒加载的配置
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // 加载中显示的图片
  loading: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2843662159,2317606805&fm=16&gp=0.jpg',
  // 加载失败显示的图片
  error: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=104394466,2625116464&fm=11&gp=0.jpg',
  // 尝试加载一次
  attempt: 1
})

// 使用echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 滚动条的css样式
import 'vue-happy-scroll/docs/happy-scroll.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
