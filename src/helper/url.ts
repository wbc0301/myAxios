import { isDate, isObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val) // 对于字符 @ : $ , [ ]  我们是允许出现在 url 中的，不希望被 encode。
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function bulidURL(url: string, params?: any) {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      // 1. 空值忽略 去掉null undefined
      return
    }
    let values: string[]
    if (Array.isArray(val)) {
      // 2.数组转换 /base/get?foo[]=bar&foo[]=baz'
      values = val // ['bar','baz']
      key += '[]' // foo[]
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString() // 3./base/get?date=2019-04-01T05:55:39.030Z
      } else if (isObject(val)) {
        val = JSON.stringify(val) // 4.处理对象 JSON.stringify
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex) // 5.丢弃 url 中的哈希标记
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams // 6.拼上url上自带的参数
  }

  return url
}
