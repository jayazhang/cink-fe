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
        component: () => import(/* webpackChunkName: "interest" */ '@/views/user/team/Index')
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

export default new Router({
  mode: 'hash',
  base: '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
