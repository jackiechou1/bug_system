import settings from 'config'
console.log(settings)
const regs = []
Object.keys(settings.proxy).forEach(key => {
  console.log(key)
  let reg = new RegExp(key)
  regs.push({ reg, value: settings.proxy[key] })
})

/**
 * 返回代理地址
 * 如果没有找到对应配置，返回输入的url
 * @param url 需要代理的接口地址
 * @returns {*}
 */
export function proxy(url) {
  for (let i = 0; i < regs.length; i++) {
    let item = regs[i]
    if (item.reg.test(url)) {
      return url.replace(item.reg, item.value)
    }
  }
  return url
}
