import router from '@/router'
import store from '@/store'

// 导入进度条
import nprogress from 'nprogress'

const whiteList = ['/login', '/register'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  
  // 开启进度条
  nprogress.start()

  // 检查token
  if (store.getters.getuserInfo.token) {
    // 有token的话去登录页，直接拦截到首页，因为我们需要用户点击按钮退出，不希望通过浏览器的back按钮
    if (to.path === '/login') {
      next()
    } else {
      // 如果没有用户的权限数据，去拉取一下用户的权限数据
      if (store.getters.roles.length === 0) {

        store.dispatch('getUserAuth', store.getters.getuserInfo.token).then(res => {
          
          // 调用该方法对用户的权限进行一次筛选
          store.dispatch('generateRoutes', res).then(() => {

            router.addRoutes(store.getters.addRouters)

            if (from.path !== '/login') {
              next({ ...to, replace: true })
            } else {
              next()
            }
          })
        }).catch(error => {
          // 验证失败重新登陆
          next({ path: '/login' })
        })
      } else {
        next()
      }
    }
  } else {

    // 需要重定向的白名单
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach((to, from, next) => {
  // 关闭进度条
  nprogress.done()
})
