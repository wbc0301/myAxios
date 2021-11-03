
import { createError } from './helper/error'
import { parseHeaders } from './helper/header'
import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types/index'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers = {}, responseType, timeout, cancelToken } = config

    const request = new XMLHttpRequest()

    responseType && (request.responseType = responseType) // 添加 responseType
    timeout && (request.timeout = timeout) // 添加超时时间

    request.open(method, url!, true)


    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.onreadystatechange = function () { // 监听readystate变化
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) { // 网络超时 断网时 status为0
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders()) // parseHeaders把字符串的header解析成对象
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText // response为text时去responseText 否则取response
      const response: AxiosResponse = {
        data: responseData,
        status: request.status, //
        statusText: request.statusText, //
        headers: responseHeaders,
        config,
        request
      }
      if (request.status >= 200 && request.status < 300) { // 处理状态码非200的错误
        resolve(response)
      } else {
        reject(createError(`Request failed with status code ${request.status}......`, config, null, request, response))
      }
    }
    request.onerror = function () { // 监听网络错误
      reject(createError('Network Error......', config, null, request))
    }
    request.ontimeout = function () { // 监听超时错误
      reject(createError(`Timeout of ${config.timeout} ms exceeded.....1.`, config, 'ECONNABORTED', request))
    }



    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }


    request.send(data)
  })
}

/*
  错误分为三类：
    1：网络异常
    2：超时
    3：非200状态码
*/
