import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

// 引入中央事件总线
import './utils/event'

// 引入滚动条的样式文件
import 'nprogress/nprogress.css'

// 自定义样式
import './styles/font.css'

// 引入自定义样式文件
import './styles/index.css'

// 引入全局路由导航拦截
import './permission/index'

// 动态加载组件
import './components/cptsRegister'

// 引入注册的组件库
import './utils/Element'

// 全局注册所有的过滤器
import filterRegister from './utils/filters'

for (const key in filterRegister) {
  Vue.filter(key, filterRegister[key])
}
// 引入图片懒加载
import VueLazyload from 'vue-lazyload'

// 使用echarts
import echarts from 'echarts'

// 滚动条的css样式
import 'vue-happy-scroll/docs/happy-scroll.css'

// 引入配置文件
import { lazyLoad } from './utils/config'

// 图片的懒加载的配置
Vue.use(VueLazyload, lazyLoad)

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
