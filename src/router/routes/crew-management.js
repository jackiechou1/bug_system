/* 人员管理 */

import crew from '@/views/crew/Crew-home'

import { ROUTE_CREW_HOME } from '@/router/path.js'

export default [
  {
    path: ROUTE_CREW_HOME,
    name: '人员管理',
    component: crew,
    meta: {
      isMenu: true,
      upMenu: [{ name: '人员管理' }],
    },
  },
]
