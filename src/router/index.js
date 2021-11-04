import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'
// import { getSessionToken, getSessionUser } from '@/utils/app-utils'
import crewManagement_ from './routes/crew-management'
import bugManagement_ from './routes/bug-management'
import statisticsManagement from './routes/statistics-management'
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_SELECT_APP } from './path'
import Home from '@/views/Home.vue'
import Login from '@/views/Login'
import LoginForm from '@/views/login/LoginForm'
import SelectApp from '@/views/login/SelectApp'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: ROUTE_LOGIN,
      name: '登录',
      component: Login,
      children: [
        {
          path: '',
          component: LoginForm,
        },
        {
          path: ROUTE_SELECT_APP,
          component: SelectApp,
          meta: {
            needLogin: true,
          },
        },
      ],
    },
    {
      path: ROUTE_HOME,
      component: Home,
      meta: {
        needLogin: true,
      },
      children: [...crewManagement_, ...bugManagement_, ...statisticsManagement],
    },
  ],
  linkActiveClass: 'link-active',
})

//code 

// const excludePaths = [ROUTE_LOGIN, ROUTE_HOME]

// router.beforeEach((to, from, next) => {
//   let token = getSessionToken()
//   let user = store.state.user || getSessionUser()

//   // 如果路由不需要登录，直接跳转
//   if (!to.matched.find(item => item.meta.needLogin)) {
//     next()
//     return
//   }

//   // token 或者 user 为空，跳转到登录页
//   if (!token || !user) {
//     next({ path: ROUTE_LOGIN })
//     return
//   }

//   // 判断登录账号，是否有该页面权限
//   let { systemAuthPageS = [] } = user
//   let path = to.path
//   if (excludePaths.indexOf(path) === -1 && systemAuthPageS.indexOf(path) === -1) {
//     // todo 页面开发阶段暂时注释，之后替换下方代码
//     // next({ path: ROUTE_404 })
//     next()
//     return
//   }

//   // 其他情况，跳转路由
//   next()
// })

export default router
