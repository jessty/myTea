import Vue from 'vue'
import Router from 'vue-router'
// import {tabs, index} from '../components'
import tabs from '../components/tabs'
import index from '../components/index'
import login from '../components/login'
import signUp from '../components/signUp'
import account from '../components/account'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:login,
    },
    {
      path:'/signUp',
      name:'signUp',
      component:signUp,
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path:'account',
          name:'account',
          component:account,
        },
        {
          path: ':func/:subFunc',
          name: 'tabs1',
          component: tabs
        },
        {
          path: ':func/:subFunc/:tab',
          name: 'tabs2',
          component: tabs
        }
      ]
    },
    {
      path: '*',
      name: 'error',
      component: login
    }
  ]
})
