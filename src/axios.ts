import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helper/util'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'


function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel


export default axios
