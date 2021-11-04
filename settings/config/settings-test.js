const SETTINGS = {
  // 是否使用前端代理
  isProxy: true,
  // 前端代理配置
  proxy: {
    // '^/api': '/trust-link-test/train-api',
    // '^/api': 'http://192.168.1.70:8080',
    // '^/userApi': 'http://115.28.100.177:30001/user-center-core-api/',
  },
  assetsUrl: 'https://bjbztest.oss-cn-qingdao.aliyuncs.com/train',
  isDev: false,
}

module.exports = SETTINGS
