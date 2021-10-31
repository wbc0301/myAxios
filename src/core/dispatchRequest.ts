import { transformRequest, transformReponse } from '../helper/data'
import { processHeaders } from '../helper/header'
import { bulidURL } from '../helper/url'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import xhr from '../xhr'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = processHeaders(config.headers, config.data)
  config.data = transformRequest(config.data)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url!, params) // 去除 null 或 undefined    语法是添加 ! 后缀
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformReponse(res.data)
  return res
}


