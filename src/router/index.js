import Vue from 'vue'
import Router from 'vue-router'
import bookManager from './bookManager'
import userManager from './userManager'
import operationsManager from './operationsManager'
import studentManager from './studentManager'
import adManager from './adManager'

import layOut from '@/views/layOut/layOut'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layOut',
      component: layOut,
      redirect:'/subject',
      children: [
        //教材管理
        ...bookManager,
        // 用户中心
        ...userManager,
        // 运营管理
        ...operationsManager,
        //  学生管理
        ...studentManager,
        // 广告管理
        ...adManager
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/loginPage/login'], resolve),
    }

  ]
})

