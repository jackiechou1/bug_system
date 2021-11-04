import http from '@/http/index.js'

/**
 * 列表查询
 * @param params
 * @returns {*}
 */
export function list(params) {
  return http.post('/api/app/list', params)
}
