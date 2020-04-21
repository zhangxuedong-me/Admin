import Vue from 'vue'
import Vuex from 'vuex'
// 引入api接口
import { userLogin, getUserAuth } from '@/api/user'

// 把用户权限验证模块引入
import permission from './adminAuth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')) || {},
    roles: [],
    navBars: JSON.parse(window.sessionStorage.getItem('nav_bar')) || {
      navBarArr: [],
      index: 0
    },
    cache: [],
    loading: {
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    }
  },
  mutations: {
    // 存储用户信息
    SET_USERINFO (state, userInfo) {
      state.userInfo = userInfo
      window.sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },

    // 存储用户的navBar导航栏数据
    SET_USERNAVBAR ({ navBars }, navBar) {

      if (navBars.navBarArr.length === 0) {

        navBars.navBarArr.push(navBar)
      } else {

        const navItem = navBars.navBarArr.find((item, index) => {
          if (item.path === navBar.path) {
            navBars.index = index
            return true
          }
        })

        if (!navItem) {
          navBars.navBarArr.push(navBar)
          navBars.index = navBars.navBarArr.length - 1
        }
      }

      window.sessionStorage.setItem('nav_bar', JSON.stringify(navBars))
    },

    // 动态添加缓存组件
    ADD_CACHE ({ cache }, name) {
      if (cache.includes(name)) return

      cache.push(name)
    },

    // 动态删除缓存组件
    REMOVE_CACHE ({ cache }, name) {
      const index = cache.indexOf(name)

      if (index === -1) return

      cache.splice(index, 1)
    }
  },
  actions: {

    // 获取用户信息
    userLogin ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        userLogin(userInfo).then(res => {
          if (res.data.code === 200) {
            commit('SET_USERINFO', res.data.userInfo)
          }
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户权限
    getUserAuth ({ state }, token) {
      return new Promise((resolve, reject) => {
        getUserAuth({ token }).then(res => {
          state.roles.push(...res.data)
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  getters: {

    getuserInfo ({ userInfo }) {
      return userInfo
    },

    roles ({ roles }) {
      return roles
    }
  },

  modules: {
    permission
  }
})
