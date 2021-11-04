// Bug管理
import Bug from '@/views/bug/Bug-home'

import { ROUTE_BUG_HOME } from '@/router/path.js'

export default [
  {
    path: ROUTE_BUG_HOME,
    name: 'Bug管理',
    component: Bug,
    meta: {
      isMenu: true,
      upMenu: [{ name: 'Bug管理' }],
    },
  },
]
