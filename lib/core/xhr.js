
function _getUrl (config) {
  let url = config.url
  if (!/http(s)?:\/\//.test(url)) {
    if (url.indexOf('/') === 0) {
      url = url.substr(1, url.length)
    }
    url = config.baseURL + url
  }
  if (config.params && Object.keys(config.params).length > 0) {
    if (url.indexOf('?') > -1) {
      url += '&' + _stringfyParams(config.params)
    } else {
      url += '?' + _stringfyParams(config.params)
    }
  }
  return url
}
function _stringfyParams (params) {
  let str = ''
  for(key in params) {
    str += `${key}=${encodeURIComponent(params[key])}&`
  }
  str = str.substring(0, str.length - 1)
  return str
}
export default function xhr (config) {
  let url = _getUrl(config)
  if (window.fetch) {
    if (['post', 'put', 'patch'].indexOf(config.method) > -1) {
      if (config.data && typeof config.data === 'object') {
        config.body = JSON.stringify(config.data)
      }
      if (typeof config.data === 'string') {
        config.body = config.data
      }
    }
    let promise = new Promise((resolve, reject) => {
      fetch(url, config).then(response => {
        if (response.status !== 200) {
          reject({request: response})
        } else {
          let readType = config.responseType || 'json'
          response[readType]().then(res => {
            response.data = res
            resolve(response)
          })
        }
      }).catch(e => {
        reject(e)
      })
    })
    return promise
  } else {
    return new Promise(() => {})
  }
}