import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 公共路由
export const publicRoutesMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "user" */ '@/views/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "user" */ '@/views/Register')
  },
  {
    path: '/',
    component: () => import('@/views/Home'),
    children: [
      {
        path: '/',
        redirect: '/first_page'
      },
      {
        path: '/first_page',
        name: 'first_page',
        meta: {
          name: '首页'
        },
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/FirstPage')

      },
      {
        path: '/new_classification',
        name: 'new_classification',
        meta: {
          name: '分类管理'
        },
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/NewClassification')
      },
      {
        path: '/publish_article',
        name: 'publish_article',
        meta: {
          name: '发表文章'
        },
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/PublishArticle')
      },
      {
        path: '/edit_article/:id',
        name: 'edit_article',
        meta: {
          name: '修改文章'
        },
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/EditArticle')
      },
      {
        path: '/comment_manage',
        name: 'comment_manage',
        meta: {
          name: '评论管理'
        },
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/CommentManage')
      },
      {
        path: '/articles_manage',
        name: 'articles_manage',
        meta: {
          name: '文章管理'
        },
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/ArticlesManage')
      },
      {
        path: '/profile_info',
        name: 'profile_info',
        meta: {
          name: '个人信息'
        },
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/ProfileInfo')
      }
    ]
  }
]

// 需要的权限路由，动态挂载的路由
export const asyncRoutesMap = [
  {
    path: '*',
    redirect: '/404',
    hidden: true,
    meta: {
      roles: ['user']
    }
  },
  {
    path: '/404',
    name: 'four',
    component: () => import('../views/Error/foruAndFour.vue'),
    meta: {
      roles: ['user']
    }
  }
]

const router = new VueRouter({
  routes: publicRoutesMap,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
