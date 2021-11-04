// 解决js运算精度丢失问题  加法
export function add(arg1, arg2) {
  var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return Math.round(arg1 * m + arg2 * m) / m
}

// 解决js运算精度丢失问题  减法
export function cut(arg1, arg2) {
  var r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  // last modify by deeka
  // 动态控制精度长度
  n = r1 >= r2 ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

// 解决js运算精度丢失问题  乘法
export function mul(arg1, arg2) {
  var m = 0
  var s1 = arg1.toString()
  var s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
}

// 解决js运算精度丢失问题  除法
export function div(arg1, arg2) {
  var t1 = 0
  var t2 = 0
  var r1, r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return mul(r1 / r2, Math.pow(10, t2 - t1))
}
