const KEY_TOKEN = 'app_token'
const KEY_USER = 'app_user'

/**
 * 获取session中保存的token信息
 * @returns {string}  token信息
 */
export function getSessionToken() {
  return sessionStorage.getItem(KEY_TOKEN)
}

/**
 * 设置token信息到session
 * @param token
 */
export function setSessionToken(token) {
  sessionStorage.setItem(KEY_TOKEN, token)
}

/**
 * 获取session中保存的用户信息
 * @returns {any} 用户信息
 */
export function getSessionUser() {
  return JSON.parse(sessionStorage.getItem(KEY_USER))
}

/**
 * 设置用户信息到session
 * @param user  用户信息
 */
export function setSessionUser(user) {
  sessionStorage.setItem(KEY_USER, JSON.stringify(user))
}

/**
 * 本地注销
 */
export function logoutLocal() {
  sessionStorage.removeItem(KEY_TOKEN)
  sessionStorage.removeItem(KEY_USER)
  sessionStorage.removeItem('userName')
}
