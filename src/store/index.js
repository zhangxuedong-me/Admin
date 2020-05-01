import Vue from 'vue'
import Vuex from 'vuex'

// 把用户权限验证模块引入
import permission from './modules/permission'

// 用户存储
import user from './modules/user'

// 公共计算属性
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    permission,
    user
  },
  getters
})
