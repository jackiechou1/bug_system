// 统计
import Statistics from '@/views/statistics/Statistics-home'

import { ROUTE_STATISTICS_HOME } from '@/router/path.js'

export default [
  {
    path: ROUTE_STATISTICS_HOME,
    name: '统计',
    component: Statistics,
    meta: {
      isMenu: true,
      upMenu: [{ name: '统计' }],
    },
  },
]
