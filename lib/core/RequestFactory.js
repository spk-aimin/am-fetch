import Interceptor  from './Interceptor'
import mergeConfig from './mergeConfig'
import utils from '../utils'
import xhr from './xhr'
export default class RequestFactory {
  constructor (instanceConfig) {
    this.defaults = instanceConfig
    this.interceptors = {
      request: new Interceptor(),
      response: new Interceptor()
    }
    utils.forEach(['delete', 'get', 'head', 'options'], (method) => {
      this[method] = (url, config) => {
        return this.request(utils.merge(config || {}, {
          method: method,
          url: url
        }))
      }
    })
    utils.forEach(['post', 'put', 'patch'], (method) => {
      this[method] = (url, data, config) => {
        return this.request(utils.merge(config || {}, {
          method: method,
          url: url,
          data: data
        }))
      }
    })
  }
  request (config) {
    if (typeof config === 'string') {
      config = arguments[1] || {}
      config.url = arguments[0]
    } else {
      config = config || {}
    }
    config = mergeConfig(this.defaults, config)
    config.method = config.method ? config.method.toLowerCase() : 'get'
    let chain = [xhr, undefined]
    let promise = Promise.resolve(config)
    this.interceptors.request.hooks.forEach(interceptor => {
      chain.unshift(interceptor.resolve, interceptor.reject)
    })
    this.interceptors.response.hooks.forEach(interceptor => {
      chain.unshift(interceptor.resolve, interceptor.reject)
    })
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift())
    }
    return promise
  }
}