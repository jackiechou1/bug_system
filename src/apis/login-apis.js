import http from '@/http/index.js'

/**
 * 登录
 * @param params 登录参数：{
 *  SignAccount 账号
 *  SignPwd 密码
 *  AppCode 应用code
 * }
 * @returns {undefined}
 */
export function login(params) {
  return http.post('/api/login/login', params)
}
//导出1
export function searchUser(params){
  return http.post('/api/user/selectUserList', params)
}
export function deleteUser(params){
  return http.post('/api/user/deleteUser', params)
}

export function addUser(params){
  return http.post('/api/user/addUser', params)
}

//BugContent
export function bugShow(params){
  return http.post('/api/bug/selectBug', params)
}

export function deleteBug(params){
  return http.post('/api/bug/deleteBug', params)
}
export function addBug(params){
  return http.post('api/bug/addBug', params)
}
export function bugAccount(params){
  return http.post('api/bug/bugAccount', params)
}
export function bugselectPerson(params){
  return http.post('api/bug/selectPerson', params)
}

/**
 * 多平台登录
 * @param params 登录参数：{
 *  SignAccount 账号
 *  SignPwd 密码
 *  AppCodeList 应用code数组
 * }
 * @returns {undefined}
 */
export function MultisystemLogin(params) {
  return http.post('/userApi/MultisystemLogin', params)
}

/**
 * 功能： 登录成功之后调用的
 * @param params：{
 *        password，
 *        signinAccount
 * }
 */
export function CheckBusinessSysToken(params) {
  return http.post('/userApi/CheckBusinessSysToken', params)
}

/**
 * 登出
 * @returns {undefined}
 */
export function logout() {
  return http.post('/api/Login/userLogout')
}

/**
 * 修改密码
 * @param params  参数：{
 *   systemUserId: integer 主键ID
 *   newPassword: string 新密码
 *   oldPassword: string 原密码
 * }
 * @returns {undefined}
 */
export function changePassword(params) {
  return http.post('/api/login/changePassword', params)
}

/**
 * 修改密码(跳过登录)
 * @param params  参数：{
 *   signinAccount: string 账号
 *   newPassword: string 新密码
 *   oldPassword: string 原密码
 * }
 * @returns {undefined}
 */
export function changePwd(params) {
  return http.post('/api/login/changePwd', params)
}
