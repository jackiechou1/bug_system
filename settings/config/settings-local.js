const SETTINGS = {
  // 是否使用前端代理
  isProxy: false,
  // isProxy: true,
  // 前端代理配置
  proxy: {
    // '^/api': 'http://192.168.1.195:8090/hy-api',
    // '^/api': 'http://monkey.free.idcfengye.com/train-api', // 临时接口
    // '^/api': 'http://192.168.1.109:8008/bug-system-api',
    // '^/api': 'http://192.168.1.108:8080/bug-system-api',
    '^/api': 'http://192.168.1.124:8008/bug-system-api',
    // '^/userApi': 'http://115.28.100.177:30001/user-center-core-api/',
    // '^/userApi': 'http://192.168.1.108:8080',
  },
  // assetsUrl: 'https://oss-cn-qingdao.aliyuncs.com/bjbztest/hy-core',
  assetsUrl: 'http://192.168.1.108:8080',
  isDev: true,
}

module.exports = SETTINGS
