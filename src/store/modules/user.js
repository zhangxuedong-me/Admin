// 引入api接口
import { userLogin, getUserAuth } from '@/api/user'

const user = {

  state: {

    // 需要往本地存储的用户信息包含token
    userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')) || {},
    // 用户的权限信息
    roles: [],
    // 用户的导航栏数据
    navBars: JSON.parse(window.sessionStorage.getItem('nav_bar')) || {
      navBarArr: [],
      index: 0
    },
    // 缓存组件
    cache: []
  },

  mutations: {

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
  }
}

export default user