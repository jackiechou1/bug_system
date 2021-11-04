import { concatUrl } from '@/utils/file-utils'
import moment from 'moment'

/**
 * 将 数字 转换为 中文大写
 * @param n     包含数字的字符串
 * @returns {*} 转换后的字符串
 */
export function numberToBigChinese(n) {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return n
  let unit = '千佰拾亿千佰拾万千佰拾元角分'
  let str = ''
  n += '00'
  let p = n.indexOf('.')
  if (p >= 0) n = n.substring(0, p) + n.substr(p + 1, 2)
  unit = unit.substr(unit.length - n.length)
  for (let i = 0; i < n.length; i++) str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i)
  return str
    .replace(/零(千|佰|拾|角)/g, '零')
    .replace(/(零)+/g, '零')
    .replace(/零(万|亿|元)/g, '$1')
    .replace(/(亿)万|壹(拾)/g, '$1$2')
    .replace(/^元零?|零分/g, '')
    .replace(/元$/g, '元整')
}

/**
 * 将 图片固定高缩放，限定在矩形框内
 * @param url 文件名
 *        h   矩形高
 * @returns {*} 转换后的图片地址
 */
export function imageResize(url, h) {
  if (!url || !h) {
    return ''
  } else {
    return concatUrl(url) + `?x-oss-process=image/resize,h_${h}`
  }
}

/**
 * 将 图片固定宽缩放，限定在矩形框内
 * @param url 文件名
 *        w   矩形框宽
 * @returns {*} 转换后的图片地址
 */
export function imageResizeW(url, w) {
  if (!url || !w) {
    return ''
  } else {
    return concatUrl(url) + `?x-oss-process=image/resize,w_${w}`
  }
}

// 验证身份证格式
export function isIdCardNo(code) {
  let city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 ',
  }
  let pass = true
  if (!code) {
    pass = false
  } else if (
    code !== '' &&
    !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i.test(
      code
    )
  ) {
    pass = false
  } else if (code !== '' && !city[code.substr(0, 2)]) {
    pass = false
  } else {
    // 18位身份证需要验证最后一位校验位
    // if (code.length === 18) {
    //   code = code.toUpperCase()
    //   code = code.split('')
    //   // ∑(ai×Wi)(mod 11)
    //   // 加权因子
    //   let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
    //   // 校验位
    //   let parity = [ '1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2' ]
    //   let sum = 0
    //   let ai = 0
    //   let wi = 0
    //   for (let i = 0; i < 17; i++) {
    //     ai = code[i]
    //     wi = factor[i]
    //     sum += ai * wi
    //   }
    //   let last = parity[sum % 11]
    //   if (last !== code[17]) {
    //     pass = false
    //   }
    // }
  }
  return pass
}

/**
 *  根据身份证算出生年月，性别，年龄
 * @param idCard
 */
export function getInfoByIdCardNo(iIdNo) {
  iIdNo = iIdNo.replace(/^\s+|\s+$/g, '')
  if (iIdNo.length !== 15 && iIdNo.length !== 18) {
    return
  }
  let birthday
  if (iIdNo.length === 15) {
    birthday = iIdNo.substring(6, 12)
    birthday = '19' + birthday
    birthday = birthday.substring(0, 4) + '-' + birthday.substring(4, 6) + '-' + birthday.substring(6)
  } else {
    birthday = iIdNo.substring(6, 14)
    birthday = birthday.substring(0, 4) + '-' + birthday.substring(4, 6) + '-' + birthday.substring(6)
  }
  let myDate = new Date()
  let month = myDate.getMonth() + 1
  let day = myDate.getDate()
  let age = myDate.getFullYear() - iIdNo.substring(6, 10) - 1
  if (iIdNo.substring(10, 12) < month || (iIdNo.substring(10, 12) === month && iIdNo.substring(12, 14) <= day)) {
    age++
  }
  let genderType = parseInt(iIdNo.substr(16, 1)) % 2 === 1 ? 1 : 2
  return { birthday: birthday, age: age, genderType: genderType }
}

export function monthChange(v) {
  if (v) {
    if (typeof v === 'string' && v.indexOf('-') < 0) {
      if (v.indexOf('.') < 0) {
        return moment(v.substring(0, 4) + '-' + v.substring(4, 6)).format('YYYY-MM')
      } else {
        return v.replace('-', '.')
      }
    }
    if (v instanceof Array && v.length > 0) {
      let v1 = v[0]
      if (v.indexOf('.') < 0) {
        return moment(v1.substring(0, 4) + '-' + v1.substring(4, 6)).format('YYYY-MM')
      } else {
        return v.replace('-', '.')
      }
    }
  } else {
    return null
  }
}
