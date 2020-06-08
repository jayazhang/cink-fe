import Vue from 'vue'
import Router from 'vue-router'
import { BlankLayout, MainLayout } from '../layers'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/user',
    component: BlankLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/user/login/Index')
      },
      {
        path: 'sign',
        name: 'sign',
        component: () => import(/* webpackChunkName: "sign" */ '@/views/user/sign/Index')
      },
      {
        path: 'interest',
        name: 'interest',
        component: () => import(/* webpackChunkName: "interest" */ '@/views/user/interest/Index')
      },
      {
        path: 'team',
        name: 'team',
        component: () => import(/* webpackChunkName: "team" */ '@/views/user/team/Index')
      },
      {
        path: 'room',
        name: 'room',
        component: () => import(/* webpackChunkName: "team" */ '@/views/room/index')
      },
      {
        path: '/detail',
        name: 'detail',
        component: () => import(/* webpackChunkName: "home" */ '@/views/detail/index')
      },
      {
        path: '/comment',
        name: 'comment',
        component: () => import(/* webpackChunkName: "home" */ '@/views/mine/comment/Index')
      },
    ]
  },

  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/index/Index')
      },
      {
        path: '/msg',
        name: 'msg',
        component: () => import(/* webpackChunkName: "home" */ '@/views/msg/Index')
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import(/* webpackChunkName: "home" */ '@/views/mine/Index')
      },
    ]
  }

  // {
  //   path: '/404',
  //   component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  // }

]

const router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
})

const paths = [
  '/user/login',
  '/user/sign'
]

router.beforeEach(async (to, from, next) => {
  if (paths.indexOf(to.path) > -1) {
    next()
    return
  }
  const userInfo = localStorage.getItem('userInfo')
  if (!userInfo) {
    next('/user/login')
  } else {
    next()
  }
})

export default router
