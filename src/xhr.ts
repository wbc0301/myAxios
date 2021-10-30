import { parseHeaders } from './helper/header'
import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types/index'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const { data = null, url, method = 'get', headers = {}, responseType } = config

    const request = new XMLHttpRequest()

    responseType && (request.responseType = responseType) // 添加 responseType

    request.open(method, url, true)

    request.onreadystatechange = function abc() { // 处理服务端响应
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders()) // 把字符串的header解析成对象
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText // response为text时去responseText 否则取response
      const response: AxiosResponse = {
        data: responseData,
        status: request.status, //
        statusText: request.statusText, //
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
