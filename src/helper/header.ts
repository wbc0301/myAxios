import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers:any, data: any): any {
  headers = headers || {}
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data) && headers && !headers['Content-Type']) { // data是一个普通对象时 才添加Contente-Type
    headers['Content-Type'] = 'application/json;charset=utf-8'
  }
  return headers
}
