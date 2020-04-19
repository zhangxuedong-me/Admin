// 把公共路由和权限的路由导出来
import router, { publicRoutesMap, asyncRoutesMap} from '../router'

// 定义一个函数用来筛选后端返回来的权限数据，如果筛选成功的话返回true，否则false
function hasPerMission (roles, route) {

    if (route && route.meta.roles) {
        return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    } else {
        return true
    }
}

const permission = {

    state: {
        routers: publicRoutesMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS (state, routers) {
            state.addRouters = routers
            state.routers = publicRoutesMap.concat(routers)
        }
    },
    actions: {
        generateRoutes ({state, commit }, data) {
            // 返回一个promise回调
            
            return new Promise((resolve, reject) => {
                // 遍历权限数组
                const accessedRoutes = asyncRoutesMap.filter(v => {
                    
                    // 如果包含admin，说明就是管理员直接进入即可
                    if (data.indexOf('admin') >= 0) return true

                    // 之后就是调用hasPerMission函数对象权限动态路由和后台返回的用户权限进行严格匹配
                    if (hasPerMission(data, v)) {

                        // 判断是否有权限路由是否有子路由，有子路由继续遍历
                        if (v.children && v.children.length > 0) {

                            v.children = v.children.filter(child => {

                                // 对权限子路由和后台返回的用户权限数据，在进行匹配，匹配成功返回
                                if (hasPerMission(data, child)) {
                                  return child
                                }
                                // 失败返回false
                                return false
                            })

                             // 并且要把权限的父路由返回来，不光要把权限子路由返回，
                             //无论权限子路有还是没有，都应该把权限父路由返回来
                            return v
                        } else {
                            // 否则说明没有子路由，直接把父路由返回
                            return v
                        }
                    }

                    // 如果权限验证没有匹配项，直接返回false
                    return false
                })

                // 将返回的动态路由存储到公共路由中
                commit('SET_ROUTERS', accessedRoutes)
                resolve()
            })
        } 
    },
    getters: {

        // 只要权限路由数组发生变化就重新计算
        addRouters (state) {
            return state.routers
        }
    }
}


export default permission
