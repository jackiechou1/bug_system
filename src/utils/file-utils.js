import config from 'config'
import { proxy } from '@/utils/proxy-utils'
import { saveAs } from 'file-saver'
import http from '@/http/index'
import { Message } from 'element-ui'

/**
 * 下载文件
 * @param url 文件url（相对路径）
 * @param filename  文件名称（不一定可用）
 */
export function downloadFile(url, filename) {
  url = concatUrl(url)

  if (isIE()) {
    ieDownload(url)
  } else {
    if (filename == null) {
      filename = interceptFileName(url)
    }
    saveAs(url, filename)
  }
}

/**
 * 通过表单提交的方式下载或导出文件
 * @param url 表单提交指向的地址
 * @param params  表单参数键值对
 */
export function downloadFileByForm(url, params) {
  url = proxy(url)

  // 创建隐藏的form表单
  let form = document.createElement('form')
  form.setAttribute('style', 'display:none')
  form.setAttribute('target', '_blank')
  form.setAttribute('method', 'post')
  form.setAttribute('action', url)
  if (params) {
    for (let i in params) {
      let inputE = document.createElement('input')
      inputE.setAttribute('type', 'hidden')
      inputE.setAttribute('name', i)
      inputE.setAttribute('value', params[i])
      form.append(inputE)
    }
  }
  document.body.appendChild(form)
  form.submit()
  // 然后移除
  document.body.removeChild(form)
}

/**
 * 查看图片
 * @param url 图片url
 * @param filename  图片名称
 */
export function viewImage(url) {
  url = concatUrl(url)
  window.open(url)
}

const baseFileURL = config.assetsUrl

/**
 * 拼接assets url
 * @param url   assets路径
 * @returns {string|*}
 */
export function concatUrl(url) {
  if (url && !url.startsWith('http')) {
    return `${baseFileURL}${url}`
  } else {
    return url
  }
}

const ieDownload = url => {
  window.open(url)
}

const isIE = () => {
  const explorer = window.navigator.userAgent
  return explorer.indexOf('MSIE') >= 0 || explorer.indexOf('Trident/7.0') >= 0 || explorer.indexOf('Edge') >= 0
}

/**
 * a标签下载文件函数
 * @param url   文件url地址
 * @param filename  文件名称
 */
export function aDownload(url, filename) {
  // 创建隐藏的可下载链接
  let eleLink = document.createElement('a')
  eleLink.setAttribute('download', filename)
  eleLink.setAttribute('target', '_blank')
  eleLink.style.display = 'none'
  eleLink.href = url
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
}

/**
 * 上传文件
 * @param url api地址
 * @param file  文件
 * @param params 额外参数对象
 * @returns {*}
 */
export function uploadFile(url = new Error('api地址必须填写'), file = new Error('上传的文件必须填写'), params = {}) {
  let formData = new FormData()
  formData.append('file', file)
  Object.keys(params).forEach(key => {
    formData.append(key, params[key])
  })
  return http.post(url, formData)
}

/**
 * 截取附件url中的文件名
 * @param url 附件url
 * @returns {*|string}  文件名
 */
export function interceptFileName(url) {
  let slices = url.split('/')
  return slices[slices.length - 1]
}

/**
 * 判断文件是预览还是下载
 * @param url 附件url
 * @param fileName 文件名
 */
export function previewOrDownload(url, fileName) {
  let index = url.lastIndexOf('.')
  let urlType = url.substr(index, 4)
  if (!/.(avi)$/.test(urlType)) {
    window.open(concatUrl(url))
  } else {
    downloadFile(url, fileName)
  }
  // if (!/.(gif|jpg|jpeg|png|gif|jpg|png|pdf|mp3|mp4|rmvb|avi|ts)$/.test(urlType)) {
  //   // 下载
  //   downloadFile(url, fileName)
  // } else {
  //   // 打开
  //
  // }
}

/**
 * 上传文件最大控制
 * @param file
 */
export function maxFileSize(file) {
  let flag = true
  if (file.size / (1024 * 1024) > 200) {
    flag = false
  }
  return flag
}

/**
 * 上传文件必须是excel（xls，xlsx）
 * @param file
 */
export function uploadMustExcel(file) {
  let flag = true
  let fileType = file.name
  let index = fileType.lastIndexOf('.')
  let urlType = fileType.substr(index, 4)
  if (!/.(xls|xlsx)$/.test(urlType)) {
    flag = false
  }
  return flag
}

/**
 * 下载文件Blob
 * @param res
 * @param value
 * @returns {Promise}
 */
export function downloadFileBlob(res, value, fileName) {
  let flag = true
  let blob = new Blob([res], { type: 'application/vnd.ms-excel' })
  // 判断是否是文档
  if (value === 'docx') {
    blob = new Blob([res], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    })
  }
  var reader = new FileReader()
  let promise = new Promise(resolve => {
    reader.readAsText(blob)
    // 判断返回的是“文件流”还是需要抛出的错误信息
    reader.onloadend = e => {
      let obj = e.target.result
      if (obj.indexOf('message') > -1) {
        Message.error(JSON.parse(obj).message)
        flag = false
      } else {
        let url = window.URL.createObjectURL(blob)
        // 文件名
        // let fileName = decodeURI(res.rawData.headers.filename)
        saveAs(url, fileName)
        flag = true
      }
      resolve(flag)
    }
  })
  return promise
}
