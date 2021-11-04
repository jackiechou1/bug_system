import axios from 'axios'
import { configInterceptors } from './config-interceptors'
import { logoutLocal, setSessionToken } from '@/utils/app-utils.js'
import router from '@/router/index'
import { ROUTE_LOGIN } from '@/router/path.js'
import { Message } from 'element-ui'
import { saveAs } from 'file-saver'

const axiosInstance = axios.create({})
configInterceptors(axiosInstance)

const index = {}

index.request = (config, interceptError) => request('request', null, null, config, interceptError)
index.get = (url, config, interceptError) => request('get', url, null, config, interceptError)
index.delete = (url, config, interceptError) => request('delete', url, null, config, interceptError)
index.head = (url, config, interceptError) => request('head', url, null, config, interceptError)
index.options = (url, config, interceptError) => request('options', url, null, config, interceptError)
index.post = (url, data, config, interceptError) => request('post', url, data, config, interceptError)
index.put = (url, data, config, interceptError) => request('put', url, data, config, interceptError)
index.patch = (url, data, config, interceptError) => request('patch', url, data, config, interceptError)
index.download = (url, data, config, interceptError) =>
  request('post', url, data, { ...config, responseType: 'blob', isDownload: true }, interceptError)
index.all = axios.all
index.spread = axios.spread

function request(reqMethod, url, data, config, interceptError = true) {
  let req

  config = { ...config, interceptError }

  switch (reqMethod) {
    case 'request':
      req = axiosInstance[reqMethod](config)
      break
    case 'get':
    case 'delete':
    case 'head':
    case 'options':
      req = axiosInstance[reqMethod](url, config)
      break
    case 'post':
    case 'put':
    case 'patch':
      req = axiosInstance[reqMethod](url, data, config)
      break
    default:
      Message.error('请求方式不支持！')
      return
  }
  return req
    .catch(e => {
      if (e && e.message === 'Network Error') {
        Message.error('网络错误！')
      } else {
        console.log(e)
        Message.error('系统维护中，请稍后再试！')
      }
      return Promise.reject(e)
    })
    .then(async res => {
      // 请求配置
      let reqConfig = res.config
      // 后端返回的消息体
      let serverRes
      let data
      if (res && String(res.status).startsWith('2')) {
        let contentType = res.headers['content-type']
        if (reqConfig.isDownload) {
          let blobData = new Blob([getKeyValue(res, 'data')])
          if (contentType.toUpperCase().indexOf('STREAM') !== -1) {
            // 返回的是流
            let filename = res.headers['content-disposition'].replace(/\w+;filename=(.*)/i, '$1')
            saveAs(blobData, decodeURI(filename))
            return res
          } else {
            res.data = JSON.parse(await blobData.text())
          }
        }
        // 普通请求
        serverRes = res.data
        let code = getKeyValue(serverRes, 'code')
        data = getKeyValue(serverRes, 'data')
        let message = getKeyValue(serverRes, 'message')
        if (code === 0) {
          // 请求成功，并且后端响应正确，直接取出业务数据
          let token = getKeyValue(serverRes, 'token')
          if (token) {
            setSessionToken(token)
          }
        } else if (code === 301 || code === 10002) {
          // token过期，重新登录
          Message.error('登录超时，请重新登录')
          // 本地注销
          logoutLocal()
          // 跳转到登录页面
          router.push({
            path: ROUTE_LOGIN,
            // 设置特殊参数，告知登录页面是重新登录
            query: {
              rl: 1,
            },
          })
          return Promise.reject(serverRes)
        } else if (code !== 0 && reqConfig.interceptError) {
          // 统一处理业务错误
          console.log(serverRes)
          Message.error(message || data || '操作失败或发生错误！')
          return Promise.reject(serverRes)
        } else {
          // 其他情况，进入错误处理
          return Promise.reject(serverRes)
        }
      }
      return data
    })
}

function getKeyValue(data, key) {
  if (data) {
    let value = data[key]
    return value == null ? data[key.slice(0, 1).toUpperCase() + key.slice(1)] : value
  } else {
    return null
  }
}

export default index
