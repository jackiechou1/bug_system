const SETTINGS = {
  // 是否使用前端代理
  isProxy: true,
  // 前端代理配置
  proxy: {
    // '^/api': 'https://api.trustlinkchina.com/train-api',
    // '^/api': 'http://192.168.1.70:8080',
    // '^/userApi': 'http://www.trustlinkchina.com/trust-link-user-center-api',
  },
  assetsUrl: 'https://bjbz.oss-cn-qingdao.aliyuncs.com/train',
  isDev: false,
}

module.exports = SETTINGS
