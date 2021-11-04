import { proxy } from '@/utils/proxy-utils'
import settings from 'config'
import { Loading } from 'element-ui'
import { getSessionToken } from '@/utils/app-utils'

const SHOW_LOADING_DELAY = 500
let clock = null
let reqCount = 0
let loading

function reqStart() {
  if (reqCount === 0) {
    clock = setTimeout(() => {
      loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }, SHOW_LOADING_DELAY)
  }
  reqCount++
}

function reqEnd() {
  reqCount--
  if (reqCount < 1) {
    clearTimeout(clock)
    loading &&
      setTimeout(() => {
        loading.close()
      })
  }
}

export function configInterceptors(axios) {
  axios.interceptors.request.use(
    config => {
      reqStart()

      // 前端代理
      if (settings.isProxy) {
        config.url = proxy(config.url)
      }

      // 解决get请求缓存问题
      if (config.method && config.method.toLowerCase() === 'get') {
        config.params = {
          ...config.params,
          t_t: new Date().getTime(),
        }
      }

      config.headers.token = getSessionToken()
      config.headers.Authorization = getSessionToken()

      return config
    },
    err => {
      reqEnd()

      return Promise.reject(err)
    }
  )

  axios.interceptors.response.use(
    res => {
      reqEnd()

      return res
    },
    err => {
      reqEnd()

      return Promise.reject(err)
    }
  )
}
