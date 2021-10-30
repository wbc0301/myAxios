import { transformRequest } from './helper/data'
import { processHeaders } from './helper/header'
import { bulidURL } from './helper/url'
import { AxiosRequestConfig, AxiosPromise } from './types/index'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = processHeaders(config.headers, config.data)
  config.data = transformRequest(config.data)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}

export default axios
