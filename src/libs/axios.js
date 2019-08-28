import axios from 'axios'
// import store from '@/store'
import { Message } from 'iview'
import router from '../router/index'

axios.defaults.withCredentials = true

/*
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}
*/

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      // baseURL: '',
      baseURL: this.baseUrl,
      headers: {
        Authorization: '',
        withCredentials: true
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // instance.withCredentials = true
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      if (res.data.code !== '200') {
        if (res.data.code === '10001' || res.data.code === '10002' || res.data.code === '50014' || (res.data.code === '501' && res.data.msg === '未登录')) {
          if (localStorage.getItem('token')) {
            Message.info('未登录')
            localStorage.clear()
            // store.dispatch('handleWebLogOut')
            router.push('/login')
            location.reload()// 为了重新实例化vue-router对象 避免bug
          }
          router.push('/login')
        } else if (res.data.code === '404') {
          router.push('/404')
        } else if (res.data.code === '500') {
          router.push('/401')
        } else if (res.data.code === '403') {
          router.push('/401')
        }
        return res
      } else {
        // return response;
        return { data, status }
      }
      // return { data, status }
    }, error => {
      this.destroy(url)
      // addErrorLog(error.response)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
