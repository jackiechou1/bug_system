/**
 * 判断是否是生产环境
 * @returns {boolean}
 */
function isProduction () {
  return process.env.NODE_ENV === 'production'
}

module.exports = {
  isProduction
}
