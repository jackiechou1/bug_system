/**
 * 判断传入的参数转换成字符串后，是否都相等
 * @param rest  至少两个参数
 * @returns {boolean} 是否都相等
 */
export function eqAsString(...rest) {
  if (rest && rest.length > 1) {
    let val = rest[0]
    return rest.find(item => String(item) !== String(val)) == null
  }
  throw new Error('请传入至少两个参数')
}

/**
 * 将对象转换成query url字符串
 * @param query 参数对象
 * @returns {string}  query url，格式：?key1=value1&key2=value2
 */
export function generateQuery(query) {
  if (query && typeof query === 'object') {
    let strQuery = '?'
    let queries = []
    Object.keys(query).forEach(key => {
      let value = query[key]
      if (value != null) {
        queries.push(`${key}=${value}`)
      }
    })
    strQuery += queries.join('&')
    return strQuery
  }
  return ''
}
